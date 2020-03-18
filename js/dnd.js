'use strict';
(function () {
  var MIN_LEFT = 150;
  var MAX_RIGHT = 1280;
  var MIN_TOP = 150;
  var MAX_BOTTOM = 630;

  var mainPin = document.querySelector('.map__pin--main');

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

      if (startCoords.x < MIN_LEFT || startCoords.x > MAX_RIGHT) {
        shift.x = 0;
      }

      if (startCoords.y < MIN_TOP || startCoords.y > MAX_BOTTOM) {
        shift.y = 0;
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    var address = document.querySelector('#address');
    address.setAttribute('value', startCoords.x + ' , ' + startCoords.y);

  });

})();
