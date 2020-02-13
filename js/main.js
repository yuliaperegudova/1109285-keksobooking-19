'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TITLES = ['Уютное гнездышко', 'Арт-пространство', 'Eco Village', 'Бест плейс эва'];
var TYPES = [
  {type: 'flat', name: 'Квартира'},
  {type: 'house', name: 'Дом'},
  {type: 'bungalo', name: 'Бунгало'},
  {type: 'palace', name: 'Дворец'},
];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var DESCRIPTION = ['Уютная квартира для постоянного проживания. Близко к центру города.'];

document.querySelector('.map').classList.remove('map--faded');

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

var getRandomArray = function (array, newArray) {
  newArray = array.slice(0, getRandomInt(1, array.length + 1));
  return newArray;
};

var similarPins = [];

shuffleArray(CHECKINS);
shuffleArray(CHECKOUTS);
shuffleArray(TYPES);
shuffleArray(TITLES);
shuffleArray(FEATURES);
shuffleArray(PHOTOS);

var imgNumber = 1;
for (var i = 0; i < 8; i++) {
  var x = getRandomInt(0, 1140 - PIN_WIDTH / 2);
  var y = getRandomInt(130, 630 - PIN_HEIGHT);
  similarPins.push(
      {
        author: {avatar: 'img/avatars/user0' + imgNumber + '.png'},
        offer: {
          title: TITLES[i],
          address: x + ', ' + y,
          price: getRandomInt(3000, 20000),
          type: TYPES[i],
          rooms: getRandomInt(1, 4),
          guests: getRandomInt(1, 8),
          checkin: CHECKINS[i],
          checkout: CHECKOUTS[i],
          features: getRandomArray(FEATURES),
          description: DESCRIPTION[i],
          photos: getRandomArray(PHOTOS)},
        location: {
          x: x + PIN_WIDTH / 2, y: y + PIN_HEIGHT}
      }
  );
  imgNumber += 1;
}

var mapPinsList = document.querySelector('.map__pins');
var pinElementTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var renderSimilarPin = function (similarpin) {
  var pinElement = pinElementTemplate.cloneNode(true);
  pinElement.style = 'left: ' + similarpin.location.x + 'px; top: ' + similarpin.location.y + 'px;';
  pinElement.querySelector('img').src = similarpin.author.avatar;
  pinElement.alt = similarpin.offer.title;

  return pinElement;
};

var createFragment = function (array) {
  var fragment = document.createDocumentFragment();
  for (i = 0; i < array.length; i++) {
    fragment.appendChild(renderSimilarPin(array[i]));
  }
  return fragment;
};
mapPinsList.appendChild(createFragment(similarPins));

var mapSection = document.querySelector('.map');
var beforeElement = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var photoElementTemplate = cardTemplate.querySelector('.popup__photo');
var photoList = cardTemplate.querySelector('.popup__photos');

var renderPhoto = function () {
  var photoElement = photoElementTemplate.cloneNode(true);
  photoElement.src = similarPins[i].offer.photos[i];
  return photoElement;
};

var createPhotoFragment = function () {
  var photoFragment = document.createDocumentFragment();
  for (i = 0; i < PHOTOS.length; i++) {
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
    if (similarPins[j].offer.features[j] === feature) {
      featureElement.textContent = feature;
      featureElement.classList.remove('visually-hidden');
    }
  }
  return featureElement;
};

var renderFeatures = function () {
  for (i = 0; i < FEATURES.length; i++) {
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

mapSection.insertBefore(renderCard(similarPins[[0]]), beforeElement);
