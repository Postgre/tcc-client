

module.exports = class ApplicationService {
    constructor( appService ) {
        // appService.registerIf( ".tccIfCustomer", function(){
        //     return authService.hasRole( "customer" );
        // });
        // appService.registerIf( ".tccIfDirector", function(){
        //     return authService.hasRole( "director" );
        // });
        // appService.registerIf( ".tccIfCaroler", function(){
        //     return authService.hasRole( "caroler" );
        // });
        //
        // appService.registerBind( ".tccBindEmail", function(){
        //     return authService.getUser().email;
        // });
        // appService.registerBind( ".tccBindFirstName", function(){
        //     return authService.getUser().first_name;
        // });
        // appService.registerBind( ".tccBindLastName", function(){
        //     return authService.getUser().last_name;
        // });

        appService.registerBind( ".tccExample", function(){
            return "Success!";
        });

        this.appService = appService;
    }

    render(){
        this.appService.renderSession();
    }
};