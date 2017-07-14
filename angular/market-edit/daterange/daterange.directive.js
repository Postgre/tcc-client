angular.module('market-edit')
    .directive('tccDateRange', tccDateRange);

function tccDateRange() {
    var directive = {
        link: link,
        scope: {
            to: "=to",
            from: "=from"
        },
        templateUrl: "angular/market-edit/daterange/daterange.html"
    };
    return directive;

    function link(scope, element, attr){
        $( element.find('div') ).datepicker({
            autoclose: true
        });
    }
}