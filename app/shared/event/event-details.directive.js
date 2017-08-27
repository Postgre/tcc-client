angular.module('shared')
.directive('tccEventDetails', tccEventDetails);

function tccEventDetails(){
    return {
        scope: {
            booking: "=",
            hidden: "="
        },
        templateUrl: "/app/shared/event/event-details.htm",
        controller: function($scope){
            let DATETIME_FORMAT = "YYYY-MM-DD HH:MM";
            let DATE_FORMAT = DATETIME_FORMAT.split(" ")[0];
            let TIME_FORMAT = DATETIME_FORMAT.split(" ")[1];
            $scope.date = moment($scope.booking.start_time).format(DATE_FORMAT);
            $scope.start = moment($scope.booking.start_time).format(TIME_FORMAT);
            $scope.end = moment($scope.booking.end_time).format(TIME_FORMAT);
        }
    };
}