<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- CSS
    ===========================================-->
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">
    <!-- Sweet Alert -->
    <link rel="stylesheet" href="node_modules/sweetalert/dist/sweetalert.css" type="text/css">
    <script src="node_modules/sweetalert/dist/sweetalert.min.js"></script>
    <!-- Checkboxes -->
    <link rel="stylesheet" href="css/components/radio-checkbox.css" type="text/css" />


    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

    <style>
        .travel_cost_breakdown b {
            color: #1ABC9C;
        }
        #quote-details .row {
            margin-bottom: 30px;
        }
    </style>
</head>

<body class="stretched" ng-app="tcc" ng-controller="BookingController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/booking/event-book.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>

<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>

</body>
</html>