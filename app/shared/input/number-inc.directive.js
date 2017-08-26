angular.module("shared")
.directive("tccNumberInc", function(){
    return {
        scope: {
            bind: "=",
            min: "=",
            max: "=",
            change: "="
        },
        controller: function($scope){
            $scope.inc = function inc(){
                if($scope.bind < $scope.max){
                    $scope.bind++;
                    if($scope.change) $scope.change($scope.bind);
                }
            };
            $scope.dec = function dec(){
                if($scope.bind > $scope.min){
                    $scope.bind--;
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