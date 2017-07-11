angular.module('market-edit')
.controller('MarketEditController', MarketEditController);

function MarketEditController( $scope ) {
    $scope.market = DEFAULT_MODEL.market;

    $scope.editing_sd = false;
    $scope.editClassMap = "col-sm-6";
    init();

    /**
     * Functions
     * ===============
     */
    $scope.deleteSpecialDate = deleteSpecialDate;
    $scope.editSpecialDates = editSpecialDates;
    $scope.stopEditingSpecialDates = stopEditingSpecialDates;
    $scope.publishMarket = publishMarket;
    $scope.unpublishMarket = unpublishMarket;

    function deleteSpecialDate( date ){
        var ind = $scope.market.specialDates.indexOf( date );
        $scope.market.specialDates.splice( ind, 1 );
    }
    function editSpecialDates(){
        $scope.editClassMap = "col-sm-5";
        $scope.editing_sd = true;
    }
    function stopEditingSpecialDates() {
        $scope.editClassMap = "col-sm-6";
        $scope.editing_sd = false;
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

    function init(){

    }
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
        specialDates: [ {} ],
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