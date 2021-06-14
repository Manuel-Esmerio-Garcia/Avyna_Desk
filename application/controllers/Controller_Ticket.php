<?php
defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);

class Controller_Ticket extends CI_Controller 
{

	public $usermain = null;

public function __construct()
{
	parent::__construct();
        
        if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('Ticket_Model', 'Ticket');
}


public function index()
{

	$Titulo = array('PageTitle' => 'Ticket');

    $this->load->view('Componentes/Header', $Titulo); 
	$this->load->view('Ticket/Ticket');
	$this->load->view('Componentes/Footer');	

}

public function getComentarios(){

	$check = false;

	try{

	$data = $this->input->post();

	if ($data != null) {
		
		$Tickets['Comentarios'] = $this->Ticket->getAllComentariosbyID($data);

		if (empty($Tickets['Comentarios']) != true) 
		{
			$Tickets['TicketCliente'] = $this->Ticket->getAllTicketByIdComentario($data['ID']);
			$check = true;
		}
		else
		{
			$Tickets['TicketCliente'] = $this->Ticket->getAllTicketByIdComentario($data['ID']);

			$check = true;
		}

	}

}catch(Exeption $er){

	$check = false;
}

print_r(json_encode($Tickets));

}

public function AddComentarios(){

	$check = false;
	$status = null;
	$Usuario = null;

	try{

	$data = $this->input->post();

	if ($data != null) {

		$array = array(
						"ID" => $data['IDTickets'],
						"Status" => $data['Status']);

		$Usuario = $data['Session'];

		unset($data['Status'],$data['Session']);

		$data['Fecha'] = date("Y-m-d H:i:s");

		if ($data['Titulo'] != null) 
		{
		
		$Tickets['Comentarios'] = $this->Ticket->SaveComentario($data);
		$update = $this->Ticket->updateTicketById($array);
		$check = true;

		}else{

			$update = $this->Ticket->updateTicketById($array);
			$check = true;
		}

	}

}catch(Exeption $er){

	$check = false;
}

echo $check;

}

public function AddTicket(){

	$check = false;

	try{

	$data = $this->input->post();

	if ($data['Titulo'] != null && $data['Descripcion'] != null) {
		
		$check = $this->Ticket->SaveTicket($data);
	}

	}catch(Exeption $er){

		$check = false;
	}

	echo $check;

	}

	public function EditTicket(){

	$check = false;

	try{

	$data = $this->input->post();

	if ($data != null) {
		
		$check = $this->Ticket->EditTicket($data);
	}

	}catch(Exeption $er){

		$check = false;
	}

	echo $check;

	}

	public function deleteTicket(){

		$check = false;

		try{

			$data = $this->input->post();

			if ($data != null) 
			{
				
				$check = $this->Ticket->deleteTicket($data['ID']);

			}

		}catch(Exeption $er){

			$check = false;

		}

		echo $check;
	}

} 

?>