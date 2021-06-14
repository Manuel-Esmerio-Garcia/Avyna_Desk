<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
        <fieldset id="status">
            <legend>Obtener información documentos</legend>
        <form method="post" action="obtener.php">
            <label>RFC: </label><input type="text" readonly name="rfc" id="rfc" value="<?php echo isset($_POST['rfc']) ? $_POST['rfc'] : 'AAA010101AAA' ?>" /><br />
            <label>HASH: </label><input type="text" name="hash" id="hash" value="<?php if (isset($_POST['hash'])) {echo $_POST['hash'];}?>" /><br />
            <input type="submit" name="obtener" id="obtener" value="Obtener" />
        </form>
    <?php if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	include '../includes.php';
	$api = new RestApi();
	$token = $api->GetToken($_POST['rfc']);
	$documento = $api->GetDocumento($token, $_POST['hash']);
	?>
            <fieldset>
                <legend>Objeto:</legend>
                <?php echo $api->Log_Conexion(); ?>
            </fieldset>
            <?php if (is_object($documento)) {?>
            <fieldset>
                <legend>Propiedades</legend>
                <ul>
                    <?php foreach ($documento as $key => $value) {?>
                    <li><b><?php echo $key ?></b> <?php echo $documento->$key ?></li>
                    <?php }?>
                </ul>
            </fieldset>
            <?php } else {?>
           <fieldset>
                <legend>XML</legend>
                <pre><?php echo htmlentities($documento) ?></pre>
           </fieldset>
           <?php }?>
    <?php }?>
        </fieldset>
    </body>
</html>