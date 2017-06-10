import * as ApplicationSettings from 'src/es/ApplicationSettings';

const TOKEN_PROVIDER = ApplicationSettings.getUrl( "login" );
const REGISTER = ApplicationSettings.getUrl( "register" );

function login( email, password, win, fail ){
    return $.ajax({
        url: TOKEN_PROVIDER,
        method: "POST",
        data: {"email": email, "password": password},
        dataType: "json",
    }).success(function( data ){
            localStorage['api_token']   =   data.token;
            localStorage['user']        =   JSON.stringify(data.user);
            win();
        })
}

function register( firstName, lastName, email, password ){
    return $.ajax({
        url: REGISTER,
        method: "POST",
        data: {
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": password
        }
    });
}

function logout(){
    delete localStorage['api_token'];
    // delete localStorage['user'];
}
function getUser(){
    if( ! localStorage['user'] ) return;
    let json = localStorage['user'];
    return JSON.parse(json);
}
function getToken(){
    return localStorage['api_token'];
}
function hasRole( role ){
    var user = getUser();
    if( !user ) return false;
    if( !user.roles ) return false;

    return ( user.roles.indexOf( role ) !== -1 );
}

export {
    login,
    register,
    logout,
    getUser,
    getToken,
    hasRole
}