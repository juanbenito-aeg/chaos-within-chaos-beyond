<?php
    require_once "ModelBase.php";

    class Score extends ModelBase {
        function __construct() {
            // |||||||||||| CALL TO THE "ModelBase" CLASS CONSTRUCTOR
            parent::__construct();
            
            // |||||||||||| INITIALIZE THE NAME OF THE TABLE
            $this->table_name = "scores";
        }
    }
?>