<?php
$siswa = [
    ["nama" => "Anez", "kelas" => "XI RPL 1", "nilai" => 85],
    ["nama" => "Adzra", "kelas" => "XI RPL 1", "nilai" => 70],
    ["nama" => "Keisya", "kelas" => "XI RPL 2", "nilai" => 90],
    ["nama" => "Mutiara", "kelas" => "XI RPL 2", "nilai" => 65],
    ["nama" => "Raisa", "kelas" => "XI RPL 1", "nilai" => 95]
];

$tertinggi = $siswa[0]["nilai"];
$terendah = $siswa[0]["nilai"];
$totalKelas = [];
$jumlahKelas = [];  

foreach ($siswa as $data) {

    $nilai = $data["nilai"];
    $kelas = $data["kelas"];

    if ($nilai > $tertinggi) {
        $tertinggi = $nilai;
    }

    if ($nilai < $terendah) {
        $terendah = $nilai;
    }

    $totalKelas[$kelas] = ($totalKelas[$kelas] ?? 0) + $nilai;
    $jumlahKelas[$kelas] = ($jumlahKelas[$kelas] ?? 0) + 1;
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Siswa</title>
</head>
<body>

<h2>Data Seluruh Siswa</h2>

<table border="1" cellpadding="8">
    <tr>
        <th>Nama</th>
        <th>Kelas</th>
        <th>Nilai</th>
    </tr>

    <?php foreach ($siswa as $data) : ?>
    <tr>
        <td><?= $data["nama"] ?></td>
        <td><?= $data["kelas"] ?></td>
        <td><?= $data["nilai"] ?></td>
    </tr>
    <?php endforeach; ?>
</table>

<h3>Nilai Tertinggi dan Terendah</h3>
<p>Nilai tertinggi: <?= $tertinggi ?></p>
<p>Nilai terendah: <?= $terendah ?></p>

<h3>Rata-rata Nilai Setiap Kelas</h3>

<?php foreach ($totalKelas as $kelas => $total) : ?>
    <p>
        <?= $kelas ?> :
        <?= $total / $jumlahKelas[$kelas] ?>
    </p>
<?php endforeach; ?>

<h3>Siswa dengan Nilai di Bawah 75</h3>

<?php
foreach ($siswa as $data) {
    if ($data["nilai"] < 75) {
        echo $data["nama"] . " - " . $data["nilai"] . "<br>";
    }
}
?>

</body>
</html>