angular.module('payments')
    .controller('PaymentsController', PaymentsController);

function PaymentsController($scope) {

    $scope.invoice = {};
    $scope.event = {
        name: "Turn up in Time Square",
        caroler_config: "Quartet",
        start: "8:00pm",
        end: "10:00pm",
        date: "8/18/2017",
        state: "AL",
        city: "Birmingham",
        address: "1617 13th Avenue South"
    };

    function init() {
        let event = modelFactory.get("Booking", getQueryVariable("event"));
        event.subscribe("ready", function () {
            Object.assign(event, event.loadPrettyDates(moment));
            Object.assign($scope.invoice, getDefaultInvoice());
            $scope.totalClass = "balanceDue";
            if ($scope.invoice.total - $scope.invoice.due === 0) $scope.totalClass = "balancePaid";
            let market = modelFactory.get("Market", event.market_id);
            market.subscribe(['async', 'ready'], function () {
                $scope.market = market;
                $scope.event = event;
                $scope.$apply();
            });
        });

        tcc.Braintree.getClientToken(dataService.connection).then(
            (token) => {
                let button = document.querySelector('#submit-button');

                braintree.dropin.create({
                    authorization: token,
                    container: '#dropin-container'
                }, function (createErr, instance) {
                    button.addEventListener('click', function () {
                        instance.requestPaymentMethod(function (err, payload) {
                            // Submit payload.nonce to your server
                            console.log("Payload", payload);
                            tcc.Braintree.submitForCheckout(dataService.connection, payload).then(
                                (res) => console.log("checkout", res),
                                (err) => console.error("error", err)
                            )
                        });
                    });
                });
            },
            (err) => console.error("err", err)
        );

        $("#res").hide();
    }

    $scope.handlePlaceOrder = function handlePlaceOrder() {
        let cardStuff = parseCardForm();
        let addressStuff = $scope.forms.location;
        console.log(cardStuff, addressStuff);
        quickbooks(cardStuff, addressStuff);
    };

    init();

    function getDefaultInvoice() {
        let c = 400;
        let d = 0;
        let t = 120;
        let tot = c + d + t;
        let due = tot / 2;
        let rem = tot - due;
        return {
            carolers: c,
            discounts: d,
            travel: t,
            total: tot,
            due: due,
            remaining: rem
        }
    }
}

function parseCardForm() {
    let exp = document.getElementById("expiry").value.split(" / ");
    return {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        number: document.getElementById("number").value,
        cvc: document.getElementById("cvc").value,
        expMonth: exp[0],
        expYear: exp[1]
    }
}