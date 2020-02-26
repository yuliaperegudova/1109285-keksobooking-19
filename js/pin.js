'use strict'; // рисуем метки на карте

(function () {
  var list = document.querySelector('.map__pins');

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
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderSimilarPin(array[i]));
    }
    return fragment;
  };
  window.pin = {
    list: list,
    createFragment: createFragment
  };
})();


