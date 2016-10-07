<?php

/**
 * A simple, clean and secure PHP Login Script / MINIMAL VERSION

 THIS HAS BEEN UPDATED
 *
 * Uses PHP SESSIONS, modern password-hashing and salting and gives the basic functions a proper login system needs.
 *
 * @author Panique
 * @link https://github.com/panique/php-login-minimal/
 * @license http://opensource.org/licenses/MIT MIT License
 */

// checking for minimum PHP version
if (version_compare(PHP_VERSION, '5.3.7', '<')) {
    exit("Sorry, Simple PHP Login does not run on a PHP version smaller than 5.3.7 !");
} else if (version_compare(PHP_VERSION, '5.5.0', '<')) {
    // if you are using PHP 5.3 or PHP 5.4 you have to include the password_api_compatibility_library.php
    // (this library adds the PHP 5.5 password hashing functions to older versions of PHP)
    require_once("libraries/password_compatibility_library.php");
}

// include the configs / constants for the database connection
require_once("db.php");

// load the login class
require_once("Login.php");

// create a login object. when this object is created, it will do all login/logout stuff automatically
// so this single line handles the entire login process. in consequence, you can simply ...
$login = new Login();

?>

<html>
    <head>

        <title> Secure Single Login </title>
        <meta description="A secure sign in page used in wrapping other applications.">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    </head>

    <body>
        <h1 class="" style="text-align: center; padding: 60px 0px 0px">Secure Single Log In</h1>
		
		<div class="container-fluid">
			<div class="row">

				<div class="">
					<?php
						// ... ask if we are logged in here:
						if ($login->isUserLoggedIn() == true) {
						   // This re-directs to the app folder which contains the application
						   include("views/app/index.php");
						}
					?>
				</div>
				<div class="col-md-offset-4 col-md-4">
					<?php
						// ... ask if we are logged in here:
						if ($login->isUserLoggedIn() != true) {
						   // the user is not logged in. you can do whatever you want here.
						   // for demonstration purposes, we simply show the "you are not logged in" view.
						   include("views/notIn.php");
						}
					?>
				</div>
			</div>
		</div>
		
		<script src="http://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" 
			integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" 
			crossorigin="anonymous"></script>
    </body>
