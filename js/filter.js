'use strict';

(function () {

  var housingOption;
  var updatePins = function () {

    var sameHousingPins = window.data.allPins.filter(function (it) {
      return it.offer.type === housingOption;
    });
    console.log(sameHousingPins);
    window.pin.render(sameHousingPins);
  };

  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('change', function (evt) {
    var newHousingType = evt.target.value;
    housingOption = newHousingType;
    console.log(newHousingType);
    updatePins();
  });

})();
