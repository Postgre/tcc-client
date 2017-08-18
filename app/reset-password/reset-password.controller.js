angular.module("reset-password")
.controller("ResetController", ResetController);

function ResetController( $scope ){
    let after_reset = "/login-register.php";

    $scope.resetForm = {
        password: "",
        passwordConfirm: ""
    };

    function init(){
        $scope.token = getQueryVariable("reset_token");
        $scope.email = getQueryVariable("email");
    }

    $scope.handleForm = function handleForm(resetForm){
        let p = resetForm.password;
        let p2 = resetForm.passwordConfirm;
        if(p !== p2){
            swal("Oops.", "Those passwords don't match", "warning");
            return;
        }
        dataService.resetPassword($scope.email, p, $scope.token)
            .then(
                (win) => { swal("Success!", "Your password has been reset", "success") },
                somethingWentWrong
            )
    };

    init();
}