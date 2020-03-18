'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  address.setAttribute('value', '570, 375');
  var allFilters = document.querySelectorAll('.map__filter');

  var showFieldset = function () {
    for (var j = 0; j < formFieldset.length; j++) {
      formFieldset[j].removeAttribute('disabled', 'disabled');
    }
    return showFieldset;
  };

  var showFilters = function () {
    for (var j = 0; j < allFilters.length; j++) {
      allFilters[j].removeAttribute('disabled', 'disabled');
    }
    return showFilters;
  };
  var set = function () {
    mainPin.draggable = true;
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    showFieldset();
    showFilters();
    window.pin.render(window.data.allPins);
  };

  window.activeMode = {
    set: set,
    mainPin: mainPin,
    formFieldset: formFieldset,
    allFilters: allFilters,
  };

})();

