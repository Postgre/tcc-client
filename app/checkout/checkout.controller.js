angular.module('checkout')
    .controller('CheckoutController', CheckoutController);

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
        name: "Turn up in Time Square",
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