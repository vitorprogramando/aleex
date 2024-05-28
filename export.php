<?php
include 'db.php';

header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename=Usuários.csv');

$output = fopen('php://output', 'w');
fputcsv($output, array('ID', 'Name', 'Email', 'Phone'));

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }
}

fclose($output);
$conn->close();
exit();
?>
