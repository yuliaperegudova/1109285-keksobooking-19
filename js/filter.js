'use strict';

(function () {

  var PRICE_LEVEL = ['low', 'middle', 'high'];
  var Price = {
    low: 10000,
    high: 50000
  };

  var getPriceLevel = function (price) {
    var i = 1;
    if (price < Price.low) {
      i = 0;
    }
    if (price > Price.high) {
      i = 2;
    }
    return PRICE_LEVEL[i];
  };

  var filter = {
    housingType: 'any',
    roomsType: 'any',
    guestType: 'any',
    priceType: 'any',
  };

  var updatePins = function () {
    var renderedPins = document.querySelectorAll('.map__pin');
    var mainPin = document.querySelector('.map__pin--main');
    renderedPins.forEach(function (it) {
      if (it !== mainPin) {
        it.remove();
      }
    });

    var sameHousingPins = window.data.allPins.filter(function (it) {
      return (filter.housingType !== 'any' ? it.offer.type === filter.housingType : window.data.allPins)
      && (filter.roomsType !== 'any' ? it.offer.rooms === +filter.roomsType : window.data.allPins)
      && (filter.guestType !== 'any' ? it.offer.guests === +filter.guestType : window.data.allPins)
      && (filter.priceType !== 'any' ? getPriceLevel(it.offer.price) === filter.priceType : window.data.allPins);

    });
    window.pin.render(sameHousingPins);
  };

  var removeCard = function () {
    var popup = document.querySelector('.popup');
    if (popup !== null) {
      window.cardDialog.closePopup();
      popup.remove();
    }
  };

  var housingTypeFilter = document.querySelector('#housing-type');
  housingTypeFilter.addEventListener('change', function (evt) {
    removeCard();
    var newHousingType = evt.target.value;
    filter.housingType = newHousingType;
    updatePins();
  });

  var roomsFilter = document.querySelector('#housing-rooms');
  roomsFilter.addEventListener('change', function (evt) {
    removeCard();
    var newRoomsType = evt.target.value;
    filter.roomsType = newRoomsType;
    updatePins();
  });

  var guestFilter = document.querySelector('#housing-guests');
  guestFilter.addEventListener('change', function (evt) {
    removeCard();
    var newGuestType = evt.target.value;
    filter.guestType = newGuestType;
    updatePins();
  });

  var priceFilter = document.querySelector('#housing-price');
  priceFilter.addEventListener('change', function (evt) {
    removeCard();
    var newPriceType = evt.target.value;
    filter.priceType = newPriceType;
    updatePins();
  });
})();
