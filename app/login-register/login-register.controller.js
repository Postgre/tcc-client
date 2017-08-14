angular.module("login-register")
.controller("AuthController", AuthController);

function AuthController( $scope ){
    $scope.loginForm = {};
    $scope.registerForm = {};

    function init(){
        if(window.getQueryVariable('v')==='v') swal("You're all set!", "Your account has been validated", "success");

    }

    $scope.handleLogin = function handleLogin(loginForm){
        if(!validateLoginForm(loginForm)) return;
        authService.login(loginForm.email, loginForm.password)
            .then(
                win => window.location = "index.php",
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
    }
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

function validateRegisterForm(registerForm) {
    let passCheck = (registerForm.password === registerForm.passwordConfirm);
    let emailCheck = (/(.+)@(.+){2,}\.(.+){2,}/.test(registerForm.email));

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
    return true;
}