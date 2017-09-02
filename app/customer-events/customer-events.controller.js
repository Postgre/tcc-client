angular.module("customer-events")
    .controller('CustomerEventsController', CustomerEventsController);

/**
 * Server response format:
 * {
 *  orders: [
 *      {
 *          event: {},
 *          market: {},
 *          invoice: {}
 *      }
 *  ]
 * }
 */
function CustomerEventsController( $scope ) {

    $scope.upcoming_events = [];
    init();
    /**
     * Models
     * ===============
     */

    /**
     * Functions
     * ===============
     */
    $scope.fmtDate = fmtDate;

    function fmtDate(date){
        return moment(date).format("MM/DD/YYYY");
    }

    /**
     * Init
     * ===============
     */
    function init(){
        // loadCalendar({});

        function ready(){
            $scope.$apply();
        }

        let now = moment().format("YYYY-MM-DD");
        /* load upcoming events */
        modelFactory.all("Booking", {
            where: "end_time > "+now
        }).then((events)=>{
            // let calData = {};
            events.forEach(function(event){
                // loading into calendar format
                let date = moment(event.start_time);
                event.startDate = date.format("D");
                event.startMonth = date.format("MMM");
                // calData[date.format("MM-DD-YYYY")] = `<a href="/event-single.php?booking=${event.id}">${event.name}</a>`;
            });
            // loadCalendar(calData);
            $scope.upcoming = events;
            ready();
        });
        // end
        /* load past events */
        modelFactory.all("Booking", {
            where: "end_time < "+now
        }).then((events)=>{
            events.forEach(function(event){
                let date = moment(event.start_time);
                event.startDate = date.format("D");
                event.startMonth = date.format("MMM");
            });

            $scope.past = events;
            ready();
        });
        // end
    }

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
}