angular.module("resellers")
.controller("ResellersController", ResellersController);

/**
 * BASIC RESOURCE EDITOR
 * ---------------------
 * An easy interface to CRUD operations on resources.
 *
 *  _  RESOURCE =>  class name of the resource model
 *  +  rows     =>  table rows. array of resource models
 *  +  form     =>  references the model in the form
 * [+] create() =>  open new resource in form
 * [+] delete()     ( confirm )
 * [+] edit()   =>  open existing resource in form
 * [+] submit() =>  save || update resource in form
 * [-] init()   =>  loads all resource models into +rows
 */
function ResellersController( $scope ){
    const RESOURCE  =   "Reseller";
    const FILTERS   =   {};
    const HEADERS   =   ['Name', 'Address', 'Code'];
    const onSave = ()=>{

    };
    const onCreate = ()=>{

    };
    const onDelete = ()=>{

    };
    const onUpdate = ()=>{

    };

    function init(){
        $scope.rows = window.modelFactory.all(RESOURCE, FILTERS, ()=>{
            $scope.$apply();
        });
    }

    /*==========================================================*/
    /*==========================================================*/
    /*==========================================================*/


    $scope.rows = [];   // table rows. array of resource models
    $scope.form = {};   // references the model in the form

    /**
     * Creates a new resource model, and opens it in form
     */
    $scope.create = function(){
        $scope.form = window.modelFactory.create(RESOURCE);
        modal();
    };

    /**
     * Opens existing resource model in form
     * @param row   The resource model
     */
    $scope.edit = (row) => {
        $scope.form = row;
        modal();
    };

    /**
     * Deletes a resource.
     * Reloads table.
     * @param row   The resource model
     */
    $scope.delete = function( row ){
        let doit = ()=>{
            row.destroy().then(()=>{
                onDelete();
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

    /**
     * Handles form submit. Will either create() or update() the resource.
     * Reloads table.
     */
    $scope.submit = function(){
        if($scope.form.id){
            $scope.form.update()
                .then(onUpdate).catch(somethingWentWrong);
            return;
        }
        $scope.form.save()
            .then(()=>{
                onSave();
                init();
            }).catch(somethingWentWrong);
    };

    $scope.headers = HEADERS;
    init();
}

function modal(){
    $("#modal").modal('show');
}