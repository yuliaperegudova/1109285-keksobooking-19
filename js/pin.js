'use strict';

(function () {
  var list = document.querySelector('.map__pins');
  var counter = -1;

  var pinElementTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var renderSimilar = function (similarPin) {
    var pinElement = pinElementTemplate.cloneNode(true);
    pinElement.style = 'left: ' + similarPin.location.x + 'px; top: ' + similarPin.location.y + 'px;';
    pinElement.querySelector('img').src = similarPin.author.avatar;
    pinElement.alt = similarPin.offer.title;
    pinElement.id = counter += 1;

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
    var maxPinAmount = data.length > 5 ? 5 : data.length;
    for (var i = 0; i < maxPinAmount; i++) {
      fragment.appendChild(renderSimilar(data[i]));
    }
    window.pin.list.appendChild(fragment);
  };

  window.pin = {
    list: list,
    render: render,
  };
})();
