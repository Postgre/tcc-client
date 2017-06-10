module.exports = function () {
  "use strict";

  return {
    options: {
      enabled: true,
      duration: 2
    },
    html: {
      options: {
        message: 'Html Generated!'
      }
    },
    js: {
      options: {
        message: 'JS Generated!'
      }
    },
    css: {
      options: {
        message: 'CSS Generated!'
      }
    },
    skins: {
      options: {
        message: 'Skins Generated!'
      }
    },
    pages: {
      options: {
        message: 'Pages Generated!'
      }
    },
    all: {
      options: {
        message: 'All Generated!'
      }
    }
  };
};
