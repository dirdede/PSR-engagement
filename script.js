const sheetId = "1xSS-6YMGPDCcuIWax9pe_VI9dvH5aUPS5VzKRe_Vfyc";
const sheetName = "Rekap";
const range = "I1:M19";

const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetName}&range=${range}`;

fetch(url)
  .then(res => res.text())
  .then(data => {
    const json = JSON.parse(data.substring(47).slice(0, -2));
    const rows = json.table.rows;

    const tbody = document.querySelector("#leaderboard tbody");
    tbody.innerHTML = "";

    rows.forEach((row, index) => {
      if (!row.c) return;

      const tr = document.createElement("tr");

      if (index === 0) tr.classList.add("rank-1");
      if (index === 1) tr.classList.add("rank-2");
      if (index === 2) tr.classList.add("rank-3");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${row.c[0]?.v || ""}</td>
        <td>${row.c[1]?.v || 0}</td>
        <td>${row.c[2]?.v || 0}</td>
        <td>${row.c[3]?.v || 0}</td>
        <td><strong>${row.c[4]?.v || 0}</strong></td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error(error);
    document.querySelector("#leaderboard tbody").innerHTML =
      `<tr><td colspan="6">Gagal memuat data</td></tr>`;
  });
