'use strict'; // рисуем метки на карте

(function () {
  var list = document.querySelector('.map__pins');
  var counter = -1;

  var pinElementTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderSimilar = function (similarpin) {
    var pinElement = pinElementTemplate.cloneNode(true);
    pinElement.style = 'left: ' + similarpin.location.x + 'px; top: ' + similarpin.location.y + 'px;';
    pinElement.querySelector('img').src = similarpin.author.avatar;
    pinElement.alt = similarpin.offer.title;
    pinElement.value = counter += 1;

    pinElement.addEventListener('click', function (evt) {
      evt.currentTarget.classList.add('map__pin--active');
      window.cardDialog.openPopup();
    });

    pinElement.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.cardDialog.openPopup);
    });

    return pinElement;
  };

  var render = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderSimilar(data[i]));
    }
    window.pin.list.appendChild(fragment);
  };

  window.pin = {
    list: list,
    render: render
  };
})();
