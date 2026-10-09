<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tabel Perkalian</title>
</head>
<body>
<!
<h2>Tabel Perkalian 1 sampai 10</h2>

<table border="1" cellpadding="8" cellspacing="0">

<?php
for ($i = 1; $i <= 10; $i++) {
    echo "<tr>";

    for ($j = 1; $j <= 10; $j++) {
        $hasil = $i * $j;

        if ($hasil % 2 == 0) {
            echo "<td style='background-color: lightgreen;'>$hasil</td>";
        } else {
            echo "<td>$hasil</td>";
        }
    }

    echo "</tr>";
}
?>

</table>

</body>
</html>