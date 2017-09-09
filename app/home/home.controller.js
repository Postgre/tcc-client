angular.module("home")
    .controller("HomeController", HomeController);

function HomeController($scope) {
    $scope.quote = {};
    /* Revolution Slider */
    initRevSlider();
    // end

    /* instant quote form */
    $scope.address = "";
    $scope.city = "";
    $scope.state = "";
    $scope.caroler_config = "quartet";
    // end

    let quoteRequest = null;
    $scope.handleGetQuote = () => {
        $scope.loadingQuote = true;
        let data = parseQuoteRequest();
        let qr = new QuoteRequest(data, dataService);
        qr.submit().then((data) => {
            $scope.quote = data.quote;
            $scope.quote.market = data.market;
            $scope.market = data.market;
            $scope.loadingQuote = false;
            $scope.$apply();
            $("#quoteModal").modal("show");
            quoteRequest = qr;
            quoteRequest.id = $scope.quote.id;
        }).catch((reason) => {
            $scope.loadingQuote = false;
            if (reason === "INVALID_DATE_TIME") {
                swal("Oops..", "Invalid Date Time", "error");
            }
            if (reason === "BAD_ADDRESS") {
                swal("Bad Address", "Address could not be resolved", "error")
            }
            if (reason === "INVALID_DISTANCE") {
                swal("No Results", "No markets were found near you", "warning")
            }
            if (reason === "DURATION_TOO_SHORT") {
                swal("Invalid Duration", "The minimum duration for events is 1 hour", "warning")
            }
            if (reason === "DURATION_TOO_LONG") {
                swal("Invalid Duration", "The maximum duration for events is 10 hours", "warning")
            }
            if (reason === "INVALID_DATE_START") {
                swal("Wait a Minute!", "That date has already passed.", "warning")
            }
            if (reason === "INVALID_DATE_END") {
                swal("Wait a Minute!", "Your end date is before your start date", "warning")
            }
        })
    };
    $scope.handleSaveQuote = () => {
        $("#quoteModal").modal("hide");
        swal({
                title: "Send Quote to Email",
                text: "You can book it later!",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Your Email"
            },
            function (inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }

                quoteRequest.save(inputValue).then(() => {
                    swal("Done!", "We've sent the quote to your email", "success");
                }).catch(somethingWentWrong);
            });
    };

    function init() {
        /* date and time pickers */
        let date = moment().add(7, 'days');
        let start = moment(date);
        let end = moment(start).add(2, 'hours');
        $scope.bind_date = date.format("MM/DD/YYYY");
        $scope.bind_start = start.hour(17).minute(0);
        $scope.bind_end = end.hour(20).minute(0);
        $scope.$watch('bind_date', function (value) {
            $scope.updateTimes();
        });
        // end

        dataService.getResourceAll("markets", {
            published: 1
        }).then((markets) => {
            let markers = [];
            for (let i = 0; i < markets.length; i++) {
                let mkt = markets[i];
                markers.push({
                    address: formatAddress(mkt.address, mkt.city, mkt.state),
                    html:
                        '<a href="/market-page.php?market='+mkt.id+'">' +
                            '<b>'+ mkt.name+'</b>' +
                        '</a>',
                    icon: {
                        image: "images/icons/map-icon-red.png",
                        iconsize: [32, 39],
                        iconanchor: [16, 36]
                    }
                });
            }
            renderMap(markers);
        }).catch(window.somethingWentWrong);
    }

    $scope.updateTimes = function updateTimes() {
        let DATETIME_FORMAT = "MM/DD/YYYY HH:mm";
        let date_format = DATETIME_FORMAT.split(" ")[0];
        let time_format = DATETIME_FORMAT.split(" ")[1];
        let d = $scope.bind_date;
        let s = $scope.bind_start;
        let e = $scope.bind_end;
        $scope.start = moment(d).format(date_format) + " " + moment(s).format(time_format);
        $scope.end = moment(d).format(date_format) + " " + moment(e).format(time_format);
        console.log($scope.start, $scope.end);
    };

    // TODO: make this re-usable
    $scope.truncate = function truncate(marketBio, id) {
        let charLimit = 255;
        if (marketBio.length <= charLimit) return marketBio;
        return marketBio.substring(0, charLimit) + `... &nbsp <a href='market-page.php?market=${id}'>see more</a>`;
    };

    function parseQuoteRequest() {
        return {
            start_time: $scope.start,
            end_time: $scope.end,
            address: formatAddress($scope.address, $scope.city, $scope.state,),
            caroler_config: $scope.caroler_config
        }
    }

    init();

    function initRevSlider() {
        var tpj = jQuery;

        var revapi431;
        tpj(document).ready(function () {
            if (tpj("#rev_slider_431_1").revolution == undefined) {
                revslider_showDoubleJqueryError("#rev_slider_431_1");
            } else {
                revapi431 = tpj("#rev_slider_431_1").show().revolution({
                    sliderType: "hero",
                    jsFileLocation: "include/rs-plugin/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        mouseScrollReverse: "default",
                        onHoverStop: "off",
                        arrows: {
                            style: "hesperiden",
                            enable: true,
                            hide_onmobile: false,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 20,
                                v_offset: 0
                            }
                        }
                    },
                    visibilityLevels: [1240, 1024, 778, 480],
                    gridwidth: 1240,
                    gridheight: 868,
                    lazyType: "none",
                    parallax: {
                        type: "mouse",
                        origo: "enterpoint",
                        speed: 400,
                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                        type: "mouse",
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    stopAfterLoops: 0,
                    stopAtSlide: 1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAutoWidth: "off",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: "",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
                /* STATIC SNOW FLAKE CONTAINER SETTINGS */
                /* PLEASE NOTE! YOU WILL NEED TO ADD AT LEAST 1 STATIC LAYER (EVEN A TRANSPARENT IF YOU WISH) TO USE THE SCRIPT BELOW ON STATIC LAYERS*/


                var snowsettings = {
                    selector: '.tp-static-layers', /* THE INNER CONTAINER WHERE FLAKES SHOULD BE DRAWN (OPTIONAL)*/
                    dimension: 'self', /* THE RUNTIME DIMENSIONS OF THE CONTAINER */
                    particleMaxPer: 400, /* MAX PARTICLE PER 1.5M PIXEL */
                    particlaSize: [0.2, 6], /* MIN, MAX SIZE OF PARTICLE */
                    particleOpacity: [0.3, 1], /* MIN, MAX OPACITY OF PARTICLE */
                    particleSpeed: [30, 100], /* MIN, MAX SPEED OF PARTICLES */
                    particleSinus: [1, 100] /* MIN, MAX AMPLITUDE OF PARTICLE ANIM*/
                };


                revapi431.bind("revolution.slide.onloaded", function (e) {
                    revapi431.letItSnow(snowsettings);
                });


                /* THEMEPUNCH CANVAS SNOW PLUGIN
                 ALL RIGHTS RESERVED,
                 SNOW PLUGIN CAN ONLY BE USED WITHIN SLIDER REVOLUTION AND THEMEPUNCH PLUGINS
                 THEMEPUNCH SNOW FLAKE MINI PLUGIN

                 USAGE:
                 To Build Snow: container.letItSnow(settings);
                 To stop Snow: container.letItSnow("stop");
                 To start play Snow again: container.letItSnow("play");
                 To destroy Snow : container.letItSnow("destroy");
                 To make Summer: container.letItSnow("summer");
                 To make Winter Again: container.letItSnow("winter");

                 Settings:

                 selector:'.tp-static-layers' ON WHICH CONTAINER WITHIN THE CONTAINER CANVAS SHOULD BE DRAWN
                 dimension:'self'             THE RUNTIME DIMENSIONS OF THE CONTAINER
                 particleMaxPer:400           MAX PARTICLE PER 1.5M PIXEL
                 particlaSize:[0.2,6]         MIN, MAX SIZE OF PARTICLE
                 particleOpacity:[0.3,1]      MIN, MAX OPACITY OF PARTICLE
                 particleSpeed:[30,100]       MIN, MAX SPEED OF PARTICLES
                 particleSinus:[1,100]        MIN, MAX AMPLITUDE OF PARTICLE (SINUS DIRECTION FOR BETTER EFFECT

                 */


                var snowsettings = {
                    selector: ".tp-static-layers",
                    dimension: "self",
                    particleMaxPer: 400,
                    particlaSize: [.2, 6],
                    particleOpacity: [.3, 1],
                    particleSpeed: [30, 100],
                    particleSinus: [1, 100]
                };
                revapi431.bind("revolution.slide.onloaded", function (e) {
                    revapi431.letItSnow(snowsettings)
                }), function (e, s) {
                    "use strict";

                    function a(e) {
                        e.pause = !0, e.sc.find(".snowflakes_wrapper").remove(), e.c.removeData("snowflakes"), e = {}
                    }

                    function n(e) {
                        e.snowflakes = [];
                        for (var s = e.w * e.h / 15e5; e.snowflakes.length < e.particleMaxPer * s;) e.snowflakes.push(i(e))
                    }

                    function t(e) {
                        window.requestAnimationFrame(function () {
                            r(e)
                        })
                    }

                    function r(e) {
                        if (e == s || e.ctx == s || 1 == e.destroyed || 1 == e.pause) return !1;
                        e.ctx.clearRect(0, 0, 2700, 2500);
                        var a = e.h / 3, n = e.h / 3 * 2;
                        for (var r in e.snowflakes) if (e.snowflakes[r].y + .1 * e.snowflakes[r].r < 0 && 1 == e.summer || e.snowflakes[r].y > e.h + e.snowflakes[r].r && 1 == e.summer) ; else {
                            e.snowflakes[r].delta += e.snowflakes[r].delta == Math.PI / 2 ? -e.snowflakes[r].delta : Math.random() / 500 - .01, e.summer ? e.snowflakes[r].y += e.snowflakes[r].speed / 50 + .1 * e.snowflakes[r].r : e.snowflakes[r].y += e.snowflakes[r].speed / 100 + .1 * e.snowflakes[r].r, e.snowflakes[r].x += Math.sin(e.snowflakes[r].delta) * (.1 * e.snowflakes[r].r), e.snowflakes[r].y > e.h + e.snowflakes[r].r && 1 != e.summer && (e.snowflakes[r] = i(e), e.snowflakes[r].y = 0 - e.snowflakes[r].r);
                            var l = e.snowflakes[r].y - a, o = e.snowflakes[r].r, c = e.snowflakes[r].alpha;
                            if (l > 0 || 1 == e.summer) {
                                var w = 1 - l / n;
                                o = e.snowflakes[r].r * w, c = e.snowflakes[r].alpha * w
                            }
                            o = .1 > o ? .1 : o, c = .1 > c ? .1 : c, e.snowflakes[r].x = e.snowflakes[r].x > e.w + e.snowflakes[r].r ? 0 : e.snowflakes[r].x < -o ? e.w : e.snowflakes[r].x, e.ctx.beginPath(), e.ctx.arc(e.snowflakes[r].x, e.snowflakes[r].y, o, 2 * Math.PI, !1), e.ctx.fillStyle = "rgba(255,255,255," + c + ")", e.ctx.fill()
                        }
                        t(e)
                    }

                    function i(e) {
                        var s = new Object;
                        return s.delta = (e.particleSinus[0] + Math.random() * (e.particleSinus[1] - e.particleSinus[0])) * Math.round(2 * Math.random() - 1), s.r = e.particlaSize[0] + Math.random() * (e.particlaSize[1] - e.particlaSize[0]), s.alpha = e.particleOpacity[0] + Math.random() * (e.particleOpacity[1] - e.particleOpacity[0]), s.speed = (e.particleSpeed[0] + Math.random() * (e.particleSpeed[1] - e.particleSpeed[0])) * s.r / 3, s.x = Math.random() * e.w, s.y = Math.random() * -e.h, s
                    }

                    e.fn.extend({
                        letItSnow: function (r) {
                            var i = {
                                particleMaxPer: 400,
                                particlaSize: [.2, 6],
                                particleOpacity: [.3, 1],
                                particleSpeed: [30, 100],
                                particleSinus: [1, 100]
                            };
                            return "destroy" != r && "stop" != r && "play" != r && "summer" != r && "winter" != r && (r = e.extend(!0, {}, i, r)), this.each(function () {
                                if (-1 != e.inArray(r, ["destroy", "stop", "play", "winter", "summer"])) {
                                    switch (r) {
                                        case"destroy":
                                            r = e(this).data("snowflakes"), r != s && a(r);
                                            break;
                                        case"stop":
                                            r = e(this).data("snowflakes"), r != s && (r.pause = !0);
                                            break;
                                        case"play":
                                            r = e(this).data("snowflakes"), r != s && (r.pause = !1, t(r));
                                            break;
                                        case"summer":
                                            r = e(this).data("snowflakes"), r != s && (r.summer = !0);
                                            break;
                                        case"winter":
                                            r = e(this).data("snowflakes"), r != s && (r.summer = !1)
                                    }
                                    return !1
                                }
                                return r.c = e(this), r.sc = r.selector != s ? e(this).find(r.selector) : r.c, 0 == r.sc.length ? !1 : r.c.data("snowflakes") != s ? !1 : (r.sc.find(".snowflakes_wrapper").remove(), r.sc.append('<div class="snowflakes_wrapper" style="position:relative;z-index:0"><div class="snowflakes_wrapper_inner" style="overflow:hidden;position:relative"><canvas width="2700" height="2500" style="position:relative; max-width:2700px" class="snowflake_canvas"></canvas></div></div>'), r.sw = r.sc.find(".snowflakes_wrapper_inner"), r.sw.data("caller_container", r.c), r.canvas = r.sc.find(".snowflake_canvas"), r.dimension != self ? r.sizer = r.c : r.sizer = r.sc, r.w = r.sizer.width(), r.h = r.sizer.height(), r.sc.find(".snowflakes_wrapper_inner").css({
                                    width: r.w,
                                    height: r.h
                                }), r.canvas = r.canvas[0], r.snowflakes = [], r.ctx = r.canvas.getContext("2d"), n(r), t(r), r.c.data("snowflakes", r), void e(window).resize(function () {
                                    clearTimeout(r.timer), r.timer = setTimeout(function () {
                                        r.w = r.sizer.width(), r.h = r.sizer.height(), r.sc.find(".snowflakes_wrapper_inner").css({
                                            width: r.w,
                                            height: r.h
                                        }), n(r)
                                    }, 50)
                                }))
                            })
                        }
                    })
                }(jQuery);
            }

            revapi431.bind("revolution.slide.onloaded", function (e) {
                setTimeout(function () {
                    SEMICOLON.slider.sliderParallaxDimensions();
                }, 200);
            });

            revapi431.bind("revolution.slide.onchange", function (e, data) {
                SEMICOLON.slider.revolutionSliderMenu();
            });
        });
    }

    function renderMap(markers) {
        $('#popular-dest-map').gMap({
            address: 'United States',
            maptype: 'ROADMAP',
            zoom: 4,
            markers: markers,
            doubleclickzoom: false,
            controls: {
                panControl: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: false
            },
            styles: [{
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{"visibility": "on"}, {"color": "#e0efef"}]
            }, {
                "featureType": "poi",
                "elementType": "geometry.fill",
                "stylers": [{"visibility": "on"}, {"hue": "#1900ff"}, {"color": "#c0e8e8"}]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"lightness": 100}, {"visibility": "simplified"}]
            }, {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [{"visibility": "off"}]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{"visibility": "on"}, {"lightness": 700}]
            }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#7dcdcd"}]}]
        });
    }
}