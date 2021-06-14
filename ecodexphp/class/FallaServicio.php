<?php
class FallaServicio extends Exception
{	
	public $Descripcion;
    public $Numero;
	public $Evento;
	public $RFC;

	public function __construct($serviceError, Exception $previous = null) {   
		$this->Descripcion =  utf8_encode($serviceError['Descripcion']);
        $this->Evento = $serviceError['Evento'];     
        $this->RFC = $serviceError['RFC'];
        $this->Numero = $serviceError['Numero'];
        parent::__construct( $this->Descripcion, $this->Numero, $previous );
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->Numero}]: {$this->Descripcion}\n";
    }
}

?>