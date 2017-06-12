/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
window.marketLandingPageHTML = "Click edit to start building your public market landing page!";

(function (document, window, $) {
    'use strict';

    var summerNoteEditor = $('.landingPageHTML');
    summerNoteEditor.summernote('code', marketLandingPageHTML);
    summerNoteEditor.summernote('destroy');

    var Site = window.Site;

    $(document).ready(function ($) {
        Site.run();

    });

    // Example Click to edit
    // ---------------------
    window.edit = function () {
        summerNoteEditor.summernote({
            focus: true
        });
    };
    window.save = function () {
        handleUpdatedLandingPageHTML(summerNoteEditor.summernote('code'));
        summerNoteEditor.summernote('destroy');
    };

})(document, window, jQuery);

function handleUpdatedLandingPageHTML(html) {
    alert("handled!");
    console.log(html);
}