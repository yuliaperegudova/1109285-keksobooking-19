'use strict';

(function () {

  var TIMEOUT = 10000;
  var URL = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var onError = function () {
    var removeError = function () {
      errorMessage.removeEventListener('click', removeError);
      errorMessage.remove();
    };
    var errorMessage = errorTemplate.cloneNode(true);
    errorMessage.addEventListener('click', function (evt) {
      if (evt.target === evt.currentTarget) {
        removeError();
      }
    });
    var errorBtn = errorMessage.querySelector('.error__button')[0];
    errorBtn.onclick = function () {
      errorMessage.remove();
      var form = document.querySelector('.ad-form');
      upload(new FormData(form), window.backend.onSuccess, window.backend.onError);
    };

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeError);
    });
    document.body.appendChild(errorMessage);
  };

  var onSuccess = function () {
    var removeMessage = function () {
      successMessage.removeEventListener('click', removeMessage);
      successMessage.remove();
    };
    var successMessage = successTemplate.cloneNode(true);
    successMessage.addEventListener('click', function (evt) {
      if (evt.target === evt.currentTarget) {
        removeMessage();
      }
    });

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeMessage);
    });

    document.body.appendChild(successMessage);
  };

  window.backend = {
    load: load,
    upload: upload,
    onSuccess: onSuccess,
    onError: onError

  };
})();
