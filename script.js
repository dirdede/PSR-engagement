const sheetId = "1xSS-6YMGPDCcuIWax9pe_VI9dvH5aUPS5VzKRe_Vfyc";
const sheetName = "Rekap";
const range = "I1:M19";

const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&range=${range}`;

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const tbody = document.querySelector("#leaderboard-desktop tbody");
    const mobile = document.querySelector("#leaderboard-mobile");

    tbody.innerHTML = "";
    mobile.innerHTML = "";

    rows.forEach((row, index) => {
      if (!row.c) return;

      const nama = row.c[0]?.v || "";
      const warna = row.c[1]?.v || 0;
      const shape = row.c[2]?.v || 0;
      const grup = row.c[3]?.v || 0;
      const total = row.c[4]?.v || 0;
      const rank = index + 1;

      /* ===== DESKTOP ===== */
      const tr = document.createElement("tr");
      if (index === 0) tr.classList.add("rank-1");

      tr.innerHTML = `
        <td>${rank}</td>
        <td>${nama}</td>
        <td>${warna}</td>
        <td>${shape}</td>
        <td>${grup}</td>
        <td><strong>${total}</strong></td>
      `;
      tbody.appendChild(tr);

      /* ===== MOBILE ===== */
      const card = document.createElement("div");
      card.className = "card";
      if (index === 0) card.classList.add("rank-1");

      card.innerHTML = `
        <div class="card-header">
          <span>#${rank} ${nama}</span>
          <span>Total: ${total}</span>
        </div>
        <div class="card-body">
          <div>Warna: ${warna}</div>
          <div>Shape: ${shape}</div>
          <div>Grup: ${grup}</div>
        </div>
      `;
      mobile.appendChild(card);
    });
  })
  .catch(() => {
    document.querySelector("#leaderboard-mobile").innerHTML =
      "<p>Gagal memuat data</p>";
  });
