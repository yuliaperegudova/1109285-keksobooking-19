'use strict';

(function () {
  var mapSection = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () { // открыть и закрыть карточку
    document.addEventListener('keydown', onPopupEscPress);

    window.backend.load(function (similarpin) { // отрисовка карточки
      var activePin = document.querySelector('.map__pin--active');
      var index = activePin.value;
      mapSection.insertBefore(window.card.renderCard(similarpin[index]), beforeElement);

      var cardClose = document.querySelector('.popup__close');

      cardClose.addEventListener('click', function () {
        closePopup();
      });
      cardClose.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, closePopup);
      });
    });
  };

  var closePopup = function () {
    var card = document.querySelector('.popup');
    card.remove();
    var checkedPin = document.querySelector('.map__pin--active');
    checkedPin.classList.remove('map__pin--active');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.cardDialog = {
    openPopup: openPopup,
  };

})();
