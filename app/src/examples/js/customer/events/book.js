(function(document, window, $) {
    'use strict';

    var Site = window.Site;

    $(document).ready(function($) {
        Site.run();
    });

    // Example Wizard Form
    // -------------------
    (function() {
        // set up formvalidation
        $('#exampleAccountForm').formValidation({
            framework: 'bootstrap',
            fields: {
                username: {
                    validators: {
                        notEmpty: {
                            message: 'The username is required'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                        different: {
                            field: 'username',
                            message: 'The password cannot be the same as username'
                        }
                    }
                }
            },
            err: {
                clazz: 'text-help'
            },
            row: {
                invalid: 'has-danger'
            }
        });

        $("#exampleBillingForm").formValidation({
            framework: 'bootstrap',
            fields: {
                number: {
                    validators: {
                        notEmpty: {
                            message: 'The credit card number is required'
                        }
                        // creditCard: {
                        //   message: 'The credit card number is not valid'
                        // }
                    }
                },
                cvv: {
                    validators: {
                        notEmpty: {
                            message: 'The CVV number is required'
                        }
                        // cvv: {
                        //   creditCardField: 'number',
                        //   message: 'The CVV number is not valid'
                        // }
                    }
                }
            },
            err: {
                clazz: 'text-help'
            },
            row: {
                invalid: 'has-danger'
            }
        });

        // init the wizard
        var defaults = Plugin.getDefaults("wizard");
        var options = $.extend(true, {}, defaults, {
            buttonsAppendTo: '.panel-body'
        });

        var wizard = $("#bookingForm").wizard(options).data('wizard');

        // setup validator
        // http://formvalidation.io/api/#is-valid
        wizard.get("#accountProfile").setValidator(function() {
            var fv = $("#exampleAccountForm").data('formValidation');
            fv.validate();

            if (!fv.isValid()) {
                return false;
            }

            return true;
        });

        wizard.get("#billingInfo").setValidator(function() {
            var fv = $("#exampleBillingForm").data('formValidation');
            fv.validate();

            if (!fv.isValid()) {
                return false;
            }

            return true;
        });
    })();

})(document, window, jQuery);
