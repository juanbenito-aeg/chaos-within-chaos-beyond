<?php
    require_once (__DIR__ . "/../db/Conexion.php");

    class ModelBase extends Conexion {
        protected $conexion;
        protected $table_name;

        function __construct() {
            $this->conexion = parent::getInstance();
        }

        // |||||||||||| GETS ALL THE ELEMENTS OF THE TABLE
        function getAll() {
            $query = $this->selectDB($this->table_name);
            $result = $this->conexion->query($query);

            // |||||||||||| CREATE AN ASSOCIATIVE ARRAY TO RETURN THE DATA
            $array = $this->createArray($result);

            return $array;
        }

        // |||||||||||| GETS ALL THE ELEMENTS OF THE TABLE, FILTERED BY A VALUE OF A COLUMN
        function getAllByColumn($search_name, $search_value) {
            $query = $this->selectDB($this->table_name, "*", $search_name, $search_value);
            $result = $this->conexion->query($query);

            // |||||||||||| CREATE AN ASSOCIATIVE ARRAY TO RETURN THE DATA
            $array = $this->createArray($result);

            return $array;
        }

        // |||||||||||| ADDS AN ELEMENT TO THE TABLE
        function addNew($array) {
            $query = $this->insertDB($this->table_name, $array);
            $result = $this->conexion->query($query);
            return $result;
        }

        protected function createArray($data) {
            $array = array();
            
            // |||||||||||| CREATE AN ASSOCIATIVE ARRAY TO RETURN THE DATA
            while ($row = pg_fetch_array($data, null, PGSQL_ASSOC)) {
                // |||||||| ADD THE NEXT ROW
                $array[] = $row;
            }

            return $array;
        }

        /**
         * Returns a query with the following structure: "SELECT * FROM table WHERE author = 'Jane Austen'".
         * 
         * @param $table   Name of the table (FROM).
         * @param $columns Columns to be extracted (SELECT). If this parameter is not provided, it is assumed that all are extracted (*).
         */
        protected function selectDB($table, $columns = "*", $name = "", $value = "") {
            $query = "SELECT $columns FROM $table";
            if (($name !== "") && ($value !== "")) {
                $query .= " WHERE $name = '$value'";
            }
            return $query;
        }

        /**
         * Returns a query with the following structure: "INSERT INTO table (author, title, category) VALUES ('JRR Tolkien', 'The Lord of the Rings', 'Fiction')".
         * 
         * @param $table Name of the table.
         * @param $array Associative array with the pairs (name, value) corresponding to the column name and the value.
         */
        protected function insertDB($table, $array) {
            foreach ($array as $name => $value) {
                $insert_name[] = $name;
                $insert_value[] = $value;
            }

            $query = "INSERT INTO $table (";
            $num_of_elements = count($insert_name);
            for ($i = 0; $i < $num_of_elements; $i++) {
                $query .= "$insert_name[$i]";
                if ($i !== ($num_of_elements - 1)) {
                    $query .= ", ";
                } else {
                    $query .= ") ";
                }
            }

            $query .= "VALUES (";
            for ($i = 0; $i < $num_of_elements; $i++) {
                $query .= "'$insert_value[$i]'";
                if ($i !== ($num_of_elements - 1)) {
                    $query .= ", ";
                } else {
                    $query .= ")";
                }
            }

            return $query;
        }
    }
?>