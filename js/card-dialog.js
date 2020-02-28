'use strict';

(function () {
  var card = document.querySelector('.popup');
  var cardClose = document.querySelector('.popup__close');
  var pin = document.querySelector('.map__pin');

  document.addEventListener('click', function (evt) {
    if (evt.target.className === 'map__pin') {
      evt.target.classList.add('map__pin--active');
      openPopup();
    }
  });

  pin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  cardClose.addEventListener('click', function () {
    closePopup();
  });

  cardClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    card.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    card.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

})();
