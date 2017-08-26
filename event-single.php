<!DOCTYPE html>
<html lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>

    <style>
        .part-found {
            /*border: solid #00961d 1px;*/
            /*padding: 1px;*/
        }
        .part-not-found {
            border: dashed red 1px;
            padding: 6px;
        }
    </style>
</head>
<body class="stretched" ng-app="tcc" ng-controller="EventSingleController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/event-single/event-single.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
=========================== -->
<?php require 'partials/javascripts.htm' ?>
</body>
</html>