let daftarBuku = [];
function tambahBuku() {
  const form = document.querySelector('.card-form');
  const inputJudul = document.getElementById('judul');
  const inputPenulis = document.getElementById('penulis');

  const judul = inputJudul.value.trim();
  const penulis = inputPenulis.value.trim();
  form.onsubmit = function (e) {
    e.preventDefault();
  };

  if (judul === '') {
    alert('Judul buku tidak boleh kosong!');
    return;
  }

  const bukuBaru = {
    id: Date.now(),
    judul: judul,
    penulis: penulis,
    status: 'Proses'
  };

  daftarBuku.push(bukuBaru);
  form.reset();

  render();
}
function updateRingkasan() {
  const total = daftarBuku.length;
  const sudahDibaca = daftarBuku.filter(buku => buku.status === 'Selesai').length;
  const belumDibaca = total - sudahDibaca;

  document.getElementById('total-buku').textContent = `${total} buku`;
  document.getElementById('sudah-dibaca').textContent = sudahDibaca;
  document.getElementById('belum-dibaca').textContent = belumDibaca;
}

function render() {
  const listBukuContainer = document.getElementById('list-buku');
  listBukuContainer.innerHTML = '';
  if (daftarBuku.length === 0) {
    listBukuContainer.className = 'card-list-buku';
    listBukuContainer.textContent = 'Belum ada buku. Tambahkan buku pertamamu!';
    updateRingkasan();
    return;
  }

  listBukuContainer.className = '';

  daftarBuku.forEach(buku => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'buku-item';
    const infoDiv = document.createElement('div');
    infoDiv.className = 'buku-info';

    const judulDiv = document.createElement('div');
    judulDiv.className = `judul-buku ${buku.status === 'Selesai' ? 'tercoret' : ''}`;
    judulDiv.textContent = buku.judul;

    const penulisDiv = document.createElement('div');
    penulisDiv.className = 'penulis-buku';
    penulisDiv.textContent = buku.penulis;

    infoDiv.appendChild(judulDiv);
    infoDiv.appendChild(penulisDiv);
    const aksiDiv = document.createElement('div');
    aksiDiv.className = 'buku-aksi';
    const badge = document.createElement('span');
    badge.className = `badge-status ${buku.status.toLowerCase()}`;
    badge.textContent = buku.status;
    badge.addEventListener('click', function () {
      buku.status = buku.status === 'Proses' ? 'Selesai' : 'Proses';
      render();
    });
    const btnHapus = document.createElement('button');
    btnHapus.type = 'button';
    btnHapus.className = 'btn-hapus';
    btnHapus.textContent = 'Hapus';
    btnHapus.addEventListener('click', function () {
      daftarBuku = daftarBuku.filter(item => item.id !== buku.id);
      render();
    });

    aksiDiv.appendChild(badge);
    aksiDiv.appendChild(btnHapus);

    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(aksiDiv);

    listBukuContainer.appendChild(itemDiv);
  });
  updateRingkasan();
}
render();