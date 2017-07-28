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
        var inputs = element.find('input');
        $(inputs[0]).datepicker('setDate', moment(scope.from).format("MM/DD/YYYY"));
        $(inputs[1]).datepicker('setDate', moment(scope.to).format("MM/DD/YYYY"));

        $(elem).datepicker().on("changeDate", function(){
            var inputs = element.find('input');
            var start = moment($(inputs[0]).datepicker("getDate"));
            var end = moment($(inputs[1]).datepicker("getDate"));
            scope.$apply(function(){
                scope.from = start.format(format);
                scope.to = end.format(format);
            });
        });
    }
}

const format = "YYYY-MM-DD HH:MM:SS";