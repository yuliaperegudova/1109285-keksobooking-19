'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var TITLES = ['Уютная квартира', 'Стильные апартаменты', 'Эко бунгало', 'Дом для вечеринок'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
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

shuffleArray(CHECK_TIMES);
shuffleArray(TYPES);
shuffleArray(TITLES);
shuffleArray(FEATURES);
shuffleArray(PHOTOS);

var imgNumber = 1;
var createSimilarPinsArray = function () {
  for (var i = 0; i < 8; i++) {
    var x = getRandomInt(0, 1140 - PIN_WIDTH / 2);
    var y = getRandomInt(130, 630 - PIN_HEIGHT);
    similarPins.push(
        {
          author: {avatar: 'img/avatars/user0' + imgNumber + '.png'},
          offer: {
            title: TITLES[i],
            address: x + ', ' + y,
            price: getRandomInt(8000, 100000),
            type: TYPES[i],
            rooms: getRandomInt(1, 5),
            guests: getRandomInt(1, 8),
            checkin: CHECK_TIMES[i],
            checkout: CHECK_TIMES[i],
            features: getRandomArray(FEATURES),
            description: 'описание', // скорее всего, нужно доработать
            photos: getRandomArray(PHOTOS)},
          location: {
            x: x + PIN_WIDTH / 2, y: y + PIN_HEIGHT}
        }
    );
    imgNumber += 1;
  }
};

createSimilarPinsArray();


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
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderSimilarPin(array[i]));
  }
  return fragment;
};
mapPinsList.appendChild(createFragment(similarPins));
