const sheetId = "1xSS-6YMGPDCcuIWax9pe_VI9dvH5aUPS5VzKRe_Vfyc";
const sheetName = "Rekap";
const range = "I1:M19";

const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&range=${range}`;

fetch(url)
  .then(res => res.text())
  .then(text => {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = "";

    rows.forEach((row, index) => {
      if (!row.c) return;

      const nama = row.c[0]?.v || "";
      const warna = row.c[1]?.v || 0;
      const shape = row.c[2]?.v || 0;
      const grup = row.c[3]?.v || 0;
      const total = row.c[4]?.v || 0;

      const tr = document.createElement("tr");

      // Hanya rank 1 yang beda warna
      if (index === 0) {
        tr.classList.add("rank-1");
      }

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${nama}</td>
        <td>${warna}</td>
        <td>${shape}</td>
        <td>${grup}</td>
        <td><strong>${total}</strong></td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error(error);
    document.querySelector("#leaderboard tbody").innerHTML =
      `<tr><td colspan="6">Gagal memuat data</td></tr>`;
  });
