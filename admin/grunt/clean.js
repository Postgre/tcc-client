module.exports = function () {
  "use strict";

  return {
    html: '<%= config.html %>',
    css: '<%= config.destination.css %>',
    js: '<%= config.destination.js %>',
    skins: '<%= config.destination.skins %>/**/*.css',
    pages: ['<%= config.destination.pages %>/css/**/*.css', '<%= config.destination.pages %>/js/**/*.js'],
  };
};
