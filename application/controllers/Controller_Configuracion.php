<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

include('Clases/Certificados.php');

class Controller_Configuracion extends CI_Controller 
{	
	 public function __construct() 
    {
        parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Configuracion_Model', 'configure');        
    }

	public function index()
	{

    $Titulo = array('PageTitle' => 'Configracion');

    $this->load->view('Componentes/Header', $Titulo); 
	$this->load->view('Configuracion/Configuracion');
	$this->load->view('Componentes/Footer');	
	}

	public function Cargar_Informacion()
	{
		$data['Empresa'] = $this->configure->DatosEmpresa($_SESSION['Avyna'][0]['Empresa']);
		print_r(json_encode($data));
	}

	//Funcion indice en donde manda llamar la aplicacion la vista principal
	public function updateEmpresa()
	{
		$datos = $this->input->post();
		$result = $this->configure->updateEmpresa($datos);
		print_r($result);
	}

	public function EliminarCertificados()
	{
		$data = $this->input->post();

		$ID 				= $_SESSION['Avyna'][0]['Empresa'];

		$ArchivosCertificado = array(
			"noCertificado"		=>	"",
			"Vigencia_Hasta"	=>	"",
			"Vigencia_Desde"	=>	"",
			"Pass_CSD"			=>	"",
			"CSD_cer"			=>	"",
			"CSD_key"			=>	""
		);

		$Result = $this->configure->UpdateEmpresaCertificado($ArchivosCertificado, $ID);

		print_r($Result);
		
	}

			  	//Funcion que se ejecuta cuando le damos click en el modulo de Distribuidores. Esta funcion muestra la pagina principal de Distribuidores
	public function ManejoCertificado()
	{
		$Manejo = new Certificados();

		$check 				= "";
		$Serie  			= "";
		$Desde  			= "";
		$Hasta  			= "";
		$Valida 			= "";
		$ContrasenaMD5		= "";

		$fileCertificadoCER = $_FILES["RutaCer"];
		$archivoCER 		= $_FILES["RutaCer"]["tmp_name"];
		$DestinoCER 		= $_SERVER['DOCUMENT_ROOT']."/Avyna_Desk/Sellos/CSD/".$_FILES["RutaCer"]["name"];
		move_uploaded_file($archivoCER, $DestinoCER);
		$certificadoCER 	= $_SERVER['DOCUMENT_ROOT']."/Avyna_Desk/Sellos/CSD/".$_FILES["RutaCer"]["name"];

		$fileCertificadoKEY = $_FILES["RutaKey"];
		$archivoKEY 		= $_FILES["RutaKey"]["tmp_name"];
		$DestinoKEY 		= $_SERVER['DOCUMENT_ROOT']."/Avyna_Desk/Sellos/CSD/".$_FILES["RutaKey"]["name"];
		move_uploaded_file($archivoKEY, $DestinoKEY);
		$certificadoKEY 	= $_SERVER['DOCUMENT_ROOT']."/Avyna_Desk/Sellos/CSD/".$_FILES["RutaKey"]["name"];

		$data['Manejo'] = $this->input->post();

		$pass 			= $data['Manejo']['Contraseña'];
		$ContrasenaMD5		= md5($pass);

		//$PassHash = password_hash($pass, PASSWORD_BCRYPT);

		$CCPEM = $certificadoCER.'.pem';
		$CKPEM = $certificadoKEY.'.pem';

		if (!file_exists($CCPEM)) 
		{
			//Regresa 1 si el archivo .CER.PEM fue creado con exito
			$Result['SerieCER'] = $Manejo->generaCerPem($certificadoCER);
			if ($Result['SerieCER']['result'] != 1) 
			{
				echo "CER";
				exit();
			}

			//Regresa 1 si el archvio .KEY.PEM fue creado con exito
			$Result['SerieKEY'] = $Manejo->generaKeyPem($certificadoKEY, $pass);

			if ($Result['SerieKEY']['result'] != 1) 
			{
				echo "KEY";
				exit();
			}
		}

		//Regresa 1 si el archvio .KEY.PEM fue creado con exito
		$Result['Password'] = $Manejo->generaKeyPem($certificadoKEY, $pass);
			
		if ($Result['Password']['result'] != 1) 
		{
			echo "Contrasena";
			exit();
		}
				//Regresa un 1 si ambos archivos si son pareja
				$Result['Pareja']	= $Manejo->pareja($CCPEM, $CKPEM);

				if ($Result['Pareja']['result'] == 1) {

					//Regresa 1 y OU si el certificado si es valido
					$Result['Valida'] = $Manejo->validarCertificado($CCPEM);

					if ($Result['Valida']['result'] == 1) {
					
						$Valida 	=	$Result['Valida']['OU'];

						//Regresa arreglo con valor 1 y Serie cuando encuentra el archivo .CER.PEM
						$Result['Serie'] = $Manejo->getSerialCert($CCPEM);

							if ($Result['Serie']['result'] == 1) {

								$Serie 	= $Result['Serie']['serial'];

								//Regresa arreglo con valor 1 y fecha de inicio del certificado
								$Result['Desde'] = $Manejo->getFechaInicio($CCPEM);

								if ($Result['Desde']['result'] == 1) {

									//Regresa arreglo con valor 1 y fecha de caducidad del certificado
									$Result['Hasta'] = $Manejo->getFechaVigencia($CCPEM);
								
									$Desde 	= $Result['Desde']['fecha'];

									if ($Result['Hasta']['result'] == 1) {

									$Hasta 	= $Result['Hasta']['fecha'];

									$ID 				= $_SESSION['Avyna'][0]['Empresa'];

									$ArchivosCertificado = array(

										"noCertificado"		=>	$Serie,
										"Vigencia_Hasta"    =>	$Hasta,
										"Vigencia_Desde"    =>	$Desde,
										"Pass_CSD"			=>	$ContrasenaMD5,
										"CSD_cer"			=>	$certificadoCER,
										"CSD_key"			=>	$certificadoKEY
									);

									$Resultado = $this->configure->UpdateEmpresaCertificado($ArchivosCertificado, $ID);

									print_r($Resultado);
									exit();

								}else{

									echo "FechaFinal";
								}

							}else{

								echo "FechaInicio";
							}

						}else{

							echo "Serie";
						}
	
				}else{

					echo "Valida";
				}

			}else{

				echo "Pareja";
			}

	}
}

?>
