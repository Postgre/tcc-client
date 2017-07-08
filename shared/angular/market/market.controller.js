angular.module('edit-market')
.controller('EditMarketController', EditMarketController);

function EditMarketController( $scope ) {
    init();
    /**
     * Models
     * ===============
     */
    $scope.market = DEFAULT_MODEL.market;
    $scope.selectedPanel = DEFAULT_MODEL.selectedPanel;
    var summerNoteEditor;

    /**
     * Functions
     * ===============
     */
    $scope.selectPanel = selectPanel;
    $scope.addSpecialDate = addSpecialDate;
    window.edit = editLandingHtml;
    window.save = saveLandingHtml;
    $scope.log = function( obj ){
        console.log( obj );
    };

    function selectPanel( id ){
        $scope.selectedPanel = id;
    }
    // TODO: create datepicker directive
    var timeout = false;
    function addSpecialDate(){
        if( timeout === false ) $scope.market.specialDates.push({});
        timeout = true;
        setTimeout(function(){
            var inputs = $(".input-daterange");
            console.log( inputs );
            $(inputs[inputs.length-1]).datepicker();
            timeout = false;
        },300);
    }
    function editLandingHtml() {
        summerNoteEditor.summernote({
            focus: true
        });
    }
    function saveLandingHtml() {
        $scope.market.html = summerNoteEditor.summernote('code');
        summerNoteEditor.summernote('destroy');
    }

    function init(){
        summerNoteEditor = $('.landingPageHTML');
        summerNoteEditor.summernote('code', DEFAULT_MODEL.market.html);
        summerNoteEditor.summernote('destroy');
    }
}

const DEFAULT_MODEL = {
    market: {
        name: "Default Market",
        description: "This is a default model",
        html: "Click edit to start building your public market landing page!",
        city: "Birmingham",
        state: "AL",
        zip: 35205,
        address: "1617 13th Avenue South",
        email: "chris.rocco7@gmail.com",
        phone: 2056396666,
        specialDates: [ {} ],
        hourlyRates: {
            "1": 100,
            "2": 100,
            "3": 100,
            "4": 100,
            "5": 100
        },
        discounts: {
            "10-20":    .10,
            "21-30":    .14,
            "31-40":    .17,
            "41+":      .20
        },
        carolerConfigurations: {
            sab:        true,
            stb:        false,
            satb:       true,
            ssattb:     false,
            ssattbb:    false
        }
    },
    selectedPanel: "profile-panel"
};