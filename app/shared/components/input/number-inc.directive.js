angular.module("components")
.directive("tccNumberInc", function(){
    return {
        scope: {
            bind: "=",
            min: "=?",
            max: "=?",
            change: "=?",
            step: "=?"
        },
        controller: function($scope){
            if(!$scope.step) $scope.step = 1;

            $scope.inc = function inc(){
                if($scope.bind + $scope.step <= $scope.max){
                    $scope.bind += $scope.step;
                    if($scope.change) $scope.change($scope.bind);
                }
            };
            $scope.dec = function dec(){
                if($scope.bind - $scope.step >= $scope.min){
                    $scope.bind -= $scope.step;
                    if($scope.change) $scope.change($scope.bind);
                }
            };
        },
        template: `<div class="input-group">
                      <span class="input-group-btn">
                          <button ng-click="dec()" ng-disabled="bind === min" type="button" class="btn btn-danger btn-number">
                              <span class="glyphicon glyphicon-minus"></span>
                          </button>
                      </span>
                        <input ng-model="bind" class="form-control input-number">
                        <span class="input-group-btn">
                          <button ng-click="inc()" ng-disabled="bind === max" type="button" class="btn btn-danger btn-number">
                              <span class="glyphicon glyphicon-plus"></span>
                          </button>
                      </span>
                    </div>`
    }
});