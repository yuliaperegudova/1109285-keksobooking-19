'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var allFeatures = cardTemplate.querySelectorAll('.popup__feature'); // прячем фичи

  var hideFeatures = function () {
    for (var j = 0; j < allFeatures.length; j++) {
      allFeatures[j].classList.add('visually-hidden');
    }
  };

  var renderCard = function (similarpin) { // функция отрисовки карточки
    var photos = similarpin.offer.photos;
    var features = similarpin.offer.features;

    var showFeatures = function (feature) { // создаем новые фичи
      for (var j = 0; j < allFeatures.length; j++) {
        var featureElement = cardTemplate.querySelector('.popup__feature--' + feature);
        if (features[j] === feature) {
          featureElement.textContent = feature;
          featureElement.classList.remove('visually-hidden');
        }
      }
      return featureElement;
    };

    var renderFeatures = function () {
      hideFeatures();
      for (var a = 0; a < features.length; a++) {
        showFeatures(features[a]);
      }
    };
    renderFeatures();
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = similarpin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = similarpin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = similarpin.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = similarpin.offer.type.name;
    cardElement.querySelector('.popup__text--capacity').textContent = similarpin.offer.rooms + ' комнаты для ' + similarpin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarpin.offer.checkin + ', выезд до ' + similarpin.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = similarpin.offer.description;
    cardElement.querySelector('.popup__avatar').src = similarpin.author.avatar;
    var photoList = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');
    photoList.textContent = '';
    for (var i = 0; i < photos.length; i++) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = photos[i];
      photoList.appendChild(photo);
    }
    return cardElement;
  };
  window.card = {
    renderCard: renderCard
  };

})();
