<?php
    if(isset ($_POST['alta']))
    {
        include 'includes/altaCliente.php';

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
            <legend>Cliente</legend>
        <form method="post" action="alta.php">
            <label>RFC Integrador</label><input type="text" name="rfcintegrador" value="<?php echo isset($_POST['rfcintegrador']) ? $_POST['rfcintegrador'] : 'BBB010101001' ?>" /><br />
            <label>RFC Emisor</label><input type="text" name="rfcemisor" value="<?php if(isset($_POST['rfcemisor'])){echo $_POST['rfcemisor'];} ?>" /><br />
            <label>Razón Social Emisor</label><input type="text" name="razonsocial" value="<?php if(isset($_POST['razonsocial'])){echo $_POST['razonsocial'];} ?>" /><br />
            <label>Email Emisor</label><input type="text" name="email" value="<?php if(isset($_POST['email'])){echo $_POST['email'];} ?>" /><br />
            <input type="submit" name="alta" value="Registrar Cliente" />
        </form>
            <fieldset>
                <legend>Log</legend>
                <?php
                    if(isset ($log))
                    echo $log;
                ?>
            </fieldset>
            <fieldset>
                <legend>Alta</legend>                
                    <?php if (isset ($Registro)) { ?>
                    <label>RFC</label><input type="text" disabled value="<?php echo $Registro['RFC']; ?>"/><br>                    
                    <label>Estatus</label><input type="text" disabled value="<?php echo $Registro['Estatus']; ?>"/><br>
                    <label>Clave Certificado</label><input type="text" disabled value="<?php echo $Registro['ClaveCertificado']; ?>"/><br>
                    <?php } ?>
            </fieldset>


        </fieldset>
    </body>
</html>
