'use strict';

// связали тип жилья и минимальную цену
(function () {
  var typeForm = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var onChangeTypeForm = function (evt) { // желательно заменить на switch
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
  var timeInOptions = timeIn.querySelectorAll('option');

  timeIn.addEventListener('change', function (evt) {
    for (var i = 0; i < 3; i++) {
      if (evt.target.value === timeOutOptions[i].value) {
        timeOutOptions[i].selected = true;
      }
    }
  });

  timeOut.addEventListener('change', function (evt) {
    for (var i = 0; i < 3; i++) {
      if (evt.target.value === timeInOptions[i].value) {
        timeInOptions[i].selected = true;
      }
    }
  });

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
    capacityOptions[0].setAttribute('disabled', true); // нужно посмотреть, как пропускать елемент
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
})();
