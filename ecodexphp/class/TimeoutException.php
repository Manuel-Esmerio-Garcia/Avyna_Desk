<?php
class TimeoutException extends Exception
{	

	public function __construct($message = 'Tiempo de espera superado', $code = 408, Exception $previous = null) {
        parent::__construct( $message, $code, $previous );        
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}

?>