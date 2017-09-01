angular.module("caroler-list")
    .controller("CarolerListController", function ($scope) {

        $scope.carolers = [];

        function init() {
            dataService.getResourceAll("users", {
                role: "caroler",
                carolerProfile: true
            }).then((carolers)=>{
                $scope.carolers = carolers;
                $scope.$apply();
                setTimeout(initDataTable, 2000);
            }).catch((err)=>{
                console.log(err);
            });
        }

        $scope.loadW9 = loadW9;

        //=================================================

        function loadW9(caroler){
            window.dataService.connection({
                url: `users/${caroler.id}/w9`,
                method: "GET",
                responseType: 'arraybuffer'
            }).then((response) => {
                let blob = new Blob([response.data], { type: response.headers['content-type'] } );
                let url = window.URL.createObjectURL(blob);

                $('#frame').attr('src',url);
                $("#modal").modal("show");

                // window.open(url); // Mostly the same, I was just experimenting with different approaches, tried link.click, iframe and other solutions
            });
        }

        init();

        function initDataTable(){
            $("#datatable").dataTable();
        }
    });