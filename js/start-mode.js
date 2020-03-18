'use strict';

(function () {

  var hideFieldset = function () {
    for (var j = 0; j < window.activeMode.formFieldset.length; j++) {
      window.activeMode.formFieldset[j].setAttribute('disabled', 'disabled');
    }
    return hideFieldset;
  };

  var hideFilters = function () {
    for (var j = 0; j < window.activeMode.allFilters.length; j++) {
      window.activeMode.allFilters[j].setAttribute('disabled', 'disabled');
    }
    return hideFilters;
  };

  var disabledMode = function () {
    hideFieldset();
    hideFilters();
  };

  disabledMode();

  window.activeMode.mainPin.addEventListener('mousedown', function () {
    window.activeMode.set();
  });

  window.startMode = {
    disabledMode: disabledMode
  };
})();
