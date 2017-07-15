angular.module('markets-manage')
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {
    $scope.markets = DEFAULT_MODEL.markets;
    $scope.upcoming_events = DEFAULT_MODEL.upcoming_events;
    init();
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */
    $scope.createMarket = createMarket;
    $scope.deleteMarket = deleteMarket;
    function createMarket(){
        var form = document.forms.newMarketForm;
        var name = form.name.value;
        var address = form.city.value+', '+form.state.value;
        var bio = "";
        var postData = {
            name: name,
            address: address,
            bio: bio
        };
        var p = window.dataService.postMarket( name, bio, address );
        p.then(function(res){
            console.info("res", res);
            sweetAlert("Success!", "Market has been created!", "success");
            window.location.reload();
        });
        p.catch(function(err){
            console.error("err", err);
            sweetAlert("Oops...", "Something went wrong!", "error");
        });
    }
    function deleteMarket( market ){
        var p = window.dataService.deleteMarket(market.id);
        p.then(function(res){
            console.info("res", res);
            sweetAlert("Success!", "Market has been deleted.", "success");
            window.location.reload();
        });
        p.catch(function(err){
            console.error("err", err);
            sweetAlert("Oops...", "Something went wrong!", "error");
        });
    }

    function init(){
        var p = window.dataService.searchMarkets();
        p.then(function(res){
            console.info("res", res);
            $scope.$apply(function(){
                $scope.markets = res.data;
            });
        });
        p.catch(function(err){
            console.error("err", err);
            alert( "Something went wrong" );
        });
    }
}

const DEFAULT_MODEL = {
    markets: [
        {
            "id": 1,
            "created_at": "2017-07-13 02:23:11",
            "updated_at": "2017-07-13 02:23:11",
            "name": "Birmingham",
            "bio": "Your source for quality caroling entertainment in the Birmingham area",
            "location": {
                "type": "Point",
                "coordinates": [
                    -86.8125728,
                    33.5118393
                ]
            },
            "rate_travel_distance": 2,
            "rate_caroler": 100,
            "rate_travel_duration": 60,
            "city": "Birmingham",
            "state": "AL",
            "image": "http://www.privatetoursinegypt.com/uploads/229/Egyptian-Christmas-Offer..jpg"
        }
    ],
    upcoming_events: [
        {
            name: "Rocco's Christmas Party",
            state: "AL",
            city: "Birmingham",
            venue: "1617 13th Avenue South",
            type: "company",
            company_name: "Vector Web Development",
            start_time: "07/19/2017 10:00 AM",
            end_time: "07/19/2017 12:00 AM",
            details: [],
            description: "We'll have a jolly-good time.",
            special_requests: "Send midgets if you have any. Please, thanks.",
            image: "http://www.blogingbloging.com/wp-content/uploads/2013/08/christmas-party.jpg",
            status: "Not Paid"
        }
    ]
};