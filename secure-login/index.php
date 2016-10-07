<?php

/**
 * A simple login user authenication script for my sample project Student Search. 
 * This project is based on the work provided in PHP-Login-Minimal by Panique.
 *
 * Uses PHP SESSIONS, modern password-hashing and salting and gives the basic functions a proper 
 * login system needs.
 *
 * @author Alex Dodge
 * @link 
 * @license http://opensource.org/licenses/MIT MIT License
 */

// Checking for minimum PHP version
if (version_compare(PHP_VERSION, '5.3.7', '<')) {
    exit("Sorry, Simple PHP Login does not run on a PHP version smaller than 5.3.7 !");
} else if (version_compare(PHP_VERSION, '5.5.0', '<')) {
    // If you are using PHP 5.3 or PHP 5.4 you have to include the password_api_compatibility_library.php
    // (this library adds the PHP 5.5 password hashing functions to older versions of PHP)
    require_once("libraries/password_compatibility_library.php");
}

// Safely include the necessary files and ensure they are not repeated
// Ensure that the db config is setup properly and MySQLi is enabled
require_once("db.php");

// Only the login file is required, as the username is standard and already in the database
require_once("Login.php");

// Create a new login object which will generate the login screen and accept user input
$login = new Login();

// If logged in, show application
if ($login->isUserLoggedIn() == true) {
    // Here we re-direct to the application once the login is successful.
    include("app/index.php");

} else {
    // the user is not logged in. you can do whatever you want here.
    // for demonstration purposes, we simply show the "you are not logged in" view.
    include("views/not_logged_in.php");
}
