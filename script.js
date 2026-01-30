const sheetId = "1xSS-6YMGPDCcuIWax9pe_VI9dvH5aUPS5VzKRe_Vfyc";

const dataRange = "Rekap!I1:O19";   // tambah kolom hadiah
const controlRange = "Rekap!R2";

const dataUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?range=${dataRange}`;
const controlUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?range=${controlRange}`;

Promise.all([
  fetch(dataUrl).then(r => r.text()),
  fetch(controlUrl).then(r => r.text())
])
.then(([dataText, controlText]) => {

  const dataJson = JSON.parse(dataText.substring(47).slice(0, -2));
  const rows = dataJson.table.rows;

  const controlJson = JSON.parse(controlText.substring(47).slice(0, -2));
  const showHadiah = (controlJson.table.rows[0]?.c[0]?.v || "").toLowerCase() === "show";

  const tbody = document.querySelector("#leaderboard-desktop tbody");
  const mobile = document.querySelector("#leaderboard-mobile");
  const headerRow = document.querySelector("#desktop-header");

  tbody.innerHTML = "";
  mobile.innerHTML = "";

  /* Tambah kolom header Hadiah jika Show */
  if (showHadiah) {
    const th = document.createElement("th");
    th.textContent = "Hadiah";
    headerRow.appendChild(th);
  }

  rows.forEach((row, index) => {
    if (!row.c) return;

    const nama   = row.c[0]?.v || "";
    const warna  = row.c[1]?.v || 0;
    const shape  = row.c[2]?.v || 0;
    const grup   = row.c[3]?.v || 0;
    const total  = row.c[4]?.v || 0;
    const hadiah = row.c[6]?.v || ""; // kolom O
    const rank   = index + 1;

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

    if (showHadiah) {
      const tdHadiah = document.createElement("td");
      tdHadiah.textContent = hadiah;
      tr.appendChild(tdHadiah);
    }

    tbody.appendChild(tr);

    /* ===== MOBILE ===== */
    const card = document.createElement("div");
    card.className = "card";
    if (index === 0) card.classList.add("rank-1");

    const namaMobile = showHadiah && hadiah
      ? `${nama} (${hadiah})`
      : nama;

    card.innerHTML = `
      <div class="card-header">
        <span>#${rank} ${namaMobile}</span>
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
