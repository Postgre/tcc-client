angular.module("components")
.directive('tccEventDetails', tccEventDetails);

function tccEventDetails(){
    return {
        scope: {
            booking: "=",
            hidden: "=",
        },
        templateUrl: "/app/shared/components/event/event-details.htm",
        controller: function($scope){
            $scope.fmt = function(date, pattern){
                return moment(date).format(pattern);
            }
        }
    };
}