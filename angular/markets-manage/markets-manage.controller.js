angular.module('markets-manage')
.controller('MarketsManageController', MarketsManageController);

function MarketsManageController( $scope ) {
    $scope.markets = DEFAULT_MODEL.markets;
    $scope.upcoming_events = DEFAULT_MODEL.upcoming_events;
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
        var bio = "Edit this market to write a BIO and upload a banner!";

        var p = window.dataService.postMarket( name, bio, address );
        p.then(function(res){
            console.info("res", res);
            swal({
                title: "Success!",
                text: "'"+name+"' has been created!",
                type: "success",
            }, function(){
                window.location.reload();
            });
        });
        p.catch(function(err){
            console.error("err", err);
            sweetAlert("Oops...", "Something went wrong!", "error");
        });
    }
    function deleteMarket( market ){
        swal({
            title: "Delete Market?",
            text: "Are you sure? This can't be undone.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }, function(){
            var p = window.dataService.deleteMarket(market.id);
            p.then(function(res){
                console.info("res", res);
                swal({
                    title: "Success!",
                    text: "'"+market.name+"' has been deleted.",
                    type: "success",
                }, function(){
                    window.location.reload();
                });
            });
            p.catch(function(err){
                console.error("err", err);
                sweetAlert("Oops...", "Something went wrong!", "error");
            });
        });

    }

    $scope.gotoProfile = gotoProfile;
    function gotoProfile(market){
        window.navService.goto("market_profile", {
            market_id: market.id,
            market: market
        })
    }

    $scope.gotoEdit = gotoEdit;
    function gotoEdit(market){
        window.navService.goto("edit_market", {
            market_id: market.id,
            market: market
        })
    }

    (function init(){
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
    })();
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
            description: "Bring your own egg-nog",
            special_requests: "Send midgets if you have any. Please, thanks.",
            image: "http://www.blogingbloging.com/wp-content/uploads/2013/08/christmas-party.jpg",
            status: "Not Paid"
        }
    ]
};