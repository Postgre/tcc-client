/*!
 * the-christmas-carolers_client (http://thechristmascarolers.com)
 * Copyright 2017 Chris Rocco
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
