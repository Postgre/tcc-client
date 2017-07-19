window.logout = function(){
    window.authService.logout();
    window.location.href = "index.html";
};
window.getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
};
window.calcMarketPrice = function( nthHour, rate, hourlyDiscount ){
    if( nthHour === 1 ) return rate;
    var price = window.calcMarketPrice( nthHour-1, rate, hourlyDiscount ) * (1-hourlyDiscount);
    return Math.round(price * 100) / 100;
};