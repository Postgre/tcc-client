<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <?php require 'partials/angular.html' ?>
</head>
<body class="stretched">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix" ng-app="tcc">
    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>
    <!-- Content
            ============================================= -->
    <section id="content">

        <div class="content-wrap">

            <div class="container clearfix">

                <div class="row clearfix">
                    <div class="col-md-6">
                        <h3>Event Information</h3>

                        <p></p>

                        <form class="nobottommargin" >

                            <div class="col_half">
                                <label for="billing-form-name">Market:</label>
                                <input type="text" id="billing-form-name" name="billing-form-name" value="" class="sm-form-control" />
                            </div>

                            <div class="col_half col_last">
                                <label for="billing-form-lname">Last Name:</label>
                                <input type="text" id="billing-form-lname" name="billing-form-lname" value="" class="sm-form-control" />
                            </div>

                            <div class="clear"></div>

                            <div class="col_full">
                                <label for="billing-form-companyname">Company Name:</label>
                                <input type="text" id="billing-form-companyname" name="billing-form-companyname" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <label for="billing-form-address">Address:</label>
                                <input type="text" id="billing-form-address" name="billing-form-address" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <input type="text" id="billing-form-address2" name="billing-form-adress" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <label for="billing-form-city">City / Town</label>
                                <input type="text" id="billing-form-city" name="billing-form-city" value="" class="sm-form-control" />
                            </div>

                            <div class="col_half">
                                <label for="billing-form-email">Email Address:</label>
                                <input type="email" id="billing-form-email" name="billing-form-email" value="" class="sm-form-control" />
                            </div>

                            <div class="col_half col_last">
                                <label for="billing-form-phone">Phone:</label>
                                <input type="text" id="billing-form-phone" name="billing-form-phone" value="" class="sm-form-control" />
                            </div>

                        </form>
                    </div>
                    <div class="col-md-6">
                        <h3 class="">Shipping Address</h3>

                        <form id="shipping-form" name="shipping-form" class="nobottommargin" action="#" method="post">

                            <div class="col_half">
                                <label for="shipping-form-name">Name:</label>
                                <input type="text" id="shipping-form-name" name="shipping-form-name" value="" class="sm-form-control" />
                            </div>

                            <div class="col_half col_last">
                                <label for="shipping-form-lname">Last Name:</label>
                                <input type="text" id="shipping-form-lname" name="shipping-form-lname" value="" class="sm-form-control" />
                            </div>

                            <div class="clear"></div>

                            <div class="col_full">
                                <label for="shipping-form-companyname">Company Name:</label>
                                <input type="text" id="shipping-form-companyname" name="shipping-form-companyname" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <label for="shipping-form-address">Address:</label>
                                <input type="text" id="shipping-form-address" name="shipping-form-address" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <input type="text" id="shipping-form-address2" name="shipping-form-adress" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <label for="shipping-form-city">City / Town</label>
                                <input type="text" id="shipping-form-city" name="shipping-form-city" value="" class="sm-form-control" />
                            </div>

                            <div class="col_full">
                                <label for="shipping-form-message">Notes <small>*</small></label>
                                <textarea class="sm-form-control" id="shipping-form-message" name="shipping-form-message" rows="6" cols="30"></textarea>
                            </div>

                        </form>
                    </div>
                </div>

            </div>

        </div>

    </section><!-- #content end -->

    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
===============================-->
<?php require 'partials/javascripts.htm' ?>
</body>
</html>