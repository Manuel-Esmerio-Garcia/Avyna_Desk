<?php
class FallaSesion extends Exception
{	
	public $Descripcion;
	public $Estatus;
	public $RFC;

	public function __construct($serviceError, Exception $previous = null) {   
		$this->Descripcion =  utf8_encode($serviceError['Descripcion']);
        $this->Estatus = $serviceError['Estatus'];     
        $this->RFC = $serviceError['RFC'];
        parent::__construct( $this->Descripcion, $this->Estatus, $previous );
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->Estatus}]: {$this->Descripcion}\n";
    }
}

?>