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
        var elem = element.find('div')[0];
        $(elem).datepicker({
            format: 'mm/dd/yyyy',
            autoclose: true
        });
        $(elem).datepicker().on("changeDate", function(){
            var inputs = element.find('input');
            var start = moment($(inputs[0]).datepicker("getDate"));
            var end = moment($(inputs[1]).datepicker("getDate"));
            scope.from = start.format("MM-DD-YYYY");
            scope.to = end.format("MM-DD-YYYY");
        });
    }
}