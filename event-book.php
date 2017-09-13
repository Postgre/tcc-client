<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>
</head>

<body class="stretched" ng-app="tcc" ng-controller="BookingController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/event-book/event-book.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>

</body>
</html>