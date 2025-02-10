<?php
    require_once "login-data.php";

    // |||||||||||| THE REST OF THE CLASSES INHERIT FROM THIS
    class Conexion {
        private static $_singleton = null;
        private $conexion;
        private $dbh;
        // private $errno;
        // private $num_rows;

        public static function getInstance() {
            if (is_null(self::$_singleton)) {
                self::$_singleton = new self();
            }
            return self::$_singleton;
        }

        private function __clone() {
            trigger_error("This object's cloning is not allowed", E_USER_ERROR);
        }

        public function __wakeup() {
            trigger_error("You cannot deserialize an instance of the class " . get_class($this), E_USER_ERROR);
        }

        private function __construct() {
            global $cfg;

            $host       = $cfg["host"];
            $dbname     = $cfg["dbname"];
            $user       = $cfg["user"];
            $password   = $cfg["password"];

            $this->conexion = "host=$host port=5432 dbname=$dbname user=$user password=$password";

            $this->dbh = pg_connect($this->conexion);
            if (!$this->dbh) {
                die("Database connection error");
            }
        }

        public function getConnection() {
            return self::$_singleton;
        }

        public function cerrar() {
            self::$_singleton->close();
        }

        protected function query($sql) {
            $result = pg_query($this->dbh, $sql);

            if (!$result) {
                echo "Error: " . $sql . "<br>" . pg_last_error($this->dbh);
                die("Error executing query");
            }

            return $result;
        }
    }
?>