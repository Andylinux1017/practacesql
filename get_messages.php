<?php
header('Content-Type: application/json');
include 'db_config.php';

$result = $db->query("SELECT * FROM messages ORDER BY created_at DESC");

$messages = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

echo json_encode($messages);

$db->close();
?>
