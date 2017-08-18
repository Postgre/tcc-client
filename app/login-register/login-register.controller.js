angular.module("login-register")
.controller("AuthController", AuthController);

function AuthController( $scope ){
    let after_login = "index.php";

    $scope.loginForm = {};
    $scope.registerForm = {};

    function init(){
        let action = getQueryVariable("action");
        if(action){
            switch (action){
                case "verified":
                    swal("You're all set!", "Your account has been validated", "success"); break;
                case "redeem":
                    let code = getQueryVariable("invite_code");
                    after_login = `invite-redeem.php?code=${code}`;
                    if(authService.isLoggedIn()) window.location = after_login;
                    swal("Login or Create Account", "To redeem your invite, please login. You will be redirected. If you don't have an account yet, please create one, then click the invite link in your email again", "info");
                    break;
                case "redeemDirector":
                    let codeDirector = getQueryVariable("invite_code");
                    after_login = `invite-redeem.php?code=${codeDirector}&role=d`;
                    if(authService.isLoggedIn()) window.location = after_login;
                    swal("Login or Create Account", "To redeem your invite, please login. You will be redirected. If you don't have an account yet, please create one, then click the invite link in your email again", "info");
                    break;
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
        authService.register(registerForm.name, registerForm.email, registerForm.password)
            .then(
                win => notifyRegistered(),
                fail => {
                    switch(fail){
                        case 409: notifyAlreadyRegistered(); break;
                        default: somethingWentWrong();
                    }
                }
            );
    };

    init();
}

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
        alert("Passwords do not match");
        return false;
    }
    if(!emailCheck){
        alert("Invalid email");
        return false;
    }
    return true;
}
function validateLoginForm(loginForm){
    let emailCheck = EMAIL_REG.test(loginForm.email);
    let passCheck = /.{3,}/.test(loginForm.password);
    if(!emailCheck){
        alert("Invalid Email"); return;
    }
    if(!passCheck){
        alert("Invalid Password. Too Short."); return;
    }
    return true;
}