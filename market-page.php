<!DOCTYPE html>
<html lang="en-US">
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
    <?php require 'partials/top-bar.htm' ?>
<?php require 'partials/header-2.php' ?>
    <?php require 'app/market-page/market-page.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
====================== -->
<?php require 'partials/javascripts.htm' ?>
<script type="text/javascript"
        src="https://maps.google.com/maps/api/js?key=AIzaSyDMxJ92oBkSnVNHFX3R8XhtYQPEgk1_IiI"></script>
<script type="text/javascript" src="js/jquery.gmap.js"></script>
</body>
</html>