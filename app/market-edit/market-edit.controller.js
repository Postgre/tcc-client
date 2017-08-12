angular.module('market-edit')
    .controller('MarketEditController', MarketEditController);

function MarketEditController($scope) {

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
    $scope.getEditClass = function () {
        if ($scope.editing_special_dates) return "col-sm-5";
        return "col-sm-6";
    };

    (function init() {
        let market_id = navService.getNavParams().market_id;
        // let market_id = window.getQueryVariable('market');

        // window.modelFactory.find("Market", market_id, true).then((market)=>{
        //     $scope.market = market;
        //     $scope.$apply();
        // });

        let mkt = modelFactory.get("Market", market_id);
        mkt.loadSpecialDates();
        mkt.loadGallery();
        mkt.loadCarolerConfigs();
        mkt.subscribe("async", function () {
            $scope.$apply();
        });
        $scope.market = mkt;
    })();

    /**
     * Functions
     * ===============
     */
    $scope.createSpecialDate = function () {
        $scope.market.addSpecialDate();
    };
    $scope.deleteSpecialDate = function (specialDate) {
        $scope.market.deleteSpecialDate(specialDate);
    };
    $scope.publishMarket = function () {
        swal({
            title: "Lets go Live!",
            text: "Once this market is published, it will be discoverable and users can book events. Please review the market settings before publishing!",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok, publish market!",
            closeOnConfirm: false,
            html: false
        }, function () {
            $scope.market.published = 1;
            $scope.market.notify("async");
            $scope.market.update().then(() => {
                swal("We're Live!",
                    $scope.market.name + " is live and discoverable!",
                    "success");
            });
        });
    };
    $scope.unpublishMarket = function () {
        swal({
            title: "Take Down Market?",
            text: "You are about to un-publish this market. This will make it non-discoverable, but not affect existing events.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Un-publish Market!",
            closeOnConfirm: false,
            html: false
        }, function () {
            $scope.market.published = 0;
            $scope.market.notify("async");
            $scope.market.update().then(() => {
                swal("Done.",
                    $scope.market.name + " is no longer discoverable",
                    "success");
            });
        });
    };
    $scope.deleteGalleryImage = function (media) {
        $scope.market.removeMediaLink(media);
    };
    $scope.addGalleryImage = function () {
        // TODO: wrap media links into a /lib class
        $scope.market.addMediaLink({
            url: "http://www.privatetoursinegypt.com/uploads/229/Egyptian-Christmas-Offer..jpg"
        });
    };
    $scope.updateMarket = function () {
        $scope.market.update().then(()=>{
            swal("Success!",
                "Your changes have been saved",
                "success");
        });
    };
}