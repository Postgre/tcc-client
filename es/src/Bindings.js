module.exports = class Bindings {

    constructor( authService, appService ){
        this.authService = authService;
        this.appService = appService;
    }

    apply(){
        let self = this;
        let loggedIn = this.authService.isLoggedIn();

        this.appService.registerIf( "#login-register", function () {
            return !loggedIn;
        });
        this.appService.registerIf( "#my-account", function () {
            return loggedIn;
        });
        this.appService.registerIf( ".tcc_if_admin", function(){
            return self.authService.hasRole('admin');
        });
        this.appService.registerIf( ".tcc_if_caroler", function(){
            return self.authService.hasRole('caroler');
        });
        this.appService.registerIf( ".tcc_if_director", function(){
            return self.authService.hasRole('director');
        });
        this.appService.registerIf( ".tcc_if_login", ()=>{
            return self.authService.isLoggedIn();
        });
        this.appService.registerBind(".tcc_name", function(){
            if(self.authService.isLoggedIn()){
                return self.authService.user.name;
            }
            return "";
        })
    }
};