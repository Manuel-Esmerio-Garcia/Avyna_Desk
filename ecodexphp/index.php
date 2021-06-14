<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Servicio Timbrado XML</title>
    </head>
    <body>
        <fieldset><legend>Timbrado/Sellado de XML</legend>
            <form action="index.php" method="POST" enctype="multipart/form-data">
                <label>Usar sellado local: </label><input type="checkbox" name="sellado" value="1" >                
                <br>
                 <input type="hidden" name="carga_archivo" value="1">
                 <b>Seleccione el archivo XML: </b>
                 <br>
                 <input name="userfile" type="file">
                 <br>
                 <input type="submit" value="Enviar">
            </form>
        </fieldset>
        <fieldset><legend>Opciones</legend>
            <label><a href="timbrado">Opciones de Timbrado</a></label>
            <label><a href="repositorio">Opciones de Repositorio</a></label>
            <label><a href="cliente">Opciones de Cliente</a></label>
            <label><a href="cancelacion">Opciones de Cancelación</a></label>
            <label><a href="restApi">RestApi</a></label>
        </fieldset>
        <?php 
            if($_SERVER['REQUEST_METHOD'] == 'POST') { 

                $nombre_archivo = $_FILES['userfile']['name'];
                $tipo_archivo = $_FILES['userfile']['type'];

                if (!(strpos($tipo_archivo, "xml"))) {                                                
                        die("El archivo debe ser XML");
                } else {        
                     if (isset($_FILES["userfile"]) && is_uploaded_file($_FILES['userfile']['tmp_name'])) {                         
                        $fp = fopen($_FILES['userfile']['tmp_name'],"r") or die("No se pudo leer el archivo");
                        $ComprobanteXML = "";
                        while($line = fgets($fp))
                        {
                            $ComprobanteXML .= $line;
                        }
                        fclose($fp);
                     } else {                        
                        die("Ocurrio algún error al Cargar el archivo, intentelo nuevamente.");
                     }
                 }
        ?>
        <fieldset>
            <legend>Resultado</legend>
            <?php 
            include_once 'includes.php';

            $rfc = "LAN8507268IA";            

            /*
             * Generar Token
             */
            $Seguridad = new Seguridad();
            $trsID = rand( 1, 10000 );
            $Token = $Seguridad->ObtenerToken( $rfc, $trsID );
            echo $Seguridad->Log_Conexion();
            echo "Token Generado: " . $Token;

            $Timbra = new Timbrado();
            if( isset($_POST['sellado'])) {
                $trsID = rand( 1, 10000 );
                $ComprobanteXML = $Timbra->SellarXML( $ComprobanteXML);
                if($ComprobanteXML === FALSE)
                    die("Error al generar el sello");
            }

            $trsID = rand(1, 10000);    
            $ComprobanteXML = $Timbra->TimbraXML( $ComprobanteXML, $rfc, $trsID, $Token );
                                               
            echo $Timbra->Log_Conexion();               
                
            $archivo_timbrado = sys_get_temp_dir()  . DIRECTORY_SEPARATOR . "Timbrado-" . $nombre_archivo;
            $file = @fopen( $archivo_timbrado, "w+" );
            $string = $ComprobanteXML;
            $write = @fputs( $file, $string );
            @fclose($file);            
            ?>
            <TEXTAREA ID='cadenaXML' cols='100' rows='15'><?php echo $ComprobanteXML ?></TEXTAREA>            
        </fieldset>
        <?php } ?>
    </body>
</html>
