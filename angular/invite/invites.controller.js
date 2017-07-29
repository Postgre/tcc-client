var app = angular.module('invite', []);
app.controller("InviteController", InviteController);

function InviteController($scope){
    $scope.market = {
        name: "Sample Market"
    };
    $scope.carolerRequests = [
        {
            name: "Chris Rocco",
            email: "chris.rocco7@gmail.com"
        },
        {
            name: "Caleb Falcione",
            email: "caleb.falcionechris.rocco7@gmail.com"
        },{
            name: "Kenyon Ross",
            email: "kenyonross@gmail.com"
        },
        {
            name: "John",
            email: "john@gmail.com"
        }
    ];

    (function init(){
        $scope.market = window.navService.getNavParams().market;
        let p = window.dataService.searchUsers("");
        p.then((res)=>{
            $scope.$apply(function(){
                $scope.carolerRequests = res.data;
            });
            setTimeout(function(){
                bootstrapTable();
            }, 200);
        });
    })();
}