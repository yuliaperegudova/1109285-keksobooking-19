'use strict';

(function () {
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
  var photos = similarPins[2].offer.photos.slice(function (array) {
    return array.photos;
  });

  window.data = {
    similarPins: similarPins,
    photos: photos
  };
})();
