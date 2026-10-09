<?php
$nilai = [
    "Matematika" => 88,
    "Bahasa Indonesia" => 95,
    "Bahasa Inggris" => 94,
    "Sejarah" => 95,
    "PPKn" => 96
];
$total = 0;

foreach ($nilai as $mapel => $angka) {
    $total = $total + $angka;
}
$rata = $total / count($nilai);
function predikat($nilai) {
    if ($nilai >= 90) {
        return "A";
    } elseif ($nilai >= 80) {
        return "B";
    } elseif ($nilai >= 70) {
        return "C";
    } else {
        return "D - Perlu Remedial";
    }
}

?>
<!DOCTYPE html>
<html>
<body>

<h2>Hasil Nilai Rapor</h2>

<table border="1" cellpadding="8">

<tr>
    <th>Mata Pelajaran</th>
    <th>Nilai</th>
</tr>

<?php
foreach ($nilai as $mapel => $angka) {
    echo "<tr>";
    echo "<td>$mapel</td>";
    echo "<td>$angka</td>";
    echo "</tr>";
}
?>

</table>

<p>Total Nilai: <?= $total ?></p>

<p>Rata-rata: <?= $rata ?></p>

<p>Predikat: <?= predikat($rata) ?></p>

<link rel="stylesheet" href="nilai.css">

</body>
</html>