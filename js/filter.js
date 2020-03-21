'use strict';

(function () {
  var PRICE = {
    low: 10000,
    high: 50000
  };
  var filters = document.querySelector('.map__filters');

  var filterByType = function (data, value, filterType) {
    return data.filter(function (item) {
      return item.offer[filterType].toString() === value;
    });
  };

  var priceLevel = {
    'low': function (price) {
      return price < PRICE.low;
    },
    'middle': function (price) {
      return price >= PRICE.low && price <= PRICE.high;
    },
    'high': function (price) {
      return price > PRICE.high;
    }
  };

  var filterByPrice = function (data, priceValue) {
    return data.filter(function (item) {
      return priceLevel[priceValue](item.offer.price);
    });
  };

  var filterByFeatures = function (data, featureValue) {
    return data.filter(function (item) {
      return item.offer.features.includes(featureValue);
    });
  };

  var updateFilters = function (data) {
    var selects = filters.querySelectorAll('select');
    var inputChecked = filters.querySelectorAll('.map__checkbox:checked');

    selects = Array.from(selects).filter(function (it) {
      return it.value !== 'any';
    });

    var copyData = data.slice();

    selects.forEach(function (it) {
      switch (it.id) {
        case 'housing-type':
          copyData = filterByType(copyData, it.value, 'type');
          break;
        case 'housing-rooms':
          copyData = filterByType(copyData, it.value, 'rooms');
          break;
        case 'housing-guests':
          copyData = filterByType(copyData, it.value, 'guests');
          break;
        case 'housing-price':
          copyData = filterByPrice(copyData, it.value);
          break;
      }
    });

    inputChecked.forEach(function (it) {
      copyData = filterByFeatures(copyData, it.value);
    });

    return copyData;
  };

  var resetFilters = function () {
    filters.reset();
  };

  var updatePins = function () {
    window.pin.removePins();
    window.card.remove();
    window.pin.render(updateFilters(window.data.allPins));
  };

  window.filter = {
    updatePins: updatePins,
    resetFilters: resetFilters
  };
})();
