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
    </style>

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched" ng-app="caroler-dashboard" ng-controller="CarolerDashboardController">
<div id="wrapper" class="clearfix">
    <?php require 'partials/top-bar.htm' ?>
<?php require 'partials/header.htm' ?>
    <?php require 'app/caroler-dashboard/caroler-dashboard.html' ?>
    <?php require 'partials/footer.htm' ?>
</div><!-- #wrapper end -->

<!-- JAVASCRIPTS
=============================== -->
<?php require 'partials/javascripts.htm' ?>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>
<script>
    function promptClaimConfirm(cb) {
        swal({
            title: "Are you sure?",
            text: "You'll be expected to show!",
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#337ab7",
            confirmButtonText: "Yes, claim event!",
            closeOnConfirm: false
        }, cb);
    }

    function notifyClaimed() {
        swal("Done!", "The position is yours!", "success")
    }

    function initDataTable() {
        $('#datatable').dataTable();
        $('#datatable2').dataTable();
    }
</script>

</body>
</html>