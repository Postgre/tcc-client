<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>

    <!-- CSS
    ================================= -->
<!--    <link href="css/custom.css" rel="stylesheet" />-->
</head>
<body class="stretched">
<div id="wrapper" class="clearfix" ng-app="invite-redeem" ng-controller="InviteRedeemController">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/invite-redeem/invite-redeem.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
========================================= -->
<?php require 'partials/javascripts.htm' ?>
</body>
</html>