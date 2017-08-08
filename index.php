<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>

    <!-- CSS
    ================================= -->
    <link rel="stylesheet" href="css/home/home.css" />
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">
    <!-- Vector Maps -->
    <link rel="stylesheet" href="css/vmap.css" type="text/css">
    <!-- Date & Time Picker CSS -->
    <link rel="stylesheet" href="css/components/datepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/timepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/daterangepicker.css" type="text/css">
    <!-- SLIDER REVOLUTION 5.x CSS SETTINGS -->
    <link rel="stylesheet" type="text/css" href="include/rs-plugin/css/settings.css" media="screen">
    <link rel="stylesheet" type="text/css" href="include/rs-plugin/css/layers.css">
    <link rel="stylesheet" type="text/css" href="include/rs-plugin/css/navigation.css">
</head>
<body class="stretched" ng-app="home" ng-controller="HomeController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/header-1.htm' ?>
    <?php require 'angular/home/home.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>
<div id="gotoTop" class="icon-angle-up"></div>

<!-- JAVASCRIPTS
========================================= -->
<?php require 'partials/javascripts.htm' ?>

<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>
<!-- Date & Time Picker JS -->
<script type="text/javascript" src="js/components/moment.js"></script>
<script type="text/javascript" src="js/components/datepicker.js"></script>
<script type="text/javascript" src="js/components/timepicker.js"></script>
<!-- Google Map -->
<script type="text/javascript"
        src="https://maps.google.com/maps/api/js?key=AIzaSyDMxJ92oBkSnVNHFX3R8XhtYQPEgk1_IiI"></script>
<script type="text/javascript" src="js/jquery.gmap.js"></script>
<!-- Include Date Range Picker -->
<script type="text/javascript" src="js/components/daterangepicker.js"></script>

<!-- SLIDER REVOLUTION 5.x SCRIPTS  -->
<script type="text/javascript" src="include/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.video.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.slideanims.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.actions.min.js"></script>
<script type="text/javascript"
        src="include/rs-plugin/js/extensions/revolution.extension.layeranimation.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.navigation.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.kenburn.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.parallax.min.js"></script>
<script type="text/javascript" src="js/home/revslider.js"></script>
</body>
</html>