module.exports = function () {
  "use strict";

  return {
    options: {
      config: '<%= config.source.sass %>/.csscomb.json'
    },
    css: {
      expand: true,
      cwd: '<%= config.destination.css %>',
      src: ['**/*.css', '!**/*.min.css'],
      dest: '<%= config.destination.css %>/'
    },
    skins: {
      expand: true,
      cwd: '<%= config.destination.skins %>',
      src: ['*.css', '!*.min.css'],
      dest: '<%= config.destination.skins %>'
    },
    pages: {
      expand: true,
      cwd: '<%= config.destination.pages %>/css',
      src: ['**/*.css', '!**/*.min.css'],
      dest: '<%= config.destination.pages %>/css'
    },
  };
};
