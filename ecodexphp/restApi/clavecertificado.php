<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
        <fieldset id="status">
            <legend>Obtener clave de carga de certificado</legend>
        <form method="post" action="clavecertificado.php">
            <label>RFC: </label><input type="text" name="rfc" id="rfc" value="<?php echo isset($_POST['rfc']) ? $_POST['rfc'] : 'AAA010101AAA' ?>" /><br />
            <input type="submit" name="obtener" id="obtener" value="Obtener" />
        </form>
    <?php if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	include '../includes.php';
	$api = new RestApi();
	$token = $api->GetToken($_POST['rfc']);
	$clave = $api->GetClaveCertificado($token);
	?>
            <fieldset>
                <legend>Objeto:</legend>
                <?php echo $api->Log_Conexion(); ?>
            </fieldset>
           <fieldset>
            <legend>Propiedades</legend>
            <ul>
                <?php foreach ($clave as $key => $value) {?>
                <li><b><?php echo $key ?></b> <?php echo $clave->$key ?></li>
                <?php }?>
            </ul>
           </fieldset>
    <?php }?>
        </fieldset>
    </body>
</html>