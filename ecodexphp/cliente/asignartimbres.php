<?php
        if(isset ($_POST['asignartimbres']))
        {
            include 'includes/asignartimbresCliente.php';

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
            <legend>cliente</legend>
        <form method="post" action="asignartimbres.php">
            <label>RFC</label><input type="text" name="rfc" value="<?php if(isset($_POST['rfc'])){echo $_POST['rfc'];} ?>" /><br />
            <label>Timbres</label><input type="text" name="timbres" value="<?php if(isset($_POST['timbres'])){echo $_POST['timbres'];} ?>" /><br />
            <input type="submit" name="asignartimbres" value="Asignar timbres" />
        </form>
            <fieldset>
                <legend>Log</legend>
                <?php
                    if(isset ($log))
                    echo $log;
                ?>
            </fieldset>
            <fieldset>
                <legend>Información</legend>
                <?php if(isset($Asignacion)) { ?>
                <label>Saldo Nuevo</label><input type="text" disabled value="<?php echo $Asignacion['SaldoNuevo']; ?>"/><br>
                <label>Saldo Anterior</label><input type="text" disabled value="<?php echo $Asignacion['SaldoAnterior']; ?>"/><br>
                <?php } ?>
            </fieldset>


        </fieldset>
    </body>
</html>
