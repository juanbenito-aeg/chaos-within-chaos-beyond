<?php
    require_once (__DIR__ . "/../controller/Controller.php");

    if (isset($_POST["name"]) && isset($_POST["score"])) {
        // |||||||||||| IF ALL THE REQUIRED DATA IS RECEIVED VIA POST, CREATE A NEW SCORE OBJECT
        $newScore["name"]   = $_POST["name"];
        $newScore["score"]  = $_POST["score"];

        // |||||||||||| ADD THE NEW OBJECT TO THE DATABASE
        $score->addNew($newScore);

        // |||||||||||| RETURN THE SCORE THAT WAS ADDED TO THE DATABASE AS JSON
        echo json_encode($newScore);
    } else {
        die("Forbidden");
    }
?>