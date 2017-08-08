<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
    <?php require 'partials/head.htm' ?>
    <!-- CSS
    ================================ -->
    <link rel="stylesheet" href="css/calendar.css"/>

    <!-- Angular
    ============================================= -->
    <?php require 'partials/angular.html' ?>

</head>

<body class="stretched" ng-app="customer-events" ng-controller="CustomerEventsController">

<!-- Document Wrapper
============================================= -->
<div id="wrapper" class="clearfix">
    <?php require 'partials/header.htm' ?>
    <?php require 'angular/customer-events/customer-events.html' ?>
    <?php require 'partials/footer.htm' ?>
</div>

<!-- JAVASCRIPTS
===============================-->
<?php require 'partials/javascripts.htm' ?>
<script type="text/javascript" src="js/jquery.calendario.js"></script>
<script src="node_modules/moment/min/moment.min.js"></script>

<script type="text/javascript">

    var cal = null;
    var $month = null;
    var $year = null;

    function loadCalendar(data) {
        cal = $('#calendar').calendario({
            onDayClick: function ($el, $contentEl, dateProperties) {

                for (var key in dateProperties) {
                    console.log(key + ' = ' + dateProperties[key]);
                }

            },
            caldata: data
        }),
            $month = $('#calendar-month').html(cal.getMonthName()),
            $year = $('#calendar-year').html(cal.getYear());
    }

    $('#calendar-next').on('click', function () {
        cal.gotoNextMonth(updateMonthYear);
    });
    $('#calendar-prev').on('click', function () {
        cal.gotoPreviousMonth(updateMonthYear);
    });
    $('#calendar-current').on('click', function () {
        cal.gotoNow(updateMonthYear);
    });

    function updateMonthYear() {
        $month.html(cal.getMonthName());
        $year.html(cal.getYear());
    };

</script>

</body>
</html>