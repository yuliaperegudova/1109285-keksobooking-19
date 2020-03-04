'use strict';

(function () {
  var pin = document.querySelector('.map__pin');
  var mapSection = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  // нужно добавить обработчик на каждую метку с помощью цикла

  document.addEventListener('click', function (evt) {
    if (evt.target.className === 'map__pin') {
      evt.target.classList.add('map__pin--active');
      openPopup();
    }
  });

  pin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  var openPopup = function () { // открыть и закрыть карточку
    document.addEventListener('keydown', onPopupEscPress);

    window.backend.load(function (similarpin) { // отрисовка карточки
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 1; i++) {
        fragment.appendChild(window.card.renderCard(similarpin[i]));
      }
      mapSection.insertBefore(fragment, beforeElement);

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
    document.removeEventListener('keydown', onPopupEscPress);
  };

})();
