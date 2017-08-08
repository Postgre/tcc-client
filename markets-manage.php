<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <link rel="stylesheet" href="css/calendar.css" type="text/css">

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="markets-manage" ng-controller="MarketsManageController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header.htm' ?>
    <?php require 'app/markets-manage/markets-manage.html' ?>
    <?php require 'partials/footer.htm' ?>

</div><!-- #wrapper end -->

<!-- Go To Top
============================================= -->
<div id="gotoTop" class="icon-angle-up"></div>

<!-- External JavaScripts
============================================= -->
<?php require 'partials/javascripts.htm' ?>

<script type="text/javascript" src="js/jquery.calendario.js"></script>
<script type="text/javascript" src="js/events-data.js"></script>
</body>
</html>