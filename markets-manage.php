<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- CSS
    ==================== -->
    <link rel="stylesheet" href="css/calendar.css" type="text/css">
    <link rel="stylesheet" href="css/markets-manage/markets-manage.css" type="text/css" />
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="tcc" ng-controller="MarketsManageController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/markets-manage/markets-manage.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<!-- Go To Top
============================================= -->
<div id="gotoTop" class="icon-angle-up"></div>

<!-- JAVASCRIPTS
============================================= -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>

<script type="text/javascript" src="js/jquery.calendario.js"></script>
<script type="text/javascript" src="js/events-data.js"></script>
</body>
</html>