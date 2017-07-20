angular.module('plugins')
.directive('tccSelectPicker', selectPicker);

function selectPicker(){
    return {
        link: link,
        replace: true,
        scope: {
            bind: "=bind",
            options: "=options" // { val: 1, name: 'One' }
        },
        templateUrl: "angular/shared/select/selectpicker.htm"
    };

    function link(scope, el, attr){
        scope.blank = "-- Select One --";
        setTimeout(function(){
            $(el).selectpicker();
            $(el).selectpicker('val', scope.bind);
            $(el).on('changed.bs.select', function () {
                scope.$apply(function(){
                    scope.bind = $(el).selectpicker('val');
                });
            });
        }, 0);
    }
}