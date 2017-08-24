<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <!-- CSS
    =========================================== -->
    <?php require 'partials/head.htm' ?>
    <!-- Date & Time Picker CSS -->
    <link rel="stylesheet" href="demos/travel/css/datepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/timepicker.css" type="text/css">
    <link rel="stylesheet" href="css/bootstrap-datepicker3.standalone.min.css" type="text/css">
    <!-- Bootstrap Data Table Plugin -->
    <link rel="stylesheet" href="css/components/bs-datatable.css" type="text/css"/>

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="tcc" ng-controller="ResellersController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/resellers/resellers.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<!-- JAVASCRIPTS
=============================== -->
<?php require 'partials/javascripts.htm' ?>
<!-- Date & Time Picker JS -->
<script type="text/javascript" src="js/components/moment.js"></script>
<script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="js/components/timepicker.js"></script>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>

</body>
</html>