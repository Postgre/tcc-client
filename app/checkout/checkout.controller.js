angular.module('checkout')
    .controller('CheckoutController', CheckoutController);

/**
 * REQUIRES:
 * + booking
 * + invoice
 * + mode (full | deposit)
 */
function CheckoutController($scope) {

    $scope.invoice = getDefaultInvoice();
    $scope.dueNow = 230;
    $scope.payments = [
        {
            'date': '9/1/2017',
            'amount': 230
        }
    ];
    $scope.booking = {
        name: "My Demo Event",
        caroler_config: "Quartet",
        start: "8:00pm",
        end: "10:00pm",
        date: "8/18/2017",
        state: "AL",
        city: "Birmingham",
        address: "1617 13th Avenue South"
    };
    $scope.amount = $scope.dueNow;

    function init() {
        /* load event details */
        window.loadMap("#event-location", $scope.booking.address);
        // end

        let handler = StripeCheckout.configure({
            key: 'pk_test_nk8Ijhb3A3DJQHoZB9DRvtm4',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                swal("Here's your Token!", token.id, "success");
            }
        });

        document.getElementById('customButton').addEventListener('click', function(e) {
            // Open Checkout with further options:
            handler.open({
                name: 'The Christmas Carolers',
                description: 'Event Payment',
                amount: $scope.amount * 100
            });
            e.preventDefault();
        });

        // Close Checkout on page navigation:
        window.addEventListener('popstate', function() {
            handler.close();
        });
    }

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
            balance: rem
        }
    }
}