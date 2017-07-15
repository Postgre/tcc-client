module.exports = class Bindings {

    constructor( authService, appService ){
        this.authService = authService;
        this.appService = appService;
    }

    apply(){
        var self = this;
        var loggedIn = this.authService.isLoggedIn();

        this.appService.registerIf( "#login-register", function () {
            return !loggedIn;
        });
        this.appService.registerIf( "#my-account", function () {
            return loggedIn;
        });
        this.appService.registerIf( ".tcc_if_admin", function(){
            return self.authService.hasRole('admin');
        })
    }
};