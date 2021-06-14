<?php
        if(isset ($_POST['otros']))
        {
            include 'includes/cancelacionOtros.php';
            
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
            <legend>Cancelar otros</legend>
        <form method="post">
            <label>RFC Emisor</label><input type="text" name="rfcEmisor" id="rfc" value="<?php if(isset($_POST['rfcEmisor'])){echo $_POST['rfcEmisor'];} ?>" /><br />
            <label>RFC Receptor</label><input type="text" name="rfcReceptor" id="rfc" value="<?php if(isset($_POST['rfcReceptor'])){echo $_POST['rfcReceptor'];} ?>" /><br />
            <label>UUID</label><input type="text" name="UUID" id="UUID" value="<?php if(isset($_POST['UUID'])){echo $_POST['UUID'];} ?>" /><br />            
            <input type="submit" name="otros" value="Cancelar" />
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
                <?php if( isset($Cancelar) ) { 
                        print_r($Cancelar);
                } ?>
            </fieldset>
            

        </fieldset>        
    </body>
</html>