<?php
include 'db.php';

$search = $_GET['search'] ?? '';

$sql = "SELECT * FROM users WHERE name LIKE '%$search%'";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);

$conn->close();
?>
