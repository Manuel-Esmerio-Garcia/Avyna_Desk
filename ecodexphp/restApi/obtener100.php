<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
    </head>
    <body>
        <fieldset id="status">
            <legend>Obtener información documentos</legend>
        <form method="post" action="obtener100.php">
            <label>RFC: </label><input type="text" readonly name="rfc" id="rfc" value="<?php echo isset($_POST['rfc']) ? $_POST['rfc'] : 'AAA010101AAA' ?>" /><br />

            <label>Límite (Máximo 100): </label><input type="number" max="100" min="1" name="limit" id="limit" value="<?php echo isset($_POST['limit']) ? $_POST['limit'] : '100' ?>" /><br />
            <input type="submit" name="obtener" id="obtener" value="Obtener" />
        </form>
    <?php if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	include '../includes.php';
	$api = new RestApi();
	$token = $api->GetToken($_POST['rfc']);
	$documentos = $api->GetDocumentos($token, $_POST['limit']);
	?>
            <fieldset>
                <legend>Objeto:</legend>
                <?php echo $api->Log_Conexion(); ?>
            </fieldset>
           <fieldset>
            <legend>Propiedades</legend>
            <ul>
                <?php foreach ($documentos as $documento) {?>
                    <p>Documento:</p>
                    <?php foreach ($documento as $key => $value) {?>
                        <li><b><?php echo $key ?></b> <?php echo $documento->$key ?></li>
                    <?php }?>
                    <hr>
                <?php }?>
            </ul>
           </fieldset>
    <?php }?>
        </fieldset>
    </body>
</html>