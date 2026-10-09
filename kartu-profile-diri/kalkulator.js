const tugas = document.getElementById("tugas");
const uts = document.getElementById("uts");
const uas = document.getElementById("uas");
const tombolHitung = document.getElementById("hitung");
const hasil = document.getElementById("hasil");

tombolHitung.addEventListener("click", function () {

    if (tugas.value === "" || uts.value === "" || uas.value === "") {
        alert("silakan isi semua nilai terlebih dahulu");
        return;
    }

    const nilaiTugas = Number(tugas.value);
    const nilaiUTS = Number(uts.value);
    const nilaiUAS = Number(uas.value);

    const nilaiAkhir =
        (nilaiTugas * 0.30) +
        (nilaiUTS * 0.30) +
        (nilaiUAS * 0.40);

    hasil.classList.remove("lulus");
    hasil.classList.remove("tidak-lulus");

    if (nilaiAkhir >= 75) {

        hasil.innerHTML = `
            <div>Nilai Akhir Kamu:</div>
            <strong>${nilaiAkhir.toFixed(1)}</strong>
            <div>✓ LULUS</div>
        `;

        hasil.classList.add("lulus");

    } else {

        hasil.innerHTML = `
            <div>Nilai Akhir Kamu:</div>
            <strong>${nilaiAkhir.toFixed(1)}</strong>
            <div>✕ TIDAK LULUS</div>
        `;

        hasil.classList.add("tidak-lulus");
    }
});