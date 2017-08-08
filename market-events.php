<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <!-- Bootstrap Data Table Plugin -->
    <link rel="stylesheet" href="css/components/bs-datatable.css" type="text/css">

    <!-- Angular -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="angular/market-events/market-events.controller.js"></script>
</head>
<body class="stretched" ng-app="market-events" ng-controller="MarketEventsController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/header.htm' ?>
    <?php require 'angular/market-events/market-events.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
============================= -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>
<script>
    setTimeout(function () {
        $("#events_table").dataTable();
    }, 1000);    // must wait for angular to load the DOM
</script>

</body>
</html>