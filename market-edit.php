<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- CSS
    =========================================-->
    <!-- Sweet Alert -->
    <link rel="stylesheet" href="node_modules/sweetalert/dist/sweetalert.css" type="text/css">
    <script src="node_modules/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Date & Time Picker CSS -->
    <link rel="stylesheet" href="demos/travel/css/datepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/timepicker.css" type="text/css">
    <link rel="stylesheet" href="css/bootstrap-datepicker3.standalone.min.css" type="text/css">
    <!-- Bootstrap File Upload CSS -->
    <link rel="stylesheet" href="css/components/bs-filestyle.css" type="text/css">
    <!-- Bootstrap Select -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">
    <!-- Radio Checkbox Plugin -->
    <link rel="stylesheet" href="css/components/radio-checkbox.css" type="text/css">

    <!-- Angular
    ============================================= -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="node_modules/angular-input-masks/releases/angular-input-masks-dependencies.min.js"></script>
    <script src="node_modules/angular-input-masks/releases/angular-input-masks.min.js"></script>
    <script src="node_modules/angular-input-masks/releases/angular-input-masks-standalone.min.js"></script>
    <script src="angular/shared/plugins.module.js"></script>
    <script src="angular/shared/state-select/state-select.directive.js"></script>
    <script src="angular/shared/daterange/daterange.directive.js"></script>
    <script src="angular/market-edit/market-edit.module.js"></script>
    <script src="angular/market-edit/market-edit.controller.js"></script>

    <style>
        .action-buttons-wrapper {
            text-align: right;
        }

        .action-buttons-wrapper button {
            margin-right: 20px;
        }
    </style>
</head>
<body class="stretched" ng-app="market-edit" ng-controller="MarketEditController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/header.htm' ?>
    <?php require 'angular/market-edit/market-edit.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<!-- JAVASCRIPTS
========================================-->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap File Upload Plugin -->
<script type="text/javascript" src="js/components/bs-filestyle.js"></script>
<!-- Date & Time Picker JS -->
<script type="text/javascript" src="js/components/moment.js"></script>
<script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="js/components/timepicker.js"></script>
<!-- Include Date Range Picker -->
<script type="text/javascript" src="js/components/daterangepicker.js"></script>
<!-- BS Select -->
<script src="js/components/bs-select.js"></script>
</body>
</html>