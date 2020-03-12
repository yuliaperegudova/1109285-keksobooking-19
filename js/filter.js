'use strict';

(function () {

  var housingType;
  var updatePins = function () {

    var sameHousingPins = window.data.allPins.filter(function (it) {
      return it.offer.type === housingType;
    });
    console.log(sameHousingPins);
    window.pin.render(sameHousingPins);
  };

  var housingTypeFilter = document.querySelector('#housing-type');
  housingTypeFilter.addEventListener('change', function (evt) {
    var newHousingType = evt.target.value;
    housingType = newHousingType;
    updatePins();
    var popup = document.querySelector('.popup');
    if (popup !== null) {
      window.cardDialog.closePopup();
      popup.remove();
    }
  });

})();
