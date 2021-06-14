		<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
ini_set('display_errors', 1);
ini_set('max_execution_time', 0); 
ini_set('memory_limit','-1');
ini_set('post_max_size', '64M');
ini_set('upload_max_filesize', '64M');
error_reporting(E_ERROR);
		
		class Controller_HelpDesk extends CI_Controller 
		{

			public $usermain = null;
		
		public function __construct()
		{
		parent::__construct();
		  if(!isset($_SESSION['Avyna'])){
        	redirect('controller_Login');
        }
		$this->load->model('HelpDesk_Model', 'HelpDesk');
		}


		public function index()
		{

			$data['Filtro'] = $this->HelpDesk->getAllTicketDeskGroupBy();

			$Titulo = array('PageTitle' => 'HelpDesk');

		    $this->load->view('Componentes/Header', $Titulo); 
			$this->load->view('Ticket/HelpDesk',$data);
			$this->load->view('Componentes/Footer');
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
				
				$Tickets['Comentarios'] = $this->HelpDesk->SaveComentario($data);
				$update = $this->HelpDesk->updateTicketById($array);
				$check = true;

				}else{

					$update = $this->HelpDesk->updateTicketById($array);
					$check = true;
				}

			}

		}catch(Exeption $er){

			$check = false;
		}

		echo $check;

		}


		public function getComentarios(){

			$check = false;

			try{

			$data = $this->input->post();

			if ($data != null) {
				
				$Tickets['Comentarios'] = $this->HelpDesk->getAllComentariosbyID($data);

				if (empty($Tickets['Comentarios']) != true) 
				{
					$Tickets['TicketCliente'] = $this->HelpDesk->getAllTicketByIdComentario($data['ID']);
					$check = true;
				}
				else
				{
					$Tickets['TicketCliente'] = $this->HelpDesk->getAllTicketByIdComentario($data['ID']);

					$check = true;
				}

			}

		}catch(Exeption $er){

			$check = false;
		}

		print_r(json_encode($Tickets));

		}



		public function EditTicket(){

			$check = false;

			try{

			$data = $this->input->post();

			if ($data != null) {
				
				$check = $this->HelpDesk->EditTicket($data);
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
						
						$check = $this->HelpDesk->deleteTicket($data['ID']);

					}

				}catch(Exeption $er){

					$check = false;

				}

				echo $check;
			}
		
		} 
		
		?>