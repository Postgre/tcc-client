angular.module('payments')
    .controller('PaymentsController', PaymentsController);

function PaymentsController($scope) {

    function init() {
        $("#tokenize_form").submit(function() {
            intuit.ipp.payments.tokenize(
                tccIntuit.getClientId(), {
                    card: {
                        number: $("#tokenize_cc-number").val(),
                        expMonth: $("#tokenize_cc-expmonth").val(),
                        expYear: $("#tokenize_cc-expyear").val(),
                        cvc: $("#tokenize_cc-cvc").val(),
                        address: {
                            streetAddress: $("#tokenize_cc-address-street").val(),
                            city: $("#tokenize_cc-address-city").val(),
                            region: $("#tokenize_cc-address-region").val(),
                            country: $("#tokenize_cc-address-country").val(),
                            postalCode: $("#tokenize_cc-address-postalcode").val()
                        }
                    }
                },
                function(token, response) {
                    if (token !== null) {
                        $("#tokenize_data").html("Tokenized card value is " + token);
                    } else {
                        $("#tokenize_data").html("Error during tokenization " + response.code + "<br/>" + response.message + "<br/>" + response.detail + "<br/>" + response.moreinfo);
                    }
                });
            return false;
        });
    }

    init();
}