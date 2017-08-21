angular.module("caroler-register")
.controller("CarolerRegisterController", CarolerRegisterController);

function CarolerRegisterController( $scope ){
    let after_login = "index.php";

    $scope.form = {};
    $scope.registerForm = {};
    $scope.markets = [];

    function init(){
        $scope.loggedin = authService.isLoggedIn();
        if(action = getQueryVariable("action")){
            switch (action){
                case "invited": swal("You've been Invited!", "Welcome to The Christmas Carolers", ""); break;
            }
        }
        modelFactory.all("Market", {published: 1}).then(
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
            });
        });
    }

    $scope.handleRegister = function handleRegister(registerForm){
        if(!validateRegisterForm(registerForm, $scope.form.market)) return;
        authService.register(registerForm.name, registerForm.email, registerForm.password)
            .then(
                () => {
                    dataService.sendCarolerRequest($scope.form.market, registerForm.email).then(
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

    $scope.handleApply = function(){
        if(!$scope.form.market){
            alert("please select a market"); return;
        }
        dataService.sendCarolerRequest($scope.form.market, authService.user.email).then(
            () => notifyApplied(),
            somethingWentWrong
        )
    };
    init();

    let EMAIL_REG = /(.+)@(.+){2,}\.(.+){2,}/;
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
    function notifyNeedValidate(){
        swal("Not so Fast!", "You need to validate your email first.", "warning");
    }
    function notifyInvalid(){
        swal("Invalid Login", "Try Again.", "error");
    }
    function notifyRegistered(){
        swal("Success!", "You have been registered. Please check your email to validate your account. Welcome to The Christmas Carolers!", "success");
    }
    function notifyApplied(){
        swal("Request Sent!", "We'll notify you as soon as the market responds", "success")
    }
    function notifyAlreadyRegistered(){
        swal({
            title: "Wait a Minute!",
            text: "There's already an account with that email. Do you need to <a href='login-register.php'>Login</a>?",
            type: "warning",
            html: true
        });
    }
}