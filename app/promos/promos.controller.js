angular.module("promos")
.controller("PromosController", PromosController);

function PromosController( $scope ){
    $scope.rows = [];

    $scope.form = {};

    $scope.create = function(){
        $scope.form = window.modelFactory.create('PromoCode');
        modal();
    };

    $scope.edit = (row) => {
        $scope.form = row;
        modal();
    };

    $scope.submit = function(){
        if($scope.form.id){
            $scope.form.update()
                .then((res)=>{
                    swal("Saved!", "", "success");
                }).catch(somethingWentWrong);
            return;
        }
        $scope.form.save()
            .then((res)=>{
                swal("Success!", "A new promotion has been created", "success");
                init();
            }).catch(somethingWentWrong);
    };
    $scope.delete = function( row ){
        let doit = ()=>{
            row.active = 0;
            console.log(row.getData(), row);
            row.update().then(()=>{
                swal("Success!", "Promo has been canceled", "success");
                init();
            }).catch(somethingWentWrong);
        };
        swal({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, end it!",
            closeOnConfirm: false
        }, doit);
    };

    function init(){
        window.modelFactory.all("PromoCode", { 'active': true }).then((promo_codes)=>{
            $scope.rows = promo_codes;
            $scope.$apply();
            setTimeout(function(){
                initDataTable();
            }, 2000);
        });
    }
    init();
}

function modal(){
    $("#modal").modal('show');
}

function initDataTable(){
    $("#datatable").dataTable();
}