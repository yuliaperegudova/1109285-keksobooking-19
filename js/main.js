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

// находим рандомное число

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешиваем массивы

var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

// генерируем массив

var getRandomArray = function (array, newArray) {
  newArray = array.slice(0, getRandomInt(1, array.length + 1));
  return newArray;
};

// создаем массив similarPins

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

// рисуем на карте метки

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

// задание 4

var mainPin = document.querySelector('.map__pin--main');
var allFieldset = document.querySelectorAll('fieldset');
var address = document.querySelector('#address');
address.setAttribute('value', '570, 375');


// для неактивного режима

var hideFieldset = function () { // сделать форму неактивной
  for (var j = 0; j < allFieldset.length; j++) {
    allFieldset[j].setAttribute('disabled', 'disabled');
  }
  return hideFieldset;
};

var allFilters = document.querySelectorAll('.map__filter');

var hideFilters = function () { // сделать фильтры неактивными
  for (var j = 0; j < allFilters.length; j++) {
    allFilters[j].setAttribute('disabled', 'disabled');
  }
  return hideFilters;
};

var disabledMode = function () {
  hideFieldset();
  hideFilters();
};

disabledMode();

// для активного режима

var showFieldset = function () { // сделать форму активной
  for (var j = 0; j < allFieldset.length; j++) {
    allFieldset[j].removeAttribute('disabled', 'disabled');
  }
  return showFieldset;
};

var showFilters = function () { // сделать форму активной
  for (var j = 0; j < allFilters.length; j++) {
    allFilters[j].removeAttribute('disabled', 'disabled');
  }
  return showFilters;
};

var activeMode = function () {
  mainPin.draggable = true;
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  mapPinsList.appendChild(createFragment(similarPins));
  showFieldset();
  showFilters();
};

mainPin.addEventListener('mousedown', function () {
  activeMode();
});

// связали тип жилья и минимальную цену

var typeForm = document.querySelector('#type');
var priceInput = document.querySelector('#price');

var onChangeTypeForm = function (evt) {
  if (evt.target.value === 'house') {
    priceInput.placeholder = 5000;
    priceInput.min = 5000;
  } else if (evt.target.value === 'flat') {
    priceInput.placeholder = 1000;
    priceInput.min = 1000;
  } else if (evt.target.value === 'bungalo') {
    priceInput.placeholder = 0;
    priceInput.min = 0;
  } else if (evt.target.value === 'palace') {
    priceInput.placeholder = 10000;
    priceInput.min = 10000;
  }
};

typeForm.addEventListener('change', onChangeTypeForm);

priceInput.addEventListener('input', function () {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Очень мало!');
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Очень много!');
  } else {
    priceInput.setCustomValidity('');
  }
});

// время заезда и время выезда

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var timeOutOptions = timeOut.querySelectorAll('option');

var onTimeInSelect = function (evt) {
  if (evt.target.value === '12:00') {
    timeOutOptions[0].selected = true;
  } else if (evt.target.value === '13:00') {
    timeOutOptions[1].selected = true;
  } else if (evt.target.value === '14:00') {
    timeOutOptions[2].selected = true;
  }
};

timeIn.addEventListener('change', onTimeInSelect);

// связали количество мест и количество комнат

var roomNumberSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');
var capacityOptions = capacitySelect.querySelectorAll('option');

// функция отмены disabled для всех вариантов

var showAllOptions = function () {
  for (var a = 0; a < capacityOptions.length; a++) {
    capacityOptions[a].removeAttribute('disabled', false);
  }
};

// условия для каждой комнаты

var room1 = function () {
  capacityOptions[2].selected = true;
  showAllOptions();
  capacityOptions[0].setAttribute('disabled', true);
  capacityOptions[1].setAttribute('disabled', true);
  capacityOptions[3].setAttribute('disabled', true);
};

var room2 = function () {
  capacityOptions[1].selected = true;
  showAllOptions();
  capacityOptions[0].setAttribute('disabled', true);
  capacityOptions[3].setAttribute('disabled', true);
};

var room3 = function () {
  capacityOptions[0].selected = true;
  showAllOptions();
  capacityOptions[3].setAttribute('disabled', true);
};

var room100 = function () {
  capacityOptions[3].selected = true;
  showAllOptions();
  capacityOptions[0].setAttribute('disabled', true);
  capacityOptions[1].setAttribute('disabled', true);
  capacityOptions[2].setAttribute('disabled', true);
};

// вызов функции, чтобы до события клик все работало

room1();

var onRoomNumberSelect = function (evt) {
  var target = evt.target;
  if (target.value === '1') {
    room1();
  } else if (target.value === '2') {
    room2();
  } else if (target.value === '3') {
    room3();
  } else if (target.value === '100') {
    room100();
  }
};

roomNumberSelect.addEventListener('change', onRoomNumberSelect);

/*

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
  for (i = 0; i < similarPins[i].offer.photos.length; i++) {
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
*/
