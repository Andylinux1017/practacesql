<?php
header('Content-Type: application/json');
include 'db_config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nickname = $db->real_escape_string($_POST['nickname']);
    $message = $db->real_escape_string($_POST['message']);
    
    $sql = "INSERT INTO messages (nickname, message) VALUES ('$nickname', '$message')";
    if ($db->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "留言成功!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error: " . $db->error]);
    }
}
$db->close();
?>
