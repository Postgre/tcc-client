<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>
    <link rel="stylesheet" href="node_modules/card/dist/card.css" />
    <style>
        .balanceDue {
            color: red;
        }
        .balancePaid {
            color: #1ABC9C;
        }
    </style>
</head>
<body class="stretched" ng-app="tcc" ng-controller="CheckoutController">
<script src="https://js.braintreegateway.com/web/dropin/1.6.1/js/dropin.min.js"></script>

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/checkout/checkout.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
===============================-->
<?php require 'partials/javascripts.htm' ?>
<script src="node_modules/moment/min/moment.min.js"></script>
<script src="node_modules/card/dist/card.js"></script>
</body>
</html>