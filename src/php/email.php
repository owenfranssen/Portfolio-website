<?php
// if ( ! defined( 'ABSPATH' ) ) {
//   exit; // Exit if accessed directly.
// }

$error = 0;

$message  = "Name: {$_POST['name']}".chr(10);
$message .= "Contact: {$_POST['email']}".chr(10);
$message .= chr(10);
$message .= $_POST['message'];

IF(!(mail('owen@owenfranssen.com', 'Owenfranssen.com contact form', $message))) {
  $error = 1;
}

print json_encode([ 'error' => $error ]);