<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>

    <!-- CSS
    ========================================-->
    <!-- Radio Checkbox Plugin -->
    <link rel="stylesheet" href="css/components/radio-checkbox.css" type="text/css">
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">
    <!-- Bootstrap File Upload CSS -->
    <link rel="stylesheet" href="css/components/bs-filestyle.css" type="text/css" />

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

</head>
<body class="stretched" ng-app="tcc" ng-controller="ProfileController">
<div id="wrapper" class="clearfix">

    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <?php require 'app/profile/profile.html' ?>
    <?php require 'partials/footer.htm' ?>

</div>

<!-- JAVASCRIPTS
========================= -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>
<!-- Bootstrap File Upload Plugin -->
<script type="text/javascript" src="js/components/bs-filestyle.js"></script>

</body>
</html>