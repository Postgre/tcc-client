/*!
 * tcc-app (https://github.com/vector-web-development/tcc-client)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';

  var Site = window.Site;

  $(document).ready(function($) {
    Site.run();
  });

  // Example Click to edit
  // ---------------------
  window.edit = function() {
    $('.click2edit').summernote({
      focus: true
    });
  };
  window.save = function() {
    $('.click2edit').summernote('destroy');
  };

})(document, window, jQuery);
