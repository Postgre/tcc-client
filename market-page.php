<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- Demo Style -->
    <link rel="stylesheet" href="demos/travel/travel.css" type="text/css">

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

</head>
<body class="stretched" ng-app="market-page" ng-controller="MarketPageController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/header.htm' ?>
    <?php require 'angular/market-page/market-page.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->
<?php require 'partials/javascripts.htm' ?>

<script type="text/javascript"
        src="https://maps.google.com/maps/api/js?key=AIzaSyDMxJ92oBkSnVNHFX3R8XhtYQPEgk1_IiI"></script>
<script type="text/javascript" src="js/jquery.gmap.js"></script>
<script>
    function loadMap(address) {
        jQuery('#event-location').gMap({
            address: address,
            maptype: 'ROADMAP',
            zoom: 8,
            markers: [
                {
                    address: address
                }
            ],
            doubleclickzoom: false,
            controls: {
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false
            }
        });
    }
</script>

</body>
</html>