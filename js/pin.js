'use strict'; // рисуем метки на карте

(function () {
  var list = document.querySelector('.map__pins');

  var pinElementTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderSimilar = function (similarpin) {
    var pinElement = pinElementTemplate.cloneNode(true);
    pinElement.style = 'left: ' + similarpin.location.x + 'px; top: ' + similarpin.location.y + 'px;';
    pinElement.querySelector('img').src = similarpin.author.avatar;
    pinElement.alt = similarpin.offer.title;

    return pinElement;
  };

  // window.backend.load(function (array) {
  //   var fragment = document.createDocumentFragment();
  //   for (var i = 0; i < array.length; i++) {
  //     fragment.appendChild(renderSimilarPin(array[i]));
  //   }
  //   list.appendChild(fragment);
  // });
  window.pin = {
    list: list,
    renderSimilar: renderSimilar,
  };
})();
