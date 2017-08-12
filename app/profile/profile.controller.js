angular.module('profile')
    .controller('ProfileController', ProfileController);

function ProfileController($scope) {
    /**
     * Models
     * ===============
     */
    $scope.user = {};

    function init() {
        let id = window.getQueryVariable('id');
        // modelFactory.find("User", id)
        //     .then(
        //         (user) => {
        //             Promise.all(
        //                 user.loadCarolerProfile(),
        //                 user.loadDirectorProfile(),
        //                 user.loadCustomerProfile()
        //             ).then(() => {
        //                 $scope.user = user;
        //                 $scope.$apply()
        //             });
        //         },
        //         somethingWentWrong
        //     );

        /* TODO: soon.. */
        let user = modelFactory.find("User", id);
        $scope.user.subscribe("resolve", (data) => {
            alert("Resolved! " + user.name);
        });
        user.loadCustomerProfile();
    }

    /**
     * Functions
     * ===============
     */
    $scope.updateProfile = updateProfile;

    function updateProfile() {
        let putData = {
            user_profile: $scope.profile.user,
            caroler_profile: $scope.caroler_profile
        };
        console.log("req", putData);
        let promise = window.dataService.putProfile(putData);
        promise.then(function (res) {
            console.log("res", res);
            notifySuccess();
        });
        promise.catch(function (err) {
            console.log("err", err);
        });
    }

    init();
}
