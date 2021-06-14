<?php
        if(isset ($_POST['acuse']))
        {
            include 'includes/acuseCancelacion.php';
            
        }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
        <fieldset id="status">
            <legend>Acuse de cancelación</legend>
        <form method="post">
            <label>RFC</label><input readonly type="text" name="rfc" id="rfc" value="<?php echo isset($_POST['rfc']) ? $_POST['rfc'] : 'AAA010101AAA' ?>" /><br />
            <label>UUID</label><input type="text" name="UUID" id="UUID" value="<?php if(isset($_POST['UUID'])){echo $_POST['UUID'];} ?>" /><br />
            <input type="submit" name="acuse" id="estatus" value="Obtener Acuse" />
        </form>
            <fieldset>
                <legend>Log</legend>
                <?php
                    if(isset ($log))
                    echo $log;
                ?>
            </fieldset>        
            <fieldset>
                <legend>Acuse</legend>
                <?php if( isset($Acuse) )
                //print_r($Acuse);
                 { ?>
                <label>AcuseXML</label><br>
                <textarea><?php echo $Acuse['AcuseXML']; ?></textarea><br>
                <label>Estatus</label><input type="text" name="codigo" disabled value="<?php echo $Acuse['Estatus']; ?>"/>                
                <?php } ?>
            </fieldset>
            

        </fieldset>        
    </body>
</html>
