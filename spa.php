<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>

    <!-- CSS
    ================================= -->
    <link rel="stylesheet" href="css/home/home.css"/>
    <!-- Bootstrap Select CSS -->
    <link rel="stylesheet" href="css/components/bs-select.css" type="text/css">
    <!-- Vector Maps -->
    <link rel="stylesheet" href="css/vmap.css" type="text/css">
    <!-- Date & Time Picker CSS -->
    <link rel="stylesheet" href="css/components/datepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/timepicker.css" type="text/css">
    <link rel="stylesheet" href="css/components/daterangepicker.css" type="text/css">
    <!-- SLIDER REVOLUTION 5.x CSS SETTINGS -->
    <link rel="stylesheet" type="text/css" href="include/rs-plugin/css/settings.css" media="screen">
    <link rel="stylesheet" type="text/css" href="include/rs-plugin/css/layers.css">
    <link rel="stylesheet" type="text/css" href="include/rs-plugin/css/navigation.css">
    <!-- Bootstrap Data Table Plugin -->
    <link rel="stylesheet" href="css/components/bs-datatable.css" type="text/css"/>

</head>
<body class="stretched" ng-app="tcc-single">
<div id="wrapper" class="clearfix">
    <!-- Top Bar
		============================================= -->
    <div id="top-bar" class="tcc_if_login">
        <div class="container clearfix">
            <div class="col_half nobottommargin">
                <div class="welcome">
                    <span>Welcome back, <b class="tcc_name"><!--Dynamic --></b>!</span>
                </div>
            </div>
            <div class="col_half fright col_last nobottommargin">
                <div class="top-links">
                    <ul>
                        <li class="tcc_if_director tcc_if_admin"><a href="#!markets-manage">Markets</a></li>
                        <li class="tcc_if_customer"><a href="#!customer-events">My Events</a></li>
                        <li class="tcc_if_admin"><a href="/promos.php">Promos</a></li>
                        <li class="tcc_if_admin"><a href="/resellers.php">Resellers</a></li>
                        <li class="tcc_if_admin"><a href="#!caroler-list">Carolers</a></li>
                        <li class="tcc_if_admin"><a href="/event-list.php">Events</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div><!-- #top-bar end -->

    <!-- header
		============================================= -->
    <header id="header" class="full-header dark" data-sticky-class="dark">
        <div id="header-wrap">
            <div class="container clearfix">
                <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>
                <!-- Logo
                ============================================= -->
                <div id="logo">
                    <a href="/index.php" data-dark-logo="images/tcc-logo.png"
                       class="standard-logo"><img src="/images/tcc-logo.png" alt="TCC Logo"></a>
                    <a href="/index.php" data-dark-logo="images/tcc-logo.png"
                       class="retina-logo"><img src="/images/tcc-logo.png" alt="TCC Logo"></a>
                </div><!-- #logo end -->
                <!-- Account
                ============================================= -->
                <div id="top-account" class="dropdown">
                    <a href="/login-register.php" id="login-register" class="btn btn-default">Login
                        / Register</a>
                    <a href="#" id="my-account" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="true" style="display: none"><i class="icon-user"></i><i
                                class="icon-angle-down"></i></a>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                        <li><a href="/profile.php">Profile</a></li>
                        <li class="tcc_if_caroler divider" role="separator"></li>
                        <li class="tcc_if_caroler"><a href="/caroler-dashboard.php">Caroler
                                Dashboard</a></li>
                        <li role="separator" class="divider"></li>
                        <li><a href="javascript:authService.logout()">Logout <i class="icon-signout"></i></a></li>
                    </ul>
                </div>

                <!-- Primary Navigation
                ============================================= -->
                <nav id="primary-menu">
                    <ul>
                        <li>
                            <a href="#!">
                                <div>Home</div>
                            </a>
                        </li>
                        <li>
                            <a href="#!locations">
                                <div>Locations</div>
                            </a>
                        </li>
                        <li>
                            <a href="/about.php">
                                <div>About</div>
                            </a>
                        </li>
                        <li>
                            <a href="/contact.php">
                                <div>Contact</div>
                            </a>
                        </li>
                    </ul>
                </nav><!-- #primary-menu end -->
            </div>
        </div>
    </header>
    <!-- #header end -->

    <ng-view></ng-view>
    <?php require 'partials/footer.htm' ?>
</div>
<div id="gotoTop" class="icon-angle-up"></div>

<!-- JAVASCRIPTS
========================================= -->
<!-- External JavaScripts
============================================= -->
<?php require 'partials/javascripts.htm' ?>

<!-- SLIDER REVOLUTION 5.x SCRIPTS  -->
<script type="text/javascript" src="include/rs-plugin/js/jquery.themepunch.tools.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/jquery.themepunch.revolution.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.video.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.slideanims.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.actions.min.js"></script>
<script type="text/javascript"
        src="include/rs-plugin/js/extensions/revolution.extension.layeranimation.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.navigation.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.kenburn.min.js"></script>
<script type="text/javascript" src="include/rs-plugin/js/extensions/revolution.extension.parallax.min.js"></script>
<script type="text/javascript" src="js/home/revslider.js"></script>
<!-- Bootstrap Data Table Plugin -->
<script type="text/javascript" src="js/components/bs-datatable.js"></script>
</body>
</html>