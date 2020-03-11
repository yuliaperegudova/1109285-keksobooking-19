'use strict';

(function () {
  var allPins = [];

  window.backend.load(function (data) {
    window.data.allPins = data;
  });

  window.data = {
    allPins: allPins
  };
})();

