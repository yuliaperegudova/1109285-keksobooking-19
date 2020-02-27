'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var mapSection = document.querySelector('.map');
  var beforeElement = document.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var photoElementTemplate = cardTemplate.querySelector('.popup__photo');
  var photoList = cardTemplate.querySelector('.popup__photos');

  var renderPhoto = function () {
    var i; // разобраться с переменной
    var photoElement = photoElementTemplate.cloneNode(true);
    photoElement.src = window.data.similarPins[i].offer.photos[i];
    return photoElement;
  };

  var createPhotoFragment = function () {
    var photoFragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.similarPins[i].offer.photos.length; i++) {
      photoFragment.appendChild(renderPhoto());
    }
    return photoFragment;
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
  var renderCard = function (similarpin) {
    renderFeatures();
    photoList.appendChild(createPhotoFragment());
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

  mapSection.insertBefore(renderCard(window.data.similarPins[[0]]), beforeElement);
})();