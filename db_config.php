<?php
$db = new mysqli('localhost', 'lab827s', 'a7677963','test4');

if ($db->connect_error) {
    die("連接失敗: " . $db->connect_error);
}
?>
