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
  newArray = array.slice(0, getRandomInt(0, array.length + 1));
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
          description: 'Уютная квартира для постоянного проживания. Близко к центру города.',
          photos: PHOTOS[i]},
        location: {
          x: x + PIN_WIDTH / 2, y: y + PIN_HEIGHT}
      }
  );
  imgNumber += 1;
}


var mapPinsList = document.querySelector('.map__pins'); // сюда будем вставлять метки
var pinElementTemplate = document.querySelector('#pin') // шаблон, который будем клонировать
    .content
    .querySelector('.map__pin'); // здесь будем заполнять данные

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

var mapSection = document.querySelector('.map'); // сюда вставим карточки
var beforeElement = document.querySelector('.map__filters-container'); // вставить фрагмент перед этим блоком
var cardTemplate = document.querySelector('#card') // шаблон
  .content
  .querySelector('.map__card'); // элемент

var renderCard = function (similarpin) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = similarpin.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = similarpin.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = similarpin.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = similarpin.offer.type.name;
  cardElement.querySelector('.popup__text--capacity').textContent = similarpin.offer.rooms + ' комнаты для ' + similarpin.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarpin.offer.checkin + ', выезд до ' + similarpin.offer.checkout;
  cardElement.querySelectorAll('.popup__feature').textContent = similarpin.offer.features;
  cardElement.querySelector('.popup__photo').src = similarpin.offer.photos;
  cardElement.querySelector('.popup__description').textContent = similarpin.offer.description;
  cardElement.querySelector('.popup__avatar').src = similarpin.author.avatar;

  return cardElement;
};

mapSection.insertBefore(renderCard(similarPins[[0]]), beforeElement); // правильно ли я указала место вставки?

var photoTemplate = document.querySelector('#card') // шаблон
  .content
  .querySelector('.popup__photo'); // элемент;
var photoList = document.querySelector('.popup__photos'); // сюда вставлять

var renderPhoto = function () {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.src = PHOTOS[i];
  return photoElement;
};
for (i = 1; i < PHOTOS.length; i++) {
  photoList.appendChild(renderPhoto());
}


