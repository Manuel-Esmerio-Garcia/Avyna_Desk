<?php 
	
	class Conexion
	{
		private $conn;
		function __construct()
		{
			$servername 	= "prosalon4810.cloudapp.net";
			$username 		= "prosalon";
			$password 		= "prosalonAdmin1";
			$databaseName 	= "prosalon_dev";

			/*$servername 		= "integratto.net";
			$username 			= "integrat";
			$password 			= "fritrubi";
			$databaseName 		= "integrat_prosalon";*/

			$this->conn = mysqli_connect($servername,$username,$password, $databaseName) or die ("Error al conectarse a la base de datos".mysqli_error());

			mysqli_select_db($this->conn, $databaseName);
			 mysqli_set_charset($this->conn,"utf8");
		}


		public function Query($query){
			$ResultQuery = mysqli_query($this->conn, $query);
			$result = array();
			while($rowTemp = mysqli_fetch_array($ResultQuery)){
    			array_push($result,$rowTemp);
    		}
			return $result;
		}

		public function Connect(){
			  return $this->conn;
		}

		public function link(){
			//return mysqli_connect('integratto.net', 'integrat', 'fritrubi', 'integrat_prosalon');
			return mysqli_connect('prosalon4810.cloudapp.net', 'prosalon', 'prosalonAdmin1', 'prosalon_dev');
		}
	}
?>