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
    <section id="page-title" class="page-title-center">

        <div class="container clearfix">
            <h1>OUR IMAGE GALLERY</h1>
            <span>The Christmas Carolers</span>
            <ol class="breadcrumb">
                <li><a href="#">Home</a></li>
                <li class="active">Gallery</li>
            </ol>
        </div>

    </section><!-- #page-title end -->


    <!-- Content
    ============================================= -->
    <section id="content">

        <div class="content-wrap">
            <div class="container clearfix">

                <div class="col_full clearfix">

                    <div class="masonry-thumbs col-4" data-big="4" data-lightbox="gallery">

                        <div class="col-md-6 portfolio-single-image">
                            <iframe height="315" src="https://www.youtube.com/embed/y4a3IXYH-Aw" allowfullscreen></iframe>
                        </div>
                        <div class="col-md-6 portfolio-single-image">
                            <iframe height="315" src="https://www.youtube.com/embed/06NoFpUkEd8" allowfullscreen></iframe>
                        </div>
                        <div class="col-md-6 portfolio-single-image">
                            <iframe height="315" src="https://www.youtube.com/embed/qzKip64K3HQ" allowfullscreen></iframe>
                        </div>
                        <div class="col-md-6 portfolio-single-image">
                            <iframe height="315" src="https://www.youtube.com/embed/y4a3IXYH-Aw" allowfullscreen></iframe>
                        </div>
                    </div>

                </div>

            </div>

            <a href="market-search.php"
               class="button button-full center tright topmargin footer-stick">
                <div class="container clearfix">
                    We are Available! <strong>Book Carolers Today</strong> <i class="icon-caret-right"
                                                                              style="top:4px;"></i>
                </div>
            </a>
        </div>

    </section><!-- #content end -->

    <!-- Footer
    ============================================= -->
    <?php require 'partials/footer.htm' ?>
    <!-- #footer end -->

</div><!-- #wrapper end -->

<?php require 'partials/javascripts.htm' ?>
</body>
</html>