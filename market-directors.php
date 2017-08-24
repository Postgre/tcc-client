<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm'?>
    <!-- Bootstrap Data Table Plugin -->
    <link rel="stylesheet" href="css/components/bs-datatable.css" type="text/css">

    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="tcc" ng-controller="MarketDirectorsController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php'?>
    <?php require 'app/market-directors/market-directors.html' ?>
    <?php require 'partials/footer.htm'?>
</div>

<!-- JAVASCRIPTS
========================== -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>
</body>
</html>