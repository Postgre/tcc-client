<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
</head>

<body class="stretched">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <?php require 'partials/top-bar.htm' ?>
    <?php require 'partials/header-2.php' ?>

    <!-- Page Title
    ============================================= -->
    <section id="page-title">

        <div class="container clearfix">
            <h1>Contact</h1>
            <span>Get in Touch with Us</span>
            <ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li class="active">Contact</li>
            </ol>
        </div>

    </section><!-- #page-title end -->

    <!-- Content
    ============================================= -->
    <section id="content">

        <div class="content-wrap">

            <div class="container clearfix">

                <!-- Contact Form
                ============================================= -->
                <div class="col_half">

                    <div class="fancy-title title-dotted-border">
                        <h3>Send us an Email</h3>
                    </div>

                    <div class="contact-widget">

                        <form class="nobottommargin" onsubmit="return window.sendContact(this)">

                            <div class="col_one_third">
                                <label for="template-contactform-name">Name
                                    <small>*</small>
                                </label>
                                <input id="template-contactform-name" name="name" placeholder="Name"
                                       value="" class="sm-form-control required">
                            </div>

                            <div class="col_one_third">
                                <label for="template-contactform-email">Email
                                    <small>*</small>
                                </label>
                                <input type="email" id="template-contactform-email" name="email"
                                       placeholder="Email"
                                       value="" class="required email sm-form-control">
                            </div>

                            <div class="col_one_third col_last">
                                <label for="template-contactform-phone">Phone</label>
                                <input id="template-contactform-phone" name="phone"
                                       placeholder="(optional)"
                                       value="" class="sm-form-control">
                            </div>

                            <div class="clear"></div>

                            <div class="col_full">
                                <label for="template-contactform-subject">Subject
                                    <small>*</small>
                                </label>
                                <input id="template-contactform-subject" name="subject"
                                       placeholder="Subject Line"
                                       value="" class="required sm-form-control">
                            </div>

                            <div class="clear"></div>

                            <div class="col_full">
                                <label for="template-contactform-message">Message
                                    <small>*</small>
                                </label>
                                <textarea class="required sm-form-control" id="template-contactform-message"
                                          name="message" rows="6" cols="30"></textarea>
                            </div>

                            <div class="col_full hidden">
                                <input id="template-contactform-botcheck"
                                       name="template-contactform-botcheck" value="" class="sm-form-control">
                            </div>

                            <div class="col_full">
                                <button name="submit" type="submit" id="submit-button" tabindex="5" value="Submit"
                                        class="button button-3d nomargin">Submit Comment
                                </button>
                            </div>

                        </form>
                    </div>

                </div><!-- Contact Form End -->

                <!-- Google Map
                ============================================= -->
                <div class="col_half col_last">

                    <section id="google-map" class="gmap" style="height: 410px;"></section>

                </div><!-- Google Map End -->

                <div class="clear"></div>

                <!-- Contact Info
                ============================================= -->
                <div class="row clear-bottommargin">

                    <div class="col-md-3 col-sm-6 col-sm-offset-1 bottommargin clearfix">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="#"><i class="icon-map-marker2"></i></a>
                            </div>
                            <h3>Our Headquarters<span class="subtitle">Birmingham, AL</span></h3>
                        </div>
                    </div>

                    <div class="col-md-3 col-sm-6 bottommargin clearfix">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="#"><i class="icon-phone3"></i></a>
                            </div>
                            <h3>Call Us<span class="subtitle">833-CAROLER</span></h3>
                        </div>
                    </div>

                    <div class="col-md-3 col-sm-6 bottommargin clearfix">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="https://www.facebook.com/pg/thechristmascarolers/jobs/149769822233949/"><i
                                            class="icon-facebook2"></i></a>
                            </div>
                            <h3>Like on Facebook<span class="subtitle">@thechristmascarolers</span></h3>
                        </div>
                    </div>

                </div><!-- Contact Info End -->

            </div>

        </div>

    </section><!-- #content end -->

    <?php require 'partials/footer.htm' ?>

</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>

<script type="text/javascript">

    jQuery('#google-map').gMap({
        address: '1500 1st avenue north, Birmingham, AL',
        maptype: 'ROADMAP',
        zoom: 14,
        markers: [
            {
                address: "1500 1st avenue north, Birmingham, AL",
                html: '<b><a href>The Christmas Carolers HQ</a></b>',
                icon: {
                    image: "images/icons/map-icon-red.png",
                    iconsize: [32, 39],
                    iconanchor: [32, 39]
                }
            }
        ],
        doubleclickzoom: false,
        controls: {
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        }
    });

</script>


</body>
</html>