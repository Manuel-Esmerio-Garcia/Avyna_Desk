<?php
	
	$servername = "integratto.net";
	$username = "integrat";
	$password = "fritrubi";
	$databaseName = "integrat_prosalon";

	$backup_file = $databaseName. "_" .date("Y-m-d-H-i-s"). ".sql";
 
	// comandos a ejecutar
	$commands ="mysqldump  -h$servername -u$username -p$password --opt -$databaseName > $backup_file";
	 
	// ejecución y salida de éxito o errores
	    system($commands,$output);


 ?>