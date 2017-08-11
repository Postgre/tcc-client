<!DOCTYPE html>
<html lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
</head>
<body class="stretched">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <section id="page-title">

        <div class="container clearfix">
            <h1>My Account</h1>
            <ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li class="active">Login / Register</li>
            </ol>
        </div>

    </section>
    <section id="content">

        <div class="content-wrap">

            <div class="container clearfix">

                <div class="col_one_third nobottommargin">

                    <div class="well well-lg nobottommargin">
                        <form id="login-form" name="login-form" class="nobottommargin" action="#" method="post"
                              onsubmit="return login()">

                            <h3>Login to your Account</h3>

                            <div class="col_full">
                                <label for="login-form-username">Username:</label>
                                <input type="email" required id="login-form-username" name="login-form-username"
                                       value="" class="form-control">
                            </div>

                            <div class="col_full">
                                <label for="login-form-password">Password:</label>
                                <input type="password" required id="login-form-password" name="login-form-password"
                                       value="" class="form-control">
                            </div>

                            <div class="col_full nobottommargin">
                                <button class="button button-3d nomargin" id="login-form-submit"
                                        name="login-form-submit" value="login">Login
                                </button>
                                <a href="#" class="fright">Forgot Password?</a>
                            </div>

                        </form>
                    </div>

                </div>

                <div class="col_two_third col_last nobottommargin">


                    <h3>Don&apos;t have an Account? Register Now.</h3>

                    <p>You can expect superior quality when you hire the Christmas Carolers. We cherry-pick our talented
                        singers from music schools across the country.
                        All our carolers are dressed in professionally-designed and award-winning
                        Victorian-styled costumes that invoke the spirit of the season. Our carolers certainly know how
                        to stand out in a crowd!</p>

                    <form id="register-form" onsubmit="return register()" name="register-form" class="nobottommargin"
                          action="#" method="post">

                        <div class="col_half">
                            <label for="register-form-name">Name:</label>
                            <input required type="text" id="register-form-name" name="register-form-name"
                                   class="form-control">
                        </div>

                        <div class="col_half col_last">
                            <label for="register-form-email">Email Address:</label>
                            <input required type="email" id="register-form-email" name="register-form-email" value=""
                                   class="email form-control">
                        </div>

                        <div class="clear"></div>

                        <div class="col_half">
                            <label for="register-form-password">Choose Password:</label>
                            <input type="password" id="register-form-password" name="register-form-password" value=""
                                   class="form-control">
                        </div>

                        <div class="col_half col_last">
                            <label for="register-form-repassword">Re-enter Password:</label>
                            <input type="password" id="register-form-repassword" name="register-form-repassword"
                                   value="" class="form-control">
                        </div>

                        <div class="clear"></div>

                        <div class="col_full nobottommargin">
                            <button class="button button-3d button-black nomargin" id="register-form-submit"
                                    name="register-form-submit" value="register">Register Now
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </section>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
=========================== -->
<?php require 'partials/javascripts.htm' ?>
<script>
    if(window.getQueryVariable('v')==='v') swal("You're all set!", "Your account has been validated", "success");

    function login() {
        let email = $("#login-form-username").val();
        let password = $("#login-form-password").val();
        let p = authService.login(email, password);
        p.then(function (res) {
            console.log("win", res);
            window.location = "index.php";
        });
        p.catch(function (err) {
            console.log("fail", err.response);
            if (err.response.status === 403) {
                swal("Not so Fast!", "You need to validate your email first.", "warning");
                return;
            }
            if (err.response.status === 401) {
                swal("Invalid Login", "Try Again.", "error");
                return;
            }
            swal({
                title: "Oops..",
                text: "Something went wrong",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'OK :(',
                closeOnConfirm: false
            });
        });
        return false;
    }

    function register() {
        let name = $("#register-form-name").val();
        let email = $("#register-form-email").val();
        let password = $("#register-form-password").val();
        let repassword = $("#register-form-repassword").val();

        if (password !== repassword) {
            swal({
                title: "Oops!",
                text: "Those passwords don't match!",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
            return false;
        }

        let p = authService.register(name, email, password);
        p.then(function (res) {
            console.log("win", res);
            swal({
                title: "Success!",
                text: "You have been registered. Please check your email to validate your account. Welcome to The Christmas Carolers!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            }, function () {
                window.location = "index.html";
            });
        });
        p.catch(function (err) {
            if (err.response.status === 409) {
                swal("Wait a Minute!", "There's already an account with that email", "warning");
                return;
            }
            swal({
                title: "Oops!",
                text: "Something went wrong!",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: 'Ok :(',
                closeOnConfirm: false
            });
        });

        return false;
    }
</script>

</body>
</html>