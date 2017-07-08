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

  // Example editable Table
  // ----------------------
  $('#editableTable').editableTableWidget().numericInputExample().find('td:first').focus();

})(document, window, jQuery);
