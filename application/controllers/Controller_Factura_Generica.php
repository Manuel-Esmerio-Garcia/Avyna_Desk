<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

include('./Clases/CrearXMLPublico.php');
include('./ecodexphp/includes.php');
include('./Clases/LeerCFDI.php');
include('./Clases/RecuperarAcuseGenerica.php');

class Controller_Factura_Generica extends CI_Controller 
{
    public function __construct() 
    {
        parent::__construct();
        if(!isset($_SESSION['Avyna'])) redirect('controller_Login');

		$this->load->model('Configuracion_Model', 'configure');
        $this->load->model("Facturacion_Generica_Model","Facturacion_Generica");
        $this->load->model("Facturacion_Generica_Model","facturacion");
        $this->load->model("Empresa_Model","empresa");
        $this->load->model('Login_Model', 'login');
        $this->load->model('Fetch_Model', 'fetch');

		$this->load->helper('form');
    }

	public function index()
	{
        $Titulo = array('PageTitle' => 'Factura Generica');

        $data['Empresa']  = $this->empresa->getEmpresa(1);
        $data['Status']   = $this->facturacion->getInfoFacturaGenericaByStatus();

        $Usuario = array('username' => $_SESSION['Avyna'][0]['Email'],
                          'pass' =>  $_SESSION['Avyna'][0]['Password']);

        // Refrescar Permisos e información del usuario //
        $Session = $this->login->signIn($Usuario);

        if ($Session != null){  
          // Cargar Vista Inventario //
          $this->load->view('Componentes/Header', $Titulo); 
          $this->load->view('Manejo/Facturacion/Facturacion_Generica',$data);
          $this->load->view('Componentes/Footer');
        }
        else{
          // Cerrar Sesión //
          $this->cerrarSesion($Usuario);
        }   
	}

     // Cerrar Sesión //
    public function cerrarSesion(){
        session_destroy();
        redirect('Controller_Login');
    }















    public function GetDataEmpresById()
    {
        $post = $this->input->post();

        $RFC = $post['RFC'];

        $data       = $this->Facturacion_Generica->GetAllEmpresaById($RFC);

        if ($data != null && $data != "") 
        {
            print_r(json_encode($arrayName = array('Empresa' => $data)));
        }
    }

    public function Guardar_Factura_Generica()
    {
        $datos = $this->input->post();

        $data       = $this->Facturacion_Generica->Guardar_Factura($datos);

        print_r($data);
    }

    public function Guardar_Factura_Generica_Detalle()
    {
        $post               = $this->input->post();
        $Total_Movimientos  = array();

        for ($i=0; $i <= count($post['Movimiento']) -1 ; $i++)
        { 
            $Datos_Json = json_decode($post['Movimiento'][$i]);

            $Movimiento = array('ID_Factura_Generica' => $Datos_Json->ID_Factura_Generica,
                                'Cantidad' => $Datos_Json->Cantidad,
                                'Producto' => $Datos_Json->Producto,
                                'Unidad' => $Datos_Json->Unidad,
                                'Clave_Unidad' => $Datos_Json->Clave_Unidad,
                                'Clave_SAT' => $Datos_Json->Clave_SAT,
                                'Valor_Unitario' => $Datos_Json->Valor_Unitario,
                                'Impuesto' => $Datos_Json->Impuesto,
                                'Retenciones_IVA' => $Datos_Json->Retenciones_IVA,
                                'Retenciones_ISR' => $Datos_Json->Retenciones_ISR,
                                'Descuento' => $Datos_Json->Descuento,
                                'Importe' => $Datos_Json->Importe);

            array_push($Total_Movimientos, $Movimiento);            
        }

        $data       = $this->Facturacion_Generica->Guardar_Factura_Detalle($Total_Movimientos);

        if ($data != false)
        {
            print_r(true);
        }
        else
        {
            print_r(false);
        }

    }


    public function Guardar_Impuestos_Factura_Generica()
    {
        $datos = $this->input->post();

        $Movimiento_Impuesto = [];
        $Impuestos           = json_decode($datos['Impuesto_Mov']);
        $ID                  = $datos['ID'];

        foreach ($Impuestos as $key => $value)
        {
            $Impuestos_Mov = array('ID_Factura_Generica' => $ID,
            'Base' => $value->Base,
            'Impuesto' => $value->Impuesto,
            'Tipo_Factor' => $value->Tipo_Factor,
            'Tasa_Cuota' => $value->Tasa_Cuota,
            'Importe' => $value->Importe,
            'Tipo' => $value->Tipo_Importe);

            array_push($Movimiento_Impuesto,$Impuestos_Mov);
        }

        unset($datos['Impuesto_Mov']);

        $data = $this->Facturacion_Generica->Guardar_Factura_Impuesto($Movimiento_Impuesto);

        print_r($data);

    }

    public function Eliminar_Factura_Detalle()
    {
        $datos  = $this->input->post();

        if ($datos != null && $datos != "")
        {
            $id         = $datos['ID'];

            $data       = $this->Facturacion_Generica->Eliminar_Factura_Detalle($id);
            
        }
        else
        {
            print_r("Error_Detalle");
        }

        print_r($data);
    }

    public function Eliminar_Impuesto_Factura()
    {
        $datos  = $this->input->post();

        if ($datos != null && $datos != "")
        {
            $id         = $datos['ID'];

            $data       = $this->Facturacion_Generica->Eliminar_Impuesto_Factura($id);
            
        }
        else
        {
            print_r("Error_Impuesto");
        }

        print_r($data);
    }

    public function Editar_Factura_Generica()
    {

        $datos  = $this->input->post();

        if ($datos != null && $datos != "")
        {

            $id         = $datos['ID'];
            $data       = $this->Facturacion_Generica->Editar_Factura($datos,$id);
            
        }
        else
        {
            print_r("Error_Editar");
        }

        print_r($data);
    }


    public function Editar_Factura_Generica_Detalle()
    {
        $post               = $this->input->post();
        $Total_Movimientos  = array();

        for ($i=0; $i <= count($post['Movimiento']) -1 ; $i++)
        { 
            $Datos_Json = json_decode($post['Movimiento'][$i]);

            $Movimiento = array('ID_Factura_Generica' => $Datos_Json->ID_Factura_Generica,
                                'Cantidad' => $Datos_Json->Cantidad,
                                'Producto' => $Datos_Json->Producto,
                                'Unidad' => $Datos_Json->Unidad,
                                'Clave_Unidad' => $Datos_Json->Clave_Unidad,
                                'Clave_SAT' => $Datos_Json->Clave_SAT,
                                'Valor_Unitario' => $Datos_Json->Valor_Unitario,
                                'Impuesto' => $Datos_Json->Impuesto,
                                'Retenciones_IVA' => $Datos_Json->Retenciones_IVA,
                                'Retenciones_ISR' => $Datos_Json->Retenciones_ISR,
                                'Descuento' => $Datos_Json->Descuento,
                                'Importe' => $Datos_Json->Importe);

            array_push($Total_Movimientos, $Movimiento);            
        }

        $id         = $Movimiento['ID_Factura_Generica'];

        $data       = $this->Facturacion_Generica->Editar_Factura_Detalle($Total_Movimientos,$id);

        if ($data != 'fallo')
        {
            print_r(true);
        }
        else
        {
            print_r(false);
        }

    }



    public function Facturar_Factura_General()
    {
        $id_factura     = $this->input->post();

        $data['Factura']            = $this->Facturacion_Generica->Facturar($id_factura['ID_Factura']);
        $data['Impuesto']           = $this->Facturacion_Generica->Facturar_Impuesto($id_factura['ID_Factura']);
        $data['Empresa']            = $this->configure->DatosEmpresa($GLOBALS['ID']);
        $data['Relacionado']        = $this->Facturacion_Generica->FacturaRelacion($id_factura['ID_Factura']);

        if ($data != null && $data != "") 
        {
            $XML = new CrearXML();

            $rfc            = $data['Empresa'][0]['RFC'];
            $rfc_cliente    = $data['Formulario'][0]['RFC'];
            $arr            = $data;
            $edidata        = '';
            $nodo           = '';
            $addenda        = '';
            $dir            = '';

            $archivoXML = $XML->satxmlsv33($arr, $edidata, $dir, $nodo, $addenda);

            /*$dir  =  $_SERVER['DOCUMENT_ROOT'].'/avynaFacturacion/Prosalon/XMLs/';  
                                $file = 'XML_ERROR.xml';                                                    //Nombre del XML timbrado
                                $fi = fopen($dir.$file,'w+');                                                                           //Se crea el archivo xml en la ruta especifica
                                fwrite($fi, $archivoXML);                                                                               //Mandamos el archivo XML proporcionado por el PAC    
                                fclose($fi);*/


                if ($archivoXML != null)
                {

                    try{

                        $Seguridad = new Seguridad();                                                                                   //Se crea instancia de la clase Seguridad
                        $trsID = rand( 1, 10000 );                                                  //Se genera el ID
                        $Token = $Seguridad->ObtenerToken( $rfc, $trsID );                                                              //Se genera el token de servicio

                        $Timbra = new Timbrado();                                                                                       //Se crea instancia de la clase Timbrado
                        $trsID = rand(1, 10000);                                                                                    //Se genera el ID
                        $Token = $Seguridad->ObtenerToken($rfc, $trsID);  

                            try{

                                $ComprobanteXML = $Timbra->TimbraXML($archivoXML, $rfc, $trsID, $Token);

                                 if ($ComprobanteXML != null && $ComprobanteXML != "") {

                                $dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_Desk_Test/XMLs/XML_Timbrados/';  
                                $file = $rfc.'_'.$Folio.$hoy.'.xml';                                                    //Nombre del XML timbrado
                                $fi = fopen($dir.$file,'w+');                                                                           //Se crea el archivo xml en la ruta especifica
                                fwrite($fi, $ComprobanteXML);                                                                               //Mandamos el archivo XML proporcionado por el PAC    
                                fclose($fi); 

                                    $dom = new DOMDOCUMENT('1.0','utf-8');// Creamos objeto DOM

                                    $dom->load($dir.$file); // Definimos la ruta de nuestro XML
                                    // Recorremos el XML Tag por Tag para encontrar los elementos buscados
                                    // Obtenemos el Machote(Estructura) del XML desde la web de SAT 
                                    foreach ($dom->getElementsByTagNameNS('http://www.sat.gob.mx/TimbreFiscalDigital', '*') as $elemento) 
                                        {
                 
                                        $UUID             = $elemento->getAttribute('UUID'); 
                                        $noCertificadoSAT = $elemento->getAttribute('NoCertificadoSAT'); 
                                        $FechaTimbrado    = $elemento->getAttribute('FechaTimbrado'); 
                                        $selloCFD         = $elemento->getAttribute('SelloCFD');
                                        $selloSAT         = $elemento->getAttribute('SelloSAT');
                                        $RFCPAC           = $elemento->getAttribute('RfcProvCertif');

                                        }

                                    
                                    if ($UUID != null && $UUID != "") 
                                    {

                                    $XML_Datos = new SimpleXMLElement($ComprobanteXML);


                                    $Sello = explode(" ",$XML_Datos['Sello']);
                                    $Certificado = explode(" ",$XML_Datos['Certificado']);

                                    $FechaFormat = $this->satxmlsv33_xml_fech($FechaTimbrado);

                                    $data['Datos_Factura'] = array(
                                    'ID_Factura_Generica'           =>  $id_factura['ID_Factura'],
                                    'Fecha_Timbrado'                =>  $FechaFormat,
                                    'UUID'                          =>  $UUID,
                                    'IDIntegrador'                  =>  $trsID,
                                    'Status'                        =>  "Timbrado - Pendiente Pago",
                                    'Certificado_SAT'               =>  $noCertificadoSAT,
                                    'Fecha_SAT'                     =>  $FechaTimbrado,
                                    'SelloSAT'                      =>  $selloSAT,
                                    'SelloCFD'                      =>  $selloCFD,
                                    'RFC_PAC'                       =>  $RFCPAC,
                                    'Sello'                         =>  $Sello[0],
                                    'Certificado'                   =>  $Certificado[0],
                                    'IDUsuario'                     =>  $GLOBALS['IDUsuario']
                                    );                      

                                    //Almacenamos la factura a la base de datos
                                    $AddFact        = $this->Facturacion_Generica->Guardar_Factura_Timbrada($data['Datos_Factura']);
                                    $Update_Status  = $this->Facturacion_Generica->Update_Factura_Status($id_factura['ID_Factura']);
                                    $CheckRelacion  = $this->Facturacion_Generica->AddRelacion($data['Relacionado'],$data['Tipo_Relacion']['Tipo_Relacion'],$UUID);

                                    if (empty($AddFact) == false && isset($AddFact)) 
                                    {
                                        $check = true;                                              //Se consume el WebService

                                        print_r($check);
                                        
                                    }
                                    else
                                    {
                                        print_r("Error al agregar Factura");
                                    
                                        $check = false;

                                        return $check;
                                    }

                                }else
                                {

                                    print_r("Error de Timbre");
                                    
                                        $check = false;

                                        return $check;
                                }

                                }else{

                                    echo "Error de Timbre";
                                    $check = false;

                                        return $check;
                                }

                                }catch(FallaValidacion $er)
                                {
                                    print_r($er->__toString());
                                    return  $er->__toString();
                                }

                    }catch(FallaValidacion $er)
                    {
                        print_r($er->__toString());
                        echo $er;

                    }
                
            }
            else
            {

                $check = false;

                print_r($check);

            } 
        }
        else
        {
            print_r(0);
        }
    }


    public function Cancelar_Factura()
    {
        $check = true;
        $hoy = date("_Ymd");

        try
        {
            $data = $this->input->post();

            if(empty($data) == false && isset($data))
            {
                $Factura = $this->Facturacion_Generica->getFacturabyID($data['ID']);

                $Empresa = $this->configure->DatosEmpresa($GLOBALS['ID']);

                foreach ($Factura as $value)
                {
                    
                    $datos['Factura'] = array(

                        "ID"                        =>  $value['ID'],
                        "ID_Factura_Generica"       =>  $value['ID_Factura_Generica'],
                        "Serie"                     =>  $value['Serie'],
                        "Fecha_Timbrado"            =>  $value['Fecha_Timbrado'],
                        "UUID"                      =>  $value['UUID'],
                        "IDIntegrador"              =>  $value['IDIntegrador'],
                        "Status"                    =>  $value['Status']
                        

                    );
                }


                foreach ($Empresa as $value) {
                    
                    $datos['Empresa'] = array(

                        "ID"                            =>  $value['ID'],
                        "Razon_Social"                  =>  $value['Razon_Social'],
                        "RFC"                           =>  $value['RFC'],
                        "Clave_Regimen_Fiscal"          =>  $value['Clave_Regimen_Fiscal'],
                        "Regimen_Fiscal"                =>  $value['Descripcion_Regimen_Fiscal'],
                        "Pass_CSD"                      =>  $value['Pass_CSD'],
                        "CSD_cer"                       =>  $value['CSD_cer'],
                        "CSD_key"                       =>  $value['CSD_key'],
                        "noCertificado"                 =>  $value['noCertificado'],
                        "Direccion"                     =>  $value['Direccion'],
                        "Colonia"                       =>  $value['Colonia'],
                        "Pais"                          =>  $value['Pais'],
                        "Estado"                        =>  $value['Estado'],
                        "Municipio"                     =>  $value['Municipio'],
                        "CP"                            =>  $value['CP'],
                        "Telefono1"                     =>  $value['Telefono1'],
                        "Telefono2"                     =>  $value['Telefono2'],
                        "Email"                         =>  $value['Email'],
                        "Vigencia_Desde"                =>  $value['Vigencia_Desde'],
                        "Vigencia_Hasta"                =>  $value['Vigencia_Hasta']

                    );
                }

                //$dataEmpresa2 = json_encode($dataEmpresa);
                    
                    try{

                        $UUID       = $datos['Factura']['UUID'];
                        $ID_Factura = $datos['Factura']['ID'];
                        $RFC        = $datos['Empresa']['RFC'];

                            $Seguridad = new Seguridad();                                                                                   //Se crea instancia de la clase Seguridad
                            $trsID = rand( 1, 10000 );                                                                                      //Se genera el ID
                            $Token = $Seguridad->ObtenerToken( $RFC , $trsID );                                                             //Se genera el token de servicio

                            $Cancelacion = new Cancelacion();                                                                               //Se crea instancia de la clase Cancelacion
                            $TransaccionID = rand( 1, 10000 );  
                                $arr = explode(",",$UUID);
                                $ListaCancelar = array();    
                                $ListaCancelar["guid"] = array();
                                foreach ($arr as $key => $value) {
                                    array_push($ListaCancelar["guid"], $value);
                                }                                                                                   

                                $Cancelar = $Cancelacion->CancelaMultiple($RFC, $Token, $TransaccionID, $ListaCancelar);

                                    if ($Cancelar['Estatus'] == 'Procesando') 
                                    {

                                        $Estatus        = $this->Facturacion_Generica->UpdateStatusFactura($ID_Factura);

                                        echo $check;
                                    }
                                    else
                                    {

                                        echo "Error_Cancelacion";
                                    }

                                //$Status_Venta     = $this->Model_Facturacion->UpdateStatusVenta_Cancelado($ID_Venta_Total);

                               

                        }catch(FallaValidacion $er)
                        {
                            print_r($er->__toString());
                            exit();
                            return  $er->__toString();
                        }

            }
        }
        catch(Exception $er)
        {
            print_r($er->__toString());
            exit();
            $check = false;
        }
    }

    public function Acuse_Cancelacion()
    {

    $check = true;
    $UUID = null;
    $IdIntegrador = null;
    $RFC = null;

        try
        {
            $ID = $this->input->post();

            if(empty($ID) == false && isset($ID))
            {

                    $datos = $this->Facturacion_Generica->getFacturabyID($ID['ID']);

                    $Empresa = $this->configure->DatosEmpresa($_SESSION['Avyna'][0]['Empresa']);


                        if(empty($datos) == false && isset($datos))
                        {

                            foreach ($datos as $key => $value)
                            {

                                $UUID           = $value['UUID'];
                                $IdIntegrador   = $value['IDIntegrador'];
                            }

                            foreach ($Empresa as $value)
                            {
                    
                                $RFC = $value['RFC'];
                            }
                                
                                    $Seguridad = new Seguridad();
                                    $trsID = rand(1, 10000);
                                    $Token = $Seguridad->ObtenerToken($RFC, $trsID);

                                    $Cancelacion = new Cancelacion();
                                    $trsID = rand(1, 10000);
                                    $Acuse = $Cancelacion->RecuperarAcuses($RFC, $Token, $trsID, $UUID);

                                        if (empty($Acuse) == false && isset($Acuse))
                                        {       
                                            $dir  =  $_SERVER['DOCUMENT_ROOT'].'/Avyna_New/XMLs/XML_Timbrados/Acuse_Cancelacion/';                          //Ruta donde se almacenan los archivos ya timbrados
                                            $file = 'Acuse_'.$RFC.'_'.$UUID.'_'.$ID['ID'].'.xml';                                                               //Nombre del XML timbrado
                                            $fi = fopen($dir.$file,'w+');                                                                                   //Se crea el archivo xml en la ruta especifica
                                            fwrite($fi, $Acuse['AcuseXML']);                                                                                //Mandamos el archivo XML proporcionado por el PAC    
                                            fclose($fi);

                                        echo $check;

                                    }
                                    else
                                    {

                                        echo "Error_Acuse";

                                    }

                        }

                }

        }
        catch(FallaValidacion $er)
        {
            print_r($er->__toString());
            exit();
            $check = false;
        }
    }

    public function Ver_Detalle_Factura()
    {
        $id_factura     = $this->input->post();

        if ($id_factura != null && $id_factura != "")
        {
            $data       = $this->Facturacion_Generica->Get_all_Factura($id_factura['ID_Factura']);    

            if ($data != null && $data != "")
            {
                
            }else
            {
                $data = null;
            }
        }
        else
        {
            print_r("Error_Ver");
        }

        print_r(json_encode($arrayName = array('Factura' => $data)));
    }


    public function Guardar_Relacion_Factura_Generica()
    {

        $data               = $this->input->post();
        $CFDI_Relacionado   = [];

        if ($data != null && $data != "")
        {
            $id         = $data['ID'];
            unset($data['ID']);

            $Contador = count($data) / 2;

            for ($i=1; $i <=$Contador ; $i++)
            {
                $Relacion   = array('ID_Factura_Generica' => $id,
                                    'UUID'                => $data['UUID_'.$i],
                                    'Tipo_Relacion'       => $data['Tipo_'.$i]);

                array_push($CFDI_Relacionado,$Relacion);
            }

            $datos      = $this->Facturacion_Generica->Guardar_Relacion_Factura($CFDI_Relacionado);   
        }
        else
        {
            print_r("Error_id_Factura");
        }

        print_r($datos);
    }

    public function Eliminar_Factura_Relacion()
    {
        $datos  = $this->input->post();

        if ($datos != null && $datos != "")
        {
            $id         = $datos['ID'];

            $data       = $this->Facturacion_Generica->Eliminar_Factura_Relacion($id);
            
        }
        else
        {
            print_r("Error_Relacion");
        }

        print_r($data);
    }


    public function Eliminar_Factura_Creada()
    {
        $ID = $this->input->post();

        if ($ID != null && $ID != "")
        {
            $id         = $ID['ID'];

            $data       = $this->Facturacion_Generica->Eliminar_Factura_Creada($id);
            
        }
        else
        {
            print_r("Error_Eliminar_Factura");
        }

        print_r($data);
    }

    public function Mandar_Email()
    {
        $ruta = $this->input->post();

        $str = str_replace(",", ";", $ruta['Para']);

        if ($ruta != null && $ruta != "")
        {
            $to       = $str;
            $subject  = 'Envio del CFDI con el Folio '.$ruta['ID'];
            $message  = '
            <html>
            <head>
            <title>HTML</title>
            </head>
            <body>
            <a href="'.$ruta['XML'].'" target="_blank">Descargar XML</a>.
            <a href="'.$ruta['PDF'].'" target="_blank">Descargar PDF</a>.
            </body>
            </html>';
            $headers  = 'From: manuel.integratto@gmail.com' . "\r\n" .
                        'MIME-Version: 1.0' . "\r\n" .
                        'Content-type: text/html; charset=utf-8';
            if(mail($to, $subject, $message, $headers))

                print_r(true);

            else

                print_r(false);
        }
        else
        {
            print_r("Error_Correo");
        }
    }

    public function Mandar_Email_Modal()
    {
        $ruta = $this->input->post();

        $str = str_replace(",", ";", $ruta['Para']);

        if ($ruta != null && $ruta != "")
        {
            $to       = $str;
            $subject  = $ruta['Tema'];
            $message  = '
            <html>
            <head>
            <title>HTML</title>
            </head>
            <body><br>"'.$ruta['Mensaje'].'"<br><br><br>
            <a href="'.$ruta['XML'].'" target="_blank">Descargar XML</a>.
            <a href="'.$ruta['PDF'].'" target="_blank">Descargar PDF</a>.
            </body>
            </html>';
            $headers  = 'From: '.$ruta['De'] . "\r\n" .
                        'MIME-Version: 1.0' . "\r\n" .
                        'Content-type: text/html; charset=utf-8';
            if(mail($to, $subject, $message, $headers)){

                print_r(true);

            }else{

                print_r(false);
            }
        }
        else
        {
            print_r("Error_Correo");
        }
    }

    public function Cargar_Correo()
    {
        $data = $this->input->post();

        if ($data != null && $data != "")
        {
            $info = $this->Facturacion_Generica->Cargar_Correo($data['ID_Factura']);

            if ($info != null && $info != "")
            {
                print_r(json_encode($arrayName = array('Factura' => $info)));
            }
            else
            {
                print_r("Error_Query");
            }
        }
        else
        {
            print_r("Error_Correo");
        }
    }

    public function satxmlsv33_xml_fech($fech)
    {
    $ano = substr($fech,0,4);
    $mes = substr($fech,5,2);
    $dia = substr($fech,8,2);
    $hor = substr($fech,11,2);
    $min = substr($fech,14,2);
    $seg = substr($fech,17,2);
    $aux = $ano."-".$mes."-".$dia." ".$hor.":".$min.":".$seg;
    if ($aux == "--T::")
        $aux = "";
    return ($aux);
    }

}

?>