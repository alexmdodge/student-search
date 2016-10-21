<?php

/*
 * This view is triggered when the user is not logged in. This is the initial
 * view which is showed where the username and password are entered, and it
 * will also trigger when the user logs out of the application.
 *
 */

?>

        
<div class="container-fluid" style="margin-top: 15vh; padding: 30px; font-family: 'Open Sans', sans-serif;">
    <div class="row">

        <div class="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-4 col-md-4">
            <!-- login form box -->
            <form method="post" action="index.php" name="loginform"
                style="background-color: #ddd; border-radius: 5px; border: 1px solid #bbb; padding: 30px; height: 345px;">

                <h3 style="margin: 0; padding: 0px 0px 25px; text-align: center; font-weight: bold;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Search_font_awesome.svg/1024px-Search_font_awesome.svg.png" alt="Search Icon"
                     style="width: 30px;">
                    Student Search Log In
                </h3>

                <div class="form-group">
                    <label style="font-weight: 400;" for="login_input_username">Username :</label>
                    <input id="login_input_username" class="form-control" type="text" name="user_name" required />        
                </div>

                <div class="form-group">
                    <label style="font-weight: 400;" for="login_input_password">Password :</label>
                    <input id="login_input_password" class="form-control" type="password" name="user_password" autocomplete="off" required />        
                </div>

                <input class="btn btn-primary col-xs-12 col-md-12" type="submit" name="login" value="Log in" 
                    style="padding: 8px; margin: 10px 0px;"/>

                <?php
                    // show potential errors / feedback (from login object)
                    if (isset($login)) {
                        if ($login->errors) {
                            foreach ($login->errors as $error) {
                                echo $error;
                            }
                        }
                        if ($login->messages) {
                            foreach ($login->messages as $message) {
                                echo $message;
                            }
                        }
                    }
                ?>

            </form>
        </div>
    </div>
</div>