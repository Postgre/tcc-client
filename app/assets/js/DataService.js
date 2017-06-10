(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/DataService', ['exports', 'src/es/ApplicationSettings', 'AuthService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('src/es/ApplicationSettings'), require('AuthService'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.ApplicationSettings, global.AuthService);
        global.DataService = mod.exports;
    }
})(this, function (exports, _ApplicationSettings, _AuthService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.http = exports.reportError = undefined;
    var ApplicationSettings = babelHelpers.interopRequireWildcard(_ApplicationSettings);
    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);


    var API_BASE_PATH = ApplicationSettings.getUrl('api');

    function http(config) {
        config['url'] = API_BASE_PATH + config['url'];
        config['headers'] = {
            "Authorization": "Bearer " + AuthService.getToken // token here
            () };
        config['statusCode'] = {
            500: reportError
        };
        return $.ajax(config);
    }
    function reportError(err) {
        var report = {};
        if (err.responseJSON) report = err.responseJSON;else if (err.responseText) report = err.responseText;else report = JSON.stringify(err);

        var activity = window.location.href;

        console.log("generating error report", err);
        $.ajax({
            url: API_BASE_PATH + "/reportError",
            type: "POST",
            data: {
                "activity": activity,
                "error": report
            }
        }).complete(function (res) {
            console.log("sent error report", res);
        });
    }

    exports.reportError = reportError;
    exports.http = http;
});
