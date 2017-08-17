<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>

</head>

<body class="stretched" ng-app="payments" ng-controller="PaymentsController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/payments/payments.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
===============================-->
<?php require 'partials/javascripts.htm' ?>
<script src="node_modules/moment/min/moment.min.js"></script>
<script src="https://js.appcenter.intuit.com//Content/IA/intuit.ipp.payments.sandbox-0.0.3.js"></script>
</body>
</html>