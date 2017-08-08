<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
</head>

<body class="stretched">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">

    <?php require 'partials/header.htm' ?>

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

                        <div class="contact-form-result"></div>

                        <form class="nobottommargin" id="template-contactform" name="template-contactform"
                              action="include/sendemail.php" method="post">

                            <div class="form-process"></div>

                            <div class="col_one_third">
                                <label for="template-contactform-name">Name
                                    <small>*</small>
                                </label>
                                <input type="text" id="template-contactform-name" name="template-contactform-name"
                                       value="" class="sm-form-control required">
                            </div>

                            <div class="col_one_third">
                                <label for="template-contactform-email">Email
                                    <small>*</small>
                                </label>
                                <input type="email" id="template-contactform-email" name="template-contactform-email"
                                       value="" class="required email sm-form-control">
                            </div>

                            <div class="col_one_third col_last">
                                <label for="template-contactform-phone">Phone</label>
                                <input type="text" id="template-contactform-phone" name="template-contactform-phone"
                                       value="" class="sm-form-control">
                            </div>

                            <div class="clear"></div>

                            <div class="col_two_third">
                                <label for="template-contactform-subject">Subject
                                    <small>*</small>
                                </label>
                                <input type="text" id="template-contactform-subject" name="template-contactform-subject"
                                       value="" class="required sm-form-control">
                            </div>

                            <div class="col_one_third col_last">
                                <label for="template-contactform-service">Services</label>
                                <select id="template-contactform-service" name="template-contactform-service"
                                        class="sm-form-control">
                                    <option value="">-- Select One --</option>
                                    <option value="Wordpress">Wordpress</option>
                                    <option value="PHP / MySQL">PHP / MySQL</option>
                                    <option value="HTML5 / CSS3">HTML5 / CSS3</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                </select>
                            </div>

                            <div class="clear"></div>

                            <div class="col_full">
                                <label for="template-contactform-message">Message
                                    <small>*</small>
                                </label>
                                <textarea class="required sm-form-control" id="template-contactform-message"
                                          name="template-contactform-message" rows="6" cols="30"></textarea>
                            </div>

                            <div class="col_full hidden">
                                <input type="text" id="template-contactform-botcheck"
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

                    <div class="col-md-3 col-sm-6 bottommargin clearfix">
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
                            <h3>Speak to Us<span class="subtitle">(844) 922 7653</span></h3>
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

                    <div class="col-md-3 col-sm-6 bottommargin clearfix">
                        <div class="feature-box fbox-center fbox-bg fbox-plain">
                            <div class="fbox-icon">
                                <a href="#"><i class="icon-twitter2"></i></a>
                            </div>
                            <h3>Follow on Twitter<span class="subtitle">2.3M Followers</span></h3>
                        </div>
                    </div>

                </div><!-- Contact Info End -->

            </div>

        </div>

    </section><!-- #content end -->

    <?php require 'partials/footer.htm' ?>

</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>

<script type="text/javascript"
        src="https://maps.google.com/maps/api/js?key=AIzaSyDMxJ92oBkSnVNHFX3R8XhtYQPEgk1_IiI"></script>
<script type="text/javascript" src="js/jquery.gmap.js"></script>

<script type="text/javascript">

    jQuery('#google-map').gMap({
        address: '1500 1st avenue north, Birmingham, AL',
        maptype: 'ROADMAP',
        zoom: 14,
        markers: [
            {
                address: "1500 1st avenue north, Birmingham, AL",
                html: '<div style="width: 300px;"><h4 style="margin-bottom: 8px;"><span>The Christmas Carolers HQ</span></h4><p class="nobottommargin"></p></div>',
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