(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/RenderSession', ['ApplicationService', 'AuthService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('ApplicationService'), require('AuthService'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.ApplicationService, global.AuthService);
        global.RenderSession = mod.exports;
    }
})(this, function (_ApplicationService, _AuthService) {
    'use strict';

    var ApplicationService = babelHelpers.interopRequireWildcard(_ApplicationService);
    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);


    ApplicationService.registerIf(".tccIfCustomer", function () {
        return AuthService.hasRole("customer");
    });
    ApplicationService.registerIf(".tccIfDirector", function () {
        return AuthService.hasRole("director");
    });
    ApplicationService.registerIf(".tccIfCaroler", function () {
        return AuthService.hasRole("caroler");
    });

    ApplicationService.registerBind(".tccBindEmail", function () {
        return AuthService.getUser().email;
    });
    ApplicationService.registerBind(".tccBindFirstName", function () {
        return AuthService.getUser().first_name;
    });
    ApplicationService.registerBind(".tccBindLastName", function () {
        return AuthService.getUser().last_name;
    });
});
