angular.module('profile')
.controller('ProfileController', ProfileController);

function ProfileController( $scope ) {
    $scope.profile = DEFAULT_MODEL.profile;
    init();
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */

    /**
     * Init
     * ===============
     */
    function init(){
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
        pic: "https://avatars0.githubusercontent.com/u/22692124?v=3&s=460",
        bio: "Hello! I’m Chris Rocco. Software Engineer at UAB and CEO of Vector Web Development. Specialist in PHP web applications and a disciple of patterns and policies."
    },
    billing: {
        number: 123456789101112,
        expiration: 709,
        cvs: 123
    }
};