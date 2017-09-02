<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <!-- CSS
    ================================ -->
    <link rel="stylesheet" href="css/calendar.css"/>

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

</head>

<body class="stretched" ng-app="tcc" ng-controller="CustomerEventsController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/customer-events/customer-events.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
===============================-->
<?php require 'partials/javascripts.htm' ?>
<script type="text/javascript" src="js/jquery.calendario.js"></script>
<script src="node_modules/moment/min/moment.min.js"></script>

</body>
</html>