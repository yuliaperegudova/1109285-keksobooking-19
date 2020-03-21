'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_X = 0;
  var MAX_X = 1170;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var mainPin = document.querySelector('.map__pin--main');

  var getCoords = function (xCorrection, yCorrection) {
    var x = parseInt(mainPin.style.left, 10);
    var y = parseInt(mainPin.style.top, 10);
    x += xCorrection;
    y += yCorrection;
    var address = document.querySelector('#address');
    address.setAttribute('value', Math.round(x) + ', ' + Math.round(y));
  };

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

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (parseInt(mainPin.style.left, 10) + PIN_WIDTH / 2 >= MAX_X) {
        mainPin.style.left = (MAX_X - PIN_WIDTH / 2) + 'px';
      } else if (parseInt(mainPin.style.left, 10) + PIN_WIDTH / 2 <= MIN_X) {
        mainPin.style.left = (MIN_X - PIN_WIDTH / 2) + 'px';
      }

      if (parseInt(mainPin.style.top, 10) > MAX_Y) {
        mainPin.style.top = MAX_Y + 'px';
      } else if (parseInt(mainPin.style.top, 10) < MIN_Y) {
        mainPin.style.top = MIN_Y + 'px';
      }

      getCoords(PIN_WIDTH / 2, PIN_HEIGHT / 2);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

  });

})();
