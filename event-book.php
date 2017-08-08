<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- CSS
    ===========================================-->
    <!-- Date & Time Picker CSS -->
    <link rel="stylesheet" href="css/components/timepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/daterangepicker.css" type="text/css">
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">
    <!-- Sweet Alert -->
    <link rel="stylesheet" href="node_modules/sweetalert/dist/sweetalert.css" type="text/css">
    <script src="node_modules/sweetalert/dist/sweetalert.min.js"></script>

    <!-- Angular
    ============================================= -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="angular/shared/plugins.module.js"></script>
    <script src="angular/shared/state-select/state-select.directive.js"></script>
    <script src="angular/shared/select/selectpicker.directive.js"></script>
    <script src="angular/booking/booking.module.js"></script>
    <script src="angular/booking/booking.controller.js"></script>

    <style>
        .travel_cost_breakdown b {
            color: #1ABC9C;
        }
    </style>
</head>

<body class="stretched" ng-app="booking" ng-controller="BookingController">
<script>
    if (!window.authService.isLoggedIn()) {
        swal({
            title: "Not so Fast!",
            text: "You'll need an account before booking your booking. Please login or register.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        }, function () {
            navService.goto("auth")
        });
    }
</script>

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <?php require 'partials/header.htm' ?>
    <?php require 'angular/booking/event-book.html' ?>
    <?php require 'partials/footer.htm' ?>

</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>

<!-- Date & Time Picker JS -->
<script type="text/javascript" src="js/components/moment.js"></script>
<script type="text/javascript" src="js/components/timepicker.js"></script>
<!-- Include Date Range Picker -->
<script type="text/javascript" src="js/components/daterangepicker.js"></script>
<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>

<!-- Google Maps -->
<script type="text/javascript"
        src="https://maps.google.com/maps/api/js?key=AIzaSyDMxJ92oBkSnVNHFX3R8XhtYQPEgk1_IiI"></script>
<script type="text/javascript" src="js/jquery.gmap.js"></script>
</body>
</html>