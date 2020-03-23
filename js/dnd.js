'use strict';
(function () {
  var PIN_WIDTH = 60;
  var PIN_HEIGHT = 80;

  var MAIN_PIN_DEFOLT = {
    X: 570,
    Y: 375
  };

  var COORDS_LIMIT = {
    minX: 0,
    maxX: 1135,
    minY: 70,
    maxY: 620
  };

  var mainPin = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var getCoords = function () {
    return {
      x: Math.floor(parseInt(mainPin.style.left, 10)),
      y: Math.floor(parseInt(mainPin.style.top, 10))
    };
  };

  var addCoords = function () {
    var coordinates = getCoords();
    var x = coordinates.x + PIN_WIDTH / 2;
    var y = coordinates.y + PIN_HEIGHT;

    if (mainPin.draggable === true) {
      address.value = x + ', ' + y;
    } else {
      address.value = MAIN_PIN_DEFOLT.X + ', ' + MAIN_PIN_DEFOLT.Y;
    }
  };

  addCoords();

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var mapPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = mapPinPosition.y + 'px';
      mainPin.style.left = mapPinPosition.x + 'px';

      if (mapPinPosition.x < COORDS_LIMIT.minX) {
        mainPin.style.left = COORDS_LIMIT.minX + 'px';
      }
      if (mapPinPosition.x > COORDS_LIMIT.maxX) {
        mainPin.style.left = COORDS_LIMIT.maxX + 'px';
      }
      if (mapPinPosition.y < COORDS_LIMIT.minY) {
        mainPin.style.top = COORDS_LIMIT.minY + 'px';
      }
      if (mapPinPosition.y > COORDS_LIMIT.maxY) {
        mainPin.style.top = COORDS_LIMIT.maxY + 'px';
      }

      addCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  window.dnd = {
    addCoords: addCoords
  };

})();
