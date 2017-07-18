angular.module('profile')
.controller('ProfileController', ProfileController);

function ProfileController( $scope ) {
    $scope.profile = {
        user: {},
        director: {},
        customer: {}
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
        var promise = window.dataService.putProfile({
            user_profile: $scope.profile.user
        });
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

const DEFAULT_MODEL = {
    profile: {
        first_name: "Chris",
        last_name: "Rocco",
        email: "chris.rocco7@gmail.com",
        phone: "205 639 6666",
        state: "AL",
        city: "Birmingham",
        address: "1613 13th Avenue S.",
        image: "https://avatars0.githubusercontent.com/u/22692124?v=3&s=460",
        bio: "Hello! I’m Chris Rocco. Software Engineer at UAB and CEO of Vector Web Development. Specialist in PHP web applications and a disciple of patterns and policies."
    }
};