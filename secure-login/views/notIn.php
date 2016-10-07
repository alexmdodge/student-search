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

<!-- login form box -->
<form method="post" action="index.php" name="loginform"
    style="background-color: #ddd; border-radius: 5px; border: 1px solid #bbb; padding: 30px; height: 250px;">

    <div class="form-group">
        <label for="login_input_username">Username</label>
        <input id="login_input_username" class="form-control" type="text" name="user_name" required />        
    </div>

    <div class="form-group">
        <label for="login_input_password">Password</label>
        <input id="login_input_password" class="form-control" type="password" name="user_password" autocomplete="off" required />        
    </div>

    <input class="btn btn-primary col-xs-12 col-md-12" type="submit" name="login" value="Log in" />

</form>