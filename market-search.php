<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- CSS
    =====================================================-->
    <!-- Travel Demo Specific Stylesheet -->
    <link rel="stylesheet" href="demos/travel/travel.css" type="text/css">

    <link rel="stylesheet" href="demos/travel/css/datepicker.css" type="text/css">
    <!-- Radio Ckeckbox Plugin -->
    <link rel="stylesheet" href="css/components/radio-checkbox.css" type="text/css">
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

</head>

<body class="stretched" ng-app="market-search" ng-controller="MarketSearchController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/header.htm' ?>
    <?php require 'app/market-search/market-search.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>
<?php require 'partials/javascripts.htm' ?>

<!-- JAVASCRIPTS
=======================================-->
<!-- Travel Demo Specific Script -->
<script type="text/javascript" src="demos/travel/js/datepicker.js"></script>
<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>

<script type="text/javascript">
    $(function () {
        $('.travel-date-group').datepicker({
            autoclose: true,
            startDate: "today"
        });
    });
</script>

</body>
</html>