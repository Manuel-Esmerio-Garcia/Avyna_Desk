<?php
        if(isset ($_POST['cancel']))
        {
            include 'includes/cancelacionMultiple.php';
        }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
        <fieldset id="cancel">
            <legend>Cancelar Comprobante</legend>
        <form method="post">
            <label>RFC</label><input type="text" name="rfc" id="rfc" value="<?php if(isset($_POST['rfc'])){echo $_POST['rfc'];} ?>" /><br />
            <label>UUIDs (separar por coma ",")</label> <br>           
            <textarea  style="margin: 2px; width: 348px; height: 102px;"  name="UUIDs"><?php if(isset($_POST['UUIDs'])){echo $_POST['UUIDs'];} ?></textarea><br /> 
            <input type="submit" name="cancel" id="cancel" value="Cancelar Comprobante" />
        </form>
            <fieldset>
                <legend>Log</legend>
                <?php
                if(isset ($log))
                    echo $log;
                ?>
            </fieldset>
            <fieldset>
                <legend>Resultado</legend>                
                <?php if(isset ($Cancelar)) print_r($Cancelar); ?>                
            </fieldset>


        </fieldset>
    </body>
</html>
