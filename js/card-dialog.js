'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    var popup = document.querySelector('.popup');
    if (popup !== null) {
      popup.remove();
    }
    document.addEventListener('keydown', onPopupEscPress);

    var activePin = document.querySelector('.map__pin--active');
    var index = activePin.id;
    mapSection.insertBefore(window.card.renderCard(window.data.allPins[index]), beforeElement);

    var cardClose = document.querySelector('.popup__close');

    cardClose.addEventListener('click', function () {
      closePopup();
    });
    cardClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
  };

  var closePopup = function () {
    var card = document.querySelector('.popup');
    var checkedPin = document.querySelector('.map__pin--active');
    checkedPin.classList.remove('map__pin--active');
    card.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.cardDialog = {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
