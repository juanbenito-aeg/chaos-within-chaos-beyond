<?php
    require_once (__DIR__ . "/../controller/Controller.php");

    $result = $score->getAll();

    // |||||||||||| RETURN THE DATABASE RESULT AS JSON
    echo json_encode($result);
?>