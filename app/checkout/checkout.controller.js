angular.module('checkout')
    .controller('CheckoutController', CheckoutController);

/**
 * REQUIRES:
 * + booking
 * + invoice
 * + mode (full | deposit)
 */
function CheckoutController($scope, dataService) {

    $scope.invoice = {};
    $scope.event = {};
    $scope.amount = 0;

    function init() {
        /* load event details */
        dataService.connection({
            url: "checkout",
            method: "GET",
            params: {
                invoice_id: getQueryVariable("invoice")
            }
        }).then((res)=>{
            $scope.invoice = res.data.invoice;
            if($scope.invoice.balance === 0){
                swal("Success!", "your event has been paid in full", "success");
            }

            let mode = getQueryVariable("mode");
            if(mode === 'full') $scope.dueNow = $scope.invoice.maximum_payment;
            if(mode === 'half') $scope.dueNow = $scope.invoice.minimum_payment;
            $scope.amount = $scope.dueNow;
            $scope.event = res.data.event;
            $scope.ready = true;
            $scope.$apply();
        }, somethingWentWrong);
        // end

        let handler = StripeCheckout.configure({
            key: 'pk_live_WWYrAcrdyEOwjVTONMdalKsX',
            image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
            locale: 'auto',
            token: function(token) {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                dataService.submitPayment($scope.invoice.id, token.id, $scope.amount).then(
                    (res)=>{
                        swal("Success!", "Payment submitted successfully", "success");
                        init();
                    },
                    (err)=>{
                        swal("Oops..", "Transaction could not be completed", "error");
                    }
                );
            }
        });

        document.getElementById('customButton').addEventListener('click', function(e) {
            // Open Checkout with further options:
            handler.open({
                name: 'The Christmas Carolers',
                description: 'Event Payment',
                amount: $scope.amount
            });
            e.preventDefault();
        });

        // Close Checkout on page navigation:
        window.addEventListener('popstate', function() {
            handler.close();
        });
    }

    init();

    $scope.fmtDate = fmtDate;

    function fmtDate(date){
        return moment(date).format("MM/DD/YYYY");
    }
}