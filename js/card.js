'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var photoTemplate = cardTemplate.querySelector('.popup__photo');
  var photoList = cardTemplate.querySelector('.popup__photos');

  var renderPhoto = function (photoArray) {
    photoArray.forEach(function (it) {
      var photo = photoTemplate.cloneNode(true);
      photo.src = it;
      photoList.appendChild(photo);
    });
  };
  photoList.textContent = '';

  var allFeatures = cardTemplate.querySelectorAll('.popup__feature');
  var hideFeatures = function () {
    for (var j = 0; j < allFeatures.length; j++) {
      allFeatures[j].classList.add('visually-hidden');
    }
  };
  hideFeatures();

  var showFeatures = function (feature) {
    for (var j = 0; j < FEATURES.length; j++) {
      var featureElement = cardTemplate.querySelector('.popup__feature--' + feature);
      if (window.data.similarPins[j].offer.features[j] === feature) {
        featureElement.textContent = feature;
        featureElement.classList.remove('visually-hidden');
      }
    }
    return featureElement;
  };

  var renderFeatures = function () {
    for (var i = 0; i < FEATURES.length; i++) {
      showFeatures(FEATURES[i]);
    }
  };
  var renderCard = function (similarpin) { // функция отрисовки карточки
    var photos = similarpin.offer.photos.slice(function (array) {
      return array.photos;
    });
    renderFeatures();
    renderPhoto(photos);
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = similarpin.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = similarpin.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = similarpin.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = similarpin.offer.type.name;
    cardElement.querySelector('.popup__text--capacity').textContent = similarpin.offer.rooms + ' комнаты для ' + similarpin.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarpin.offer.checkin + ', выезд до ' + similarpin.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = similarpin.offer.description;
    cardElement.querySelector('.popup__avatar').src = similarpin.author.avatar;
    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };

})();
