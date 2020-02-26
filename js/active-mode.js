'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var formFieldset = document.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  address.setAttribute('value', '570, 375');
  var allFilters = document.querySelectorAll('.map__filter');

  var showFieldset = function () { // сделать форму активной
    for (var j = 0; j < formFieldset.length; j++) {
      formFieldset[j].removeAttribute('disabled', 'disabled');
    }
    return showFieldset;
  };

  var showFilters = function () { // сделать фильтры активными
    for (var j = 0; j < allFilters.length; j++) {
      allFilters[j].removeAttribute('disabled', 'disabled');
    }
    return showFilters;
  };

  var set = function () {
    mainPin.draggable = true;
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.pin.list.appendChild(window.pin.createFragment(window.data.similarPins));
    showFieldset();
    showFilters();
  };

  window.activeMode = {
    set: set,
    mainPin: mainPin,
    formFieldset: formFieldset,
    allFilters: allFilters

  };
})();

