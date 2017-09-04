angular.module("login-register")
.controller("AuthController", AuthController);

function AuthController( $scope ){
    let after_login = "index.php";

    $scope.loginForm = {};
    $scope.registerForm = {};
    $scope.resendForm = {};

    function init(){
        let action = getQueryVariable("action");
        if(action){
            switch (action){
                case "verify":
                    dataService.verifyEmail(getQueryVariable("code"))
                        .then(
                            (win) => { swal("Verified!", "Your email has been verified. You may now login.", "success"); },
                            (err) => {
                                if(!err.response){ somethingWentWrong(); return }
                                if(err.response.data.status === "INVALID_CONFIRMATION_CODE"){
                                    swal("Hmm..", "That code is no good. Have you already redeemed it?", "warning"); return;
                                }
                                alert(err.reponse.data.status);
                            }
                        );
                    break;
                case "redeem":
                    let code = getQueryVariable("invite_code");
                    let market = getQueryVariable("market");
                    after_login = `invite-redeem.php?code=${code}&role=director&market=${market}`;
                    if(authService.isLoggedIn()){
                        window.location = after_login;
                        return;
                    }
                    swal("Login or Create Account", "To redeem your invite, please login. You will be redirected. If you don't have an account yet, please create one, then click the invite link in your email again", "info");
                    break;
                case "approved":
                    after_login = 'profile.php?action=approved';
                    swal("You've been approved!", "Please login to get started!", "success"); break;
                default:
                    alert("unknown action");
            }
        }
    }

    $scope.handleLogin = function handleLogin(loginForm){
        if(!validateLoginForm(loginForm)) return;
        authService.login(loginForm.email, loginForm.password)
            .then(
                () => {
                    if(after_login){
                        window.location = after_login;
                    }
                },
                fail => {
                    switch(fail){
                        case 401: notifyInvalid(); break;
                        case 403: notifyNeedValidate(); break;
                        default: somethingWentWrong();
                    }
                }
            );
    };
    $scope.handleRegister = function handleRegister(registerForm){
        if(!validateRegisterForm(registerForm)) return;
        $scope.ajaxRegister = true;
        authService.register(registerForm.name, registerForm.email, registerForm.password)
            .then(
                win => {
                    notifyRegistered();
                    $scope.afterSent = true;
                    $scope.ajaxRegister = false;
                    $scope.$apply();
                },
                fail => {
                    $scope.ajaxRegister = false;
                    $scope.$apply();
                    switch(fail){
                        case 409: notifyAlreadyRegistered(); break;
                        default:
                            console.log(fail);
                            somethingWentWrong();
                    }
                }
            );
    };
    $scope.handleRecover = function handleRecover(resetForm){
        dataService.recoverPassword(resetForm.email)
            .then(
                (win) => {
                    swal("Done!", "We've sent a recovery link to your inbox", "success")
                },
                (fail) => {
                    swal("Hmm..", "We don't have that email in our database", "error");
                }
            );
    };
    $scope.handleResend = function handleResend(email){
        $scope.ajaxResend = true;
        authService.resend(email)
            .then(
                (win) => {
                    swal("Done!", "We've sent a recovery link to your inbox", "success");
                    $scope.ajaxResend = false;
                    $scope.$apply();
                },
                (fail) => {
                    swal("Hmm..", "We don't have that email in our database", "error");
                    $scope.ajaxResend = false;
                    $scope.$apply();
                }
            );
    };

    init();


    function notifyNeedValidate(){
        swal("Not so Fast!", "You need to validate your email first.", "warning");
    }
    function notifyInvalid(){
        swal("Invalid Login", "Try Again.", "error");
    }
    function notifyRegistered(){
        swal("Success!", "You have been registered. Please check your email to validate your account. Welcome to The Christmas Carolers!", "success");
    }
    function notifyAlreadyRegistered(){
        swal("Wait a Minute!", "There's already an account with that email", "warning");
    }

    let EMAIL_REG = /(.+)@(.+){2,}\.(.+){2,}/;
    function validateRegisterForm(registerForm) {
        let passCheck = (registerForm.password === registerForm.passwordConfirm);
        let emailCheck = (EMAIL_REG.test(registerForm.email));

        if(!passCheck){
            swal("Passwords do not match");
            return false;
        }
        if(!emailCheck){
            swal("Invalid email");
            return false;
        }
        return true;
    }
    function validateLoginForm(loginForm){
        let emailCheck = EMAIL_REG.test(loginForm.email);
        let passCheck = /.{3,}/.test(loginForm.password);
        if(!emailCheck){
            swal("Invalid Email"); return;
        }
        if(!passCheck){
            swal("Invalid Password. Too Short."); return;
        }
        return true;
    }
}