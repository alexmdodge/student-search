<?php

/**
 * @author Alex Dodge
 * @license http://opensource.org/licenses/MIT MIT License
 */

// checking for minimum PHP version
if (version_compare(PHP_VERSION, '5.3.7', '<')) {
    exit("This application does not run on versions of php less than 5.3.7.");
} else if (version_compare(PHP_VERSION, '5.5.0', '<')) {
    // if you are using PHP 5.3 or PHP 5.4 you have to include the password_api_compatibility_library.php
    // (this library adds the PHP 5.5 password hashing functions to older versions of PHP)
    require_once("libraries/password_compatibility_library.php");
}

// include the configs / constants for the database connection
require_once("db.php");
require_once("Registration.php");
$registration = new Registration();

// This will report any errors in the database input process
if (isset($registration)) {
    if ($registration->errors) {
        foreach ($registration->errors as $error) {
            echo $error;
        }
    }
    if ($registration->messages) {
        foreach ($registration->messages as $message) {
            echo $message;
        }
    }
}

?>

<html>
    <head>

        <title> User Name Registration </title>
        <meta description="The registration page separate from the users">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    </head>

    <body>
        <h1 class="" style="text-align: center; padding: 60px 0px 0px">User Registration</h1>
		
		<div class="container-fluid">
			<div class="row">

				<!-- register form -->
				<form method="post" action="register.php" name="registerform">

				    <!-- the user name input field uses a HTML5 pattern check -->
				    <label for="login_input_username">Username (only letters and numbers, 2 to 64 characters)</label>
				    <input id="login_input_username" class="login_input" type="text" pattern="[a-zA-Z0-9]{2,64}" name="user_name" required />

				    <!-- the email input field uses a HTML5 email type check -->
				    <label for="login_input_email">User's email</label>
				    <input id="login_input_email" class="login_input" type="email" name="user_email" required />

				    <label for="login_input_password_new">Password (min. 6 characters)</label>
				    <input id="login_input_password_new" class="login_input" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" />

				    <label for="login_input_password_repeat">Repeat password</label>
				    <input id="login_input_password_repeat" class="login_input" type="password" name="user_password_repeat" pattern=".{6,}" required autocomplete="off" />
				    <input type="submit"  name="register" value="Register" />

				</form>

				<small>
					Note: This registration page is for admin access only. If anyone has access to this
					page they can create any number of logins which can be given away.
				</small>

			</div>
		</div>
		
		<script src="http://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" 
			integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" 
			crossorigin="anonymous"></script>
    </body>
</html>
