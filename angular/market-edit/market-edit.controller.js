angular.module('market-edit')
.controller('MarketEditController', MarketEditController);

function MarketEditController( $scope ) {

    $scope.market = {};

    $scope.availOpts = [
        {
            val: 1,
            label: "Yes"
        },
        {
            val: 0,
            label: "No"
        }
    ];
    $scope.carolerConfigOptions = CarolerConfigs.options;

    $scope.editing_special_dates = false;
    $scope.editing_gallery = false;
    $scope.getEditClass = function() {
        if($scope.editing_special_dates) return "col-sm-5";
        return "col-sm-6";
    };

    (function init(){
        let onLoaded = () => {
            $scope.$apply();
        };
        $scope.market = window.modelFactory.find("Market", navService.getNavParams().market_id, onLoaded);
    })();

    /**
     * Functions
     * ===============
     */
    $scope.createSpecialDate        =   function (){
        $scope.market.addSpecialDate();
    };
    $scope.deleteSpecialDate        =   function (specialDate){
        $scope.market.deleteSpecialDate(specialDate);
    };
    $scope.publishMarket            =   function () {
        swal({
            title: "Lets go Live!",
            text: "Once this market is published, it will be discoverable and users can book events. Please review the market settings before publishing!",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok, publish market!",
            closeOnConfirm: false,
            html: false
        }, function(){
            $scope.$apply(function(){
                $scope.market.published = 1;
            });
            var p = $scope.updateMarket(true);
            p.then((msg) => {
                swal("We're Live!",
                    $scope.market.name + " is live and discoverable!",
                    "success");
            });
        });
    };
    $scope.unpublishMarket          =   function () {
        swal({
            title: "Take Down Market?",
            text: "You are about to un-publish this market. This will make it non-discoverable, but not affect existing events.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Un-publish Market!",
            closeOnConfirm: false,
            html: false
        }, function(){
            $scope.$apply(function(){
                $scope.market.published = 0;
            });
            var p = $scope.market.update();
            p.then((res)=>{
                swal("Done.",
                    $scope.market.name + " is no longer discoverable",
                    "success");
            });
        });
    };
    $scope.deleteGalleryImage       =   function (media){
        $scope.market.removeMediaLink(media);
    };
    $scope.addGalleryImage          =   function (){
        // TODO: wrap media links into a /lib class
        $scope.market.addMediaLink({
            url: "http://www.privatetoursinegypt.com/uploads/229/Egyptian-Christmas-Offer..jpg"
        });
    };
    $scope.updateMarket             =   function (promise = false) {
        let p = $scope.market.update();
        p.catch(function(err){
            console.log("err", err);
        });
        if(promise) return p;
        p.then(function(res){
            console.info("res", res);
            swal("Success!",
                "Your changes have been saved",
                "success");
        });
    };
}

const DEFAULT_MODEL = {
    market: {

    }
};