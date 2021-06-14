<?php
class HelpDesk_Model extends CI_Model
{
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function getAllTicketDesk()
	{

		$Ticket = null;

		try
		{
			
			$this->db->select('T.*, CONCAT(U.Nombre, " ", U.Apellidos) AS Usuario'); 
			$this->db->from('tickets AS T');
			$this->db->join('Usuarios AS U', 'T.idUsuario_solicita = U.ID');
			$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$Ticket = $result;
		}
		catch(Exception $er)
		{
			$Ticket = null;
		}
		return $Ticket;
	}

	public function getAllTicketDeskGroupBy()
	{

		$Ticket = null;

		try
		{
			
			$this->db->select('U.ID, CONCAT(U.Nombre, " ", U.Apellidos) AS Usuario'); 
			$this->db->from('tickets AS T');
			$this->db->join('Usuarios AS U', 'T.idUsuario_solicita = U.ID');
			$this->db->group_by("U.ID");
			$this->db->order_by('U.Nombre', 'desc'); 
			$query = $this->db->get();
			$result = $query->result_array();
			$Ticket = $result;
		}
		catch(Exception $er)
		{
			$Ticket = null;
		}
		return $Ticket;
	}

	public function getAllTicketById($id)
	{

		$Ticket = null;

		try
		{
			
			$this->db->select('T.*, CONCAT(U.Nombre, " ", U.Apellidos) AS Usuario'); 
			$this->db->from('tickets AS T');
			$this->db->join('Usuarios AS U', 'T.idUsuario_solicita = U.ID');
			$this->db->where('U.ID', $id);
			$this->db->limit(15);
			$query = $this->db->get();
			$result = $query->result_array();
			$Ticket = $result;
		}
		catch(Exception $er)
		{
			$Ticket = null;
		}
		return $Ticket;
	}

	public function getAllTicketByIdComentario($id)
	{

		$Ticket = null;

		try
		{
			
			$this->db->select('T.*, CONCAT(U.Nombre, " ", U.Apellidos) AS Usuario'); 
			$this->db->from('tickets AS T');
			$this->db->join('Usuarios AS U', 'T.idUsuario_solicita = U.ID');
			$this->db->where('T.ID', $id);
			$query = $this->db->get();
			$result = $query->result_array();
			$Ticket = $result;

		}
		catch(Exception $er)
		{
			$Ticket = null;
		}
		return $Ticket;
	}

	public function getAllComentariosbyID($data)
	{

		$Ticket = null;

		try
		{
			
			$this->db->select("CT.* , T.FechaHora, T.idUsuario_solicita, T.Titulo As Titulo_Ticket, T.Descripcion, T.Status, Concat(U.Nombre, ' ' , U.Apellidos) AS Usuario"); 
			$this->db->from('Comentario_Tickets AS CT');
			$this->db->join('tickets AS T', 'CT.IDTickets = T.ID');
			$this->db->join('Usuarios AS U', 'T.idUsuario_solicita = U.ID');
			$this->db->where('T.ID', $data['ID']);
			//$this->db->where('idUsuario_solicita !=', $data['IDUsuario']);
			$query = $this->db->get();
			$result = $query->result_array();
			$Ticket = $result;
		}
		catch(Exception $er)
		{
			$Ticket = null;
		}
		return $Ticket;
	}

	public function SaveComentario($data)
	{

		$insertComentario = false;

		try
		{
			$Resultado = $this->db->insert('Comentario_Tickets', $data);
			$insert_id = $this->db->insert_id();
			$insertComentario = true;
		}
		catch(Exception $er)
		{
			$insertComentario = false;
		}
		return $insertComentario;
	}

	public function SaveTicket($data)
	{

		$insertComentario = false;

		try
		{
			$Resultado = $this->db->insert('tickets', $data);
			$insert_id = $this->db->insert_id();
			$insertComentario = true;
		}
		catch(Exception $er)
		{
			$insertComentario = false;
		}
		return $insertComentario;
	}

	public function updateTicketById($array)
	{

		$updateTicket = false;

		try
		{

			$this->db->where("ID", $array['ID']);
			$this->db->set('Status', $array['Status']);
			$this->db->update('tickets');
			$updateTicket = true;
		}
		catch(Exception $er)
		{
			$updateTicket = false;
		}
		return $updateTicket;
	}

	public function EditTicket($array)
	{

		$updateTicket = false;

		try
		{
			$this->db->where('ID', $array['ID']);
			$this->db->set('FechaHora', $array['FechaHora']);
			$this->db->set('idUsuario_solicita', $array['idUsuario_solicita']);
			$this->db->set('Titulo', $array['Titulo']);
			$this->db->set('Descripcion', $array['Descripcion']);
			$this->db->set('Status', $array['Status']);
			$this->db->update('tickets');
			
			$updateTicket = true;
		}
		catch(Exception $er)
		{
			$updateTicket = false;
		}
		return $updateTicket;
	}

	public function deleteTicket($id)
	{

		$updateTicket = false;

		try
		{
			$this->db->where('ID', $id);
			$this->db->delete('tickets');
			
			$updateTicket = true;
		}
		catch(Exception $er)
		{
			$updateTicket = false;
		}
		return $updateTicket;
	}

}

?>