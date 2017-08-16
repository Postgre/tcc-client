angular.module('profile')
    .controller('ProfileController', ProfileController);

function ProfileController($scope) {

    /**
     * Models
     * ===============
     */
    $scope.userProfile = {};
    $scope.carolerProfile = null;
    $scope.customerProfile = null;
    $scope.directorProfile = null;
    $scope.files = {
        w9: false,
        performance_agreement: false
    };
    $scope.caroler_options = [
        {
            val: "soprano",
            name: "soprano"
        },
        {
            val: "alto",
            name: "alto"
        },
        {
            val: "tenor",
            name: "tenor"
        },
        {
            val: "bass",
            name: "bass"
        }
    ];
    $scope.form = {
        part: "alto"
    };

    function init() {
        /* jquery plugin */
        $("#tabs-profile").on("tabsactivate", function (event, ui) {
            $('.flexslider .slide').resize();
        });

        function onReady(){
            $scope.$apply();
        }
        $scope.userProfile = modelFactory.get("MyUserProfile", "");
        $scope.userProfile.subscribe("ready", onReady);
        if(authService.hasRole('caroler')){
            $scope.carolerProfile = modelFactory.get("MyCarolerProfile", "");
            $scope.carolerProfile.loadCarolerTypes();
            $scope.carolerProfile.subscribe(["ready", "async"], onReady);
        }
        if(authService.hasRole('customer')){
            $scope.customerProfile = modelFactory.get("MyCustomerProfile", "");
            $scope.customerProfile.subscribe("ready", onReady);
        }
        if(authService.hasRole('director')){
            $scope.directorProfile = modelFactory.get("MyDirectorProfile", "");
            $scope.directorProfile.subscribe("ready", onReady);
        }
    }

    /**
     * Functions
     * ===============
     */
    $scope.handleUpdateProfile = function handleUpdateProfile() {
        let updates = [];
        if(u = $scope.userProfile) updates.push(u.update());
        if(d = $scope.directorProfile) updates.push(d.update());
        if(ca = $scope.carolerProfile) updates.push(ca.update());
        if(cu = $scope.customerProfile) updates.push(cu.update());
        Promise.all(updates).then(() => swal("Saved!", "Your info has been updated", "success"));
        /* upload files if set */
        console.log($scope.files);
        if(!$scope.carolerProfile.w9 && $scope.files.w9){
            $scope.carolerProfile.uploadW9($scope.files.w9);
        }
        if(!$scope.carolerProfile.performance_agreement && $scope.files.performance_agreement){
            $scope.carolerProfile.uploadPerformanceAgreement($scope.files.performance_agreement);
        }
    };

    $scope.handleAddPart = function handleAddPart(name){
        $scope.carolerProfile.addType(name)
            .then(
                () => { swal("Success!", "We've added your part", "success") },
                (err) => {
                    if(err === 409){
                        swal("Wait A minute!", "You already have that part", "warning");
                        return;
                    }
                    somethingWentWrong(err);
                }
            )
    };
    $scope.handleRemovePart = function handleRemovePart(part){
        $scope.carolerProfile.removeType(part)
            .then(
                () => { swal("Success!", "We've removed your part", "success") },
                somethingWentWrong
            )
    };

    init();
}