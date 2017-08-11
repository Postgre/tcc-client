window.getQueryVariable = function(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
};
window.calcMarketPrice = function( nthHour, rate, hourlyDiscount ){
    if( nthHour === 1 ) return rate;
    let price = window.calcMarketPrice( nthHour-1, rate, hourlyDiscount ) * (1-hourlyDiscount);
    return Math.round(price * 100) / 100;
};
window.sendContact = function(form){
    let name = form.name.value;
    let phone = form.phone.value;
    let email = form.email.value;
    let subject = form.subject.value;
    let message = form.message.value;

    if(!email.match(/.+@.+\..{2,}/)){
        alert("invalid email");
        return false;
    }
    if(!subject || !message || !name){
        alert("please complete form");
        return false;
    }

    window.dataService.postContact(name, email, phone, subject, message)
        .then(()=>{
            swal("Email sent!", "We'll get back to you soon", "success")
        }).catch(somethingWentWrong);

    return false;
};
window.somethingWentWrong = () => {
    sweetAlert("Oops...", "Something went wrong!", "error");
};
window.formatAddress = function(address, city, state){
    return `${address}, ${city}, ${state}`;
};
window.subscribeToMailingList = function(form){
    this.dataService.subscribe(form.email.value).then(()=>{
        swal("Done!", "You have been subscribed to our mailing list", "success");
    }).catch(()=>{
        swal("Coming Soon!", "Pardon our progress.", "warning")
    });
    return false;
};
