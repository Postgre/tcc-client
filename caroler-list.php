<!DOCTYPE html>
<html lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="tcc" ng-controller="CarolerListController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/caroler-list/caroler-list.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
=========================== -->
<?php require 'partials/javascripts.htm' ?>
</body>
</html>