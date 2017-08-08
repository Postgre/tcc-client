angular.module('plugins')
.directive('tccStateSelect', tccStateSelect);

function tccStateSelect(){
    return {
        link: link,
        scope: {
            bind: "=bind"
        },
        templateUrl: "angular/shared/state-select/state-select.htm"
    };

    function link(scope, element, attr){
        setTimeout(function(){
            var el = element.find('select')[0];
            $(el).selectpicker({
                liveSearch: true,
                size: 4
            });
            $(el).selectpicker('val', scope.bind);
            $(el).on('change', function(){
                scope.$apply(function(){
                    scope.bind = $(el).selectpicker('val');
                });
            })
        }, 1000);
    }
}