<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <link rel="stylesheet" href="css/calendar.css" type="text/css">

    <!-- Angular
    ============================================= -->
    <script src="node_modules/angular/angular.min.js"></script>
    <script src="angular/shared/plugins.module.js"></script>
    <script src="angular/shared/state-select/state-select.directive.js"></script>
    <script src="angular/shared/daterange/daterange.directive.js"></script>
    <script src="angular/markets-manage/markets-manage.controller.js"></script>

    <!-- Custom Styles -->
    <style>
        .entry-c {
            /*overflow: visible;*/
        }
    </style>
</head>

<body class="stretched" ng-app="markets-manage" ng-controller="MarketsManageController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <?php require 'partials/header.htm' ?>

    <?php require 'angular/markets-manage/markets-manage.html' ?>

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

<!-- Page Scripts
============================-->
<script>
    function parseNewMarketForm() {
        var form = document.forms.newMarketForm;
        var name = form.name.value;
        var address = form.city.value + ', ' + form.state.value;
        var bio = "Edit this market to write a BIO and upload a banner!";

        return {
            name: name,
            address: address,
            bio: bio
        }
    }
</script>

</body>
</html>