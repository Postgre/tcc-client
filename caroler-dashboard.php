<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <!-- CSS
    =========================================== -->
    <?php require 'partials/head.htm' ?>
    <!-- Bootstrap Data Table Plugin -->
    <link rel="stylesheet" href="css/components/bs-datatable.css" type="text/css"/>
    <style>
        .col-cust {
            font-weight: bold;
            font-size: 16px;
            padding-left: 15px;
        }
        .mr10 {
            margin-right: 10px;
        }
        a {
            color: initial;
        }
        table label.part-label:hover {
            background-color: #00A0D1;
        }
    </style>

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="caroler-dashboard" ng-controller="CarolerDashboardController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/caroler-dashboard/caroler-dashboard.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<!-- JAVASCRIPTS
=============================== -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>
<script type="text/javascript" src="js/components/moment.js"></script>
</body>
</html>