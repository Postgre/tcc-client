/*!
 * the-christmas-carolers_client (http://thechristmascarolers.com)
 * Copyright 2017 Chris Rocco
 * Licensed under the Themeforest Standard Licenses
 */
$(document).ready(function($) {
    MySite.run();

    setTimeout(function(){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        toastr["warning"]("You are viewing as a " + localStorage.role);
    }, 1000);
});