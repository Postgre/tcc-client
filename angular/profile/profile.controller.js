angular.module('profile')
.controller('ProfileController', ProfileController);

function ProfileController( $scope ) {
    $scope.profile = {
        user: {},
        director: {},
        customer: {},
        caroler: {}
    };
    init();
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */
    $scope.updateProfile = updateProfile;
    function updateProfile(){
        var putData = {
            user_profile: $scope.profile.user,
            caroler_profile: $scope.caroler_profile
        };
        console.log("req", putData);
        var promise = window.dataService.putProfile(putData);
        promise.then(function(res){
            console.log("res", res);
            notifySuccess();
        });
        promise.catch(function(err){
            console.log("err", err);
        });
    }
    
    /**
     * Init
     * ===============
     */
    function init(){
        var promise = window.dataService.getProfiles();
        promise.then(function(res){
            console.log("res", res);
            $scope.$apply(function(){
                $scope.profile.user = res.data.user_profile;
            });
        });
        promise.catch(function(err){
            console.log("err", err);
        });
    }
}