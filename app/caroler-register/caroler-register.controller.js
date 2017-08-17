angular.module("caroler-register")
.controller("CarolerRegisterController", CarolerRegisterController);

function CarolerRegisterController( $scope ){
    let after_login = "index.php";

    $scope.form = {};
    $scope.registerForm = {};
    $scope.markets = [];

    function init(){
        modelFactory.all("Market", {published: true}).then(
            (markets)=>{
                $scope.imagemap = {};
                markets.forEach((market)=>{
                    $scope.markets.push({
                        name: market.name,
                        val: market.id,
                        image: market.image
                    });
                    $scope.imagemap[market.id] = market.image;
                });
                $scope.ready = true;
                $scope.$apply();
                console.log($scope);
            }
        );
        $scope.$watch('form.market', function(){
            $scope.markets.forEach((market)=>{
                if(market.id === $scope.form.market.id){
                    $scope.selectedMarket = market;
                }
            })
        });
    }

    $scope.handleRegister = function handleRegister(registerForm){
        if(!validateRegisterForm(registerForm, $scope.form.market)) return;
        authService.register(registerForm.name, registerForm.email, registerForm.password)
            .then(
                win => {
                    dataService.requestInvite($scope.form.market, registerForm.email).then(
                        () => notifyRegistered(),
                        somethingWentWrong
                    )
                },
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

function validateRegisterForm(registerForm, market) {
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
    if(!market){
        alert("Please select a market");
        return false;
    }
    return true;
}