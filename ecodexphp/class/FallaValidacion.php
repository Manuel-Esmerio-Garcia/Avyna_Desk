<?php
class FallaValidacion extends Exception
{	
    public $RFC;
	public $Descripcion;
	public $Numero;	
    public $Sugerencia;

	public function __construct($serviceError, Exception $previous = null) {   
		
        $this->Descripcion =  $serviceError['Descripcion'];
        $this->Numero = $serviceError['Numero'];
        $this->Sugerencia = $serviceError['Sugerencia'];
        $this->RFC = $serviceError['RFC'];
        parent::__construct( $this->Descripcion, $this->Numero, $previous );        
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->Numero}]: {$this->Descripcion}\n";
    }
}

?>