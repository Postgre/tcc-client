angular.module('market-edit')
.controller('MarketEditController', MarketEditController);

function MarketEditController( $scope ) {

    $scope.market = {};
    $scope.availOpts = SpDate.availabilityOptions();

    $scope.editing_special_dates = false;
    $scope.editing_gallery = false;
    $scope.getEditClass = function() {
        if($scope.editing_special_dates) return "col-sm-5";
        return "col-sm-6";
    };

    /**
     * Functions
     * ===============
     */
    $scope.deleteSpecialDate = deleteSpecialDate;
    $scope.createSpecialDate = createSpecialDate;
    $scope.publishMarket = publishMarket;
    $scope.unpublishMarket = unpublishMarket;
    $scope.deleteGalleryImage = deleteGalleryImage;
    $scope.addGalleryImage = addGalleryImage;
    $scope.updateMarket = updateMarket;
    $scope.getPrice = getPrice;

    function createSpecialDate(){
        $scope.market.addSpecialDate(window.modelFactory.make("SpDate"));
    }
    function deleteSpecialDate(specialDate){
        $scope.market.deleteSpecialDate(specialDate);
    }
    function publishMarket() {
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
    }
    function unpublishMarket() {
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
            var p = $scope.market.save();
            p.then((res)=>{
                swal("Done.",
                    $scope.market.name + " is no longer discoverable",
                    "success");
            });
        });
    }
    function deleteGalleryImage(media){
        $scope.market.removeMediaLink(media);
    }
    function addGalleryImage(){
        $scope.market.addMediaLink({
            url: "http://www.privatetoursinegypt.com/uploads/229/Egyptian-Christmas-Offer..jpg"
        });
    }
    function updateMarket(promise = false) {
        let p = window.modelFactory.update($scope.market)[0];
        p.catch(function(err){
            console.error("err", err);
        });
        if(promise) return p;
        p.then(function(res){
            console.info("res", res);
            swal("Success!",
                "Your changes have been saved",
                "success");
        });
    }
    function getPrice( nthHour ){
        var rate = $scope.market.rate_caroler_base;
        var discnt = $scope.market.rate_caroler_discount;
        if( nthHour === 1 ) return rate;
        var price = getPrice( nthHour-1 ) * (1-discnt);
        return Math.round(price * 100) / 100;
    }

    (function init(){
        let nav_params = navService.getNavParams();
        console.log("nav params:", nav_params);
        if (typeof nav_params.market_id === "undefined") {
            alert("no market selected!");
        }

        let market = window.modelFactory.find("Market", navService.getNavParams().market_id, (res)=>{
            return res.data.market;
        });
        market.onLoaded = () => {
            $scope.$apply();
            window.market = $scope.market;
        };
        $scope.market = market;

        // let p = window.dataService.getMarket(nav_params.market_id);
        // p.then((res)=>{
        //     console.log("res", res);
        //     let _market = res.data.market;
        //     window.modelFactory.load("Market", _market).then((model)=>{
        //         $scope.$apply(function () {
        //             $scope.market = model;
        //             window.market = $scope.market;
        //         });
        //     });
        // });
    })();
}