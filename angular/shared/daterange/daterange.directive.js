angular.module('plugins')
    .directive('tccDateRange', tccDateRange);

function tccDateRange() {
    var directive = {
        link: link,
        scope: {
            to: "=to",
            from: "=from"
        },
        templateUrl: "angular/shared/daterange/daterange.html"
    };
    return directive;

    function link(scope, element, attr){
        $( element.find('div') ).datepicker({
            autoclose: true
        });
    }
}