<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';


class MY_Email{
    public function SendEmail($object){

        $handleError = '';

        if ($object['Email'] != "") {

            // Instantiation and passing `true` enables exceptions
            $mail = new PHPMailer(true);

            try {
                //Server settings
                $mail->SMTPDebug = 0;                      // Enable verbose debug output
                $mail->isSMTP();                                            // Send using SMTP
                //$mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
                $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
                //$mail->Host       = 'smtpout.secureserver.net';
                $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                $mail->Username   = 'avyna.develop@gmail.com';                     // SMTP username
                $mail->Password   = '30deagosto95';                               // SMTP password
                $mail->SMTPSecure = 'TLS';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
                $mail->Port       = 587;                                   // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above                                  // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        
                //Recipients
                $mail->setFrom('whs.mx@avyna.info', 'Avyna Cosmeticos');
                $mail->addAddress($object['Email'],$object['Nombre']);     // Add a recipient
                //$mail->addReplyTo('whs.mx@avyna.info', 'Avyna Cosmeticos');
        
                // Content
                $mail->isHTML(true);                                  // Set email format to HTML
                $mail->Subject = 'CUPON AVYNA';
                $mail->Body    = '<h2>Hola '.$object['Nombre'].'!</h2>
                                <p>Has recibido un '.utf8_decode('cupón').' para comprar productos en avynacos.mx.</p> 
                                <p>Ingresa al sitio y antes de finalizar tu compra selecciona el '.utf8_decode('cupón').' para aplicar tu descuento.</p>
                                <p>'.utf8_decode('Cupón').': <b>'.$object['Cupon'].'</b></p>
                                <p>'.utf8_decode('Monto Cupón').': <b> $'.number_format($object['Monto'], 2, '.', '').'</b></p>';
           
                $mail->send();

            } catch (Exception $e) { 
                $handleError .= 'Ocurrio un error al enviar el correo al salon: ' .$object['Nombre']. ', por favor de verificar el correo electronico. \n';
            }
        }
        else{
            $handleError .= 'El salon: ' .$object['Nombre']. ', No tiene un correo asignado. \n';
        }

        return $handleError;

    }
}