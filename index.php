<?php //header("location: maintenance.html"); ?>
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>

    <!-- CSS
    ================================= -->
    <link rel="stylesheet" href="css/home/home.css"/>
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

    <style>

        #header, #header-wrap, #logo img {
            height: 250px;
        }
        #header.transparent-header + #slider, #header.transparent-header + #page-title.page-title-parallax, #header.transparent-header + #google-map, #slider + #header.transparent-header {
            top: -250px;
        }

        ._720kb-datepicker-calendar {
            bottom: 40px;
        }
        .tcc-home-panel .panel-heading {
            background-color: #800020;
            color: white;
            text-align: center;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            text-transform: uppercase;
        }
        .tcc-home-panel .panel-body {
            text-align: justify;
            font-size: 16px;
        }
        .tcc-home-panel .panel-body .button-wrapper {
            text-align: center;
        }
        .tcc-home-panel .panel-body button {
            background-color: #800020;
            border-color: #6b1808;
        }
    </style>
</head>
<body class="stretched" ng-app="tcc" ng-controller="HomeController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-1.php' ?>
    <?php require 'app/home/home.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>
<div id="gotoTop" class="icon-angle-up"></div>

<!-- JAVASCRIPTS
========================================= -->
<?php require 'partials/javascripts.htm' ?>

<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>

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