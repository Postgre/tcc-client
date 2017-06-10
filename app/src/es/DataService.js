import * as ApplicationSettings from 'src/es/ApplicationSettings';
import * as AuthService from 'AuthService';

var API_BASE_PATH = ApplicationSettings.getUrl('api');

function http( config ){
    config['url'] = API_BASE_PATH + config['url'];
    config['headers'] = {
        "Authorization": "Bearer " + AuthService.getToken() // token here
    };
    config['statusCode'] = {
        500: reportError
    };
    return $.ajax(config);
}
function reportError( err ){
    var report = {};
    if( err.responseJSON ) report = err.responseJSON;
    else if ( err.responseText ) report = err.responseText;
    else report = JSON.stringify( err );

    var activity = window.location.href;

    console.log( "generating error report", err );
    $.ajax({
        url: API_BASE_PATH + "/reportError",
        type: "POST",
        data: {
            "activity": activity,
            "error": report
        }
    }).complete( function( res ){
        console.log( "sent error report", res )
    });
}

export {
    reportError,
    http
}