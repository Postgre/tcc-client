import * as ApplicationService from 'ApplicationService';
import * as AuthService from 'AuthService';

ApplicationService.registerIf( ".tccIfCustomer", function(){
    return AuthService.hasRole( "customer" );
});
ApplicationService.registerIf( ".tccIfDirector", function(){
    return AuthService.hasRole( "director" );
});
ApplicationService.registerIf( ".tccIfCaroler", function(){
    return AuthService.hasRole( "caroler" );
});

ApplicationService.registerBind( ".tccBindEmail", function(){
    return AuthService.getUser().email;
});
ApplicationService.registerBind( ".tccBindFirstName", function(){
    return AuthService.getUser().first_name;
});
ApplicationService.registerBind( ".tccBindLastName", function(){
    return AuthService.getUser().last_name;
});