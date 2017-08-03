window.logout = function(){
    window.authService.logout();
    window.location.href = "index.html";
};
window.getQueryVariable = function(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
};
window.calcMarketPrice = function( nthHour, rate, hourlyDiscount ){
    if( nthHour === 1 ) return rate;
    let price = window.calcMarketPrice( nthHour-1, rate, hourlyDiscount ) * (1-hourlyDiscount);
    return Math.round(price * 100) / 100;
};
window.sendContact = function(form){
    form.name = form.name || "";
    form.phone = form.phone || "";
    form.email = form.email || "";
    form.subject = form.subject || "";
    form.message = form.message || "";

    let name = form.name.value;
    let phone = form.phone.value;
    let email = form.email.value;
    let subject = form.subject.value;
    let message = form.message.value;

    let p = window.dataService.postContact(name, email, phone, subject, message);
    p.then(()=>{ alert("Email sent! We'll get back to you soon.") });
    p.catch(()=>{ alert("Oops.. Something went wrong") });
};
window.somethingWentWrong = () => {
    sweetAlert("Oops...", "Something went wrong!", "error");
};