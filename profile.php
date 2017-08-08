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

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

</head>
<body class="stretched" ng-app="profile" ng-controller="ProfileController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header.htm' ?>

    <?php require 'app/profile/profile.html' ?>

    <?php require 'partials/footer.htm' ?>

</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>

<!-- Bootstrap Select Plugin -->
<script type="text/javascript" src="js/components/bs-select.js"></script>
<script>
    jQuery("#tabs-profile").on("tabsactivate", function (event, ui) {
        jQuery('.flexslider .slide').resize();
    });
</script>

<!-- Footer Scripts
============================================= -->

<script>
    function notifySuccess() {
        swal({
            title: "Success!",
            text: "Your profile has been updated",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-success",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
    }
</script>


</body>
</html>