<?php
    require('Conexion.php');
    $Conexion = new Conexion();
    $connect  = $Conexion->Connect();
    $link     = $Conexion->link();

    mysqli_set_charset($connect,"utf8");

    $query = "SELECT ID, Distribuidor, Sucursal, Total, Status, Fecha_venta FROM Reporte_Vetas where (ID LIKE '%%') ";

    if($_POST['dateBegin'] != "" && $_POST['dateEnd'] != ""){
        $query .= 'AND Fecha_venta BETWEEN "'.$_POST["dateBegin"].'" AND "'.$_POST["dateEnd"].'"';
    }

    if ($_POST["selectBranch"] != null && $_POST['selectBranch'] != ""){
        $query .= " AND Sucursal = '".$_POST['selectBranch']."'";
    }

    if ($_POST["selectStatus"] != null && $_POST['selectStatus'] != ""){
        $query .= "AND Status = '".$_POST['selectStatus']."'";
    }


    // // output headers so that the file is downloaded rather than displayed
    header('Content-type: text/csv');
    header('Content-Disposition: attachment; filename="Reporte Ventas.csv"');
    
    // do not cache the file
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // create a file pointer connected to the output stream
    $file = fopen('php://output', 'w');

    // send the column headers
    fputcsv($file, array('ID', 'Distribuidor','Sucursal', 'Total', 'Status', 'Fecha'));

    if ($rows = mysqli_query($link, $query)){
        // loop over the rows, outputting them
        while ($row = mysqli_fetch_assoc($rows)){
            fputcsv($file, $row);
        }
    }

    // close the connection
    mysqli_close($link);
?>