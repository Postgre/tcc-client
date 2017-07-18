angular.module('market-edit')
.controller('MarketEditController', MarketEditController);

function MarketEditController( $scope ) {
    $scope.market = DEFAULT_MODEL.market;
    $scope.gallery = [{
        image: "https://www.nycgo.com/images/uploads/homepage/Empire-State-Building-Observatory-Tom-Perry-2618.jpg"
    }];
    $scope.specialDates = [ {} ];

    $scope.editing_special_dates = false;
    $scope.editing_gallery = false;
    $scope.editClassMap = "col-sm-6";

    /**
     * Functions
     * ===============
     */
    $scope.deleteSpecialDate = deleteSpecialDate;
    $scope.editSpecialDates = editSpecialDates;
    $scope.createSpecialDate = createSpecialDate;
    $scope.stopEditingSpecialDates = stopEditingSpecialDates;
    $scope.publishMarket = publishMarket;
    $scope.unpublishMarket = unpublishMarket;
    $scope.deleteGalleryImage = deleteGalleryImage;
    $scope.addGalleryImage = addGalleryImage;
    $scope.updateMarket = updateMarket;
    $scope.getPrice = getPrice;

    function deleteSpecialDate( date ){
        var ind = $scope.specialDates.indexOf( date );
        $scope.specialDates.splice( ind, 1 );
    }
    function createSpecialDate(){
        $scope.specialDates.push({});
    }
    function editSpecialDates(){
        $scope.editClassMap = "col-sm-5";
        $scope.editing_special_dates = true;
    }
    function stopEditingSpecialDates() {
        $scope.editClassMap = "col-sm-6";
        $scope.editing_special_dates = false;
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
                $scope.market.published = true;
            });
            $scope.market.published = true;
            swal("We're Live!",
                $scope.market.name + " is live and discoverable!",
                "success");
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
                $scope.market.published = false;
            });
            swal("Done.",
                $scope.market.name + " is no longer discoverable",
                "success");
        });
    }
    function deleteGalleryImage(img){
        // use ajax request for deletes
        var ind = $scope.gallery.indexOf(img);
        $scope.gallery.splice(ind,1);
    }
    function addGalleryImage(){
        $scope.gallery.push({
            image: "http://www.privatetoursinegypt.com/uploads/229/Egyptian-Christmas-Offer..jpg"
        });
    }
    function updateMarket() {
        var mkt = $scope.market;
        var p = window.dataService.putMarket( $scope.market.id, {
            name: mkt.name,
            bio: mkt.bio,
            image: mkt.image,
            state: mkt.state,
            city: mkt.city,
            email: mkt.email,
            phone: mkt.phone,
            published: mkt.published
        } );
        p.then(function(res){
            console.info("res", res);
            swal("Success!",
                "Your changes have been saved",
                "success");
        });
        p.catch(function(err){
            console.error("err", err);
        });
    }
    function getPrice( nthHour ){
        var rate = $scope.market.base_rate;
        var discnt = $scope.market.hourly_discount;
        if( nthHour === 1 ) return rate;
        var price = getPrice( nthHour-1 ) * (1-discnt);
        return Math.round(price * 100) / 100;
    }

    (function init(){
        var nav_params = navService.getNavParams();
        console.log("nav params:", nav_params);
        if (typeof nav_params === "undefined") {
            alert("no market selected!");
        }
        var p = window.dataService.getMarket(nav_params.market_id);
        p.then(function (res) {
            console.log("res", res);
            $scope.$apply(function () {
                $scope.market = res.data.market;
                window.market = $scope.market;
            });
        });
    })();
}

const DEFAULT_MODEL = {
    market: {
        name: "The Birmingham Carolers",
        description: "Birmingham's best holiday entertainment",
        html: 'Beautiful Birmingham is known for its impressive skyline. That skyline lights up even brighter at Christmas, when holiday lights adorn every corner. From the Zoolight Safari at Birmingham Zoo to the city tree lighting ceremony, there’s a lot to love.',
        city: "Birmingham",
        state: "AL",
        zip: 35205,
        address: "1617 13th Avenue South",
        email: "chris.rocco7@gmail.com",
        phone: 2056396666,
        published: false,
        video: "https://www.youtube.com/watch?v=DA2QpqgIq6g",
        image: "http://soulofamerica.com/soagalleries/birmingham/enjoy/Birmingham-skyline.jpg",
        baseRate: 99.99,
        hourlyRates: {
            "1": 100,
            "2": 100,
            "3": 100,
            "4": 100,
            "5": 100
        },
        discounts: {
            "10-20":    .10,
            "21-30":    .14,
            "31-40":    .17,
            "41+":      .20
        },
        carolerConfigurations: {
            sab:        true,
            stb:        false,
            satb:       true,
            ssattb:     false,
            ssattbb:    false
        },
        squareCash: "$JohnDoe"
    }
};