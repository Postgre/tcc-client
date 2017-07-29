var app = angular.module('invite', []);
app.controller("InviteController", InviteController);

function InviteController($scope){
    $scope.market = {
        name: "Sample Market"
    };
    $scope.users = [
        {
            name: "Chris Rocco",
            email: "chris.rocco7@gmail.com"
        },
        {
            name: "Caleb Falcione",
            email: "cfalcione@gmail.com"
        }
    ];
    $scope.requests = [
        {
            from: "Chris Rocco",
            email: "chris.rocco7@gmail.com"
        },
        {
            from: "Caleb Falcione",
            email: "caleb.falcionechris.rocco7@gmail.com"
        },{
            from: "Kenyon Ross",
            email: "kenyonross@gmail.com"
        },
        {
            from: "John",
            email: "john@gmail.com"
        }
    ];

    (function init(){
        let p = window.dataService.searchUsers("");
        p.then((res)=>{
            $scope.$apply(function(){
                $scope.users = res.data;
            });
            setTimeout(function(){
                bootstrapTable();
            }, 200);
        });
    })();
}