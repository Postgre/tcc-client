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
        $scope.loadPerfAgreement = loadPerfAgreement;

        //=================================================

        function loadW9(caroler){
            $scope.modalTitle = `${caroler.name}'s W9 Document`;
            window.dataService.connection({
                url: `users/${caroler.id}/w9`,
                method: "GET",
                responseType: 'arraybuffer'
            }).then((response) => {
                let blob = new Blob([response.data], { type: response.headers['content-type'] } );
                let url = window.URL.createObjectURL(blob);

                $('#frame').attr('src',url);
                $("#modal").modal("show");
                $scope.doc_error = false;
                $scope.$apply();
            }).catch((err)=>{
                $scope.doc_error = true;
                $("#modal").modal("show");
                $scope.$apply();
            });
        }

        function loadPerfAgreement(caroler){
            $scope.modalTitle = `${caroler.name}'s Performance Agreement`;
            window.dataService.connection({
                url: `users/${caroler.id}/performance-agreement`,
                method: "GET",
                responseType: 'arraybuffer'
            }).then((response) => {
                let blob = new Blob([response.data], { type: response.headers['content-type'] } );
                let url = window.URL.createObjectURL(blob);

                $('#frame').attr('src',url);
                $("#modal").modal("show");
                $scope.doc_error = false;
                $scope.$apply();
            }).catch((err)=>{
                $scope.doc_error = true;
                $("#modal").modal("show");
                $scope.$apply();
            });
        }

        init();

        function initDataTable(){
            $("#datatable").dataTable();
        }
    });