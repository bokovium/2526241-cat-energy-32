(function () {
  document.addEventListener('DOMContentLoaded', function () {

    var sliderList = document.querySelector('.slider__list');
    var photoBefore = document.querySelector('.slider__slide--before');
    var sliderControlToggle = document.querySelector('.slider__control-toggle');
    var beforeToggle = document.querySelector('.slider__toggle--before');
    var afterToggle = document.querySelector('.slider__toggle--after');
    var TABLET_WIDTH = 768;

    /**
     * Обработчик клика по кнопке 'Было'
     * @param {Object} event
     */
    var beforeToggleClickHandler = function (event) {
      event.preventDefault();

      if (window.innerWidth >= TABLET_WIDTH) {
        photoBefore.style.width = "100%";
        sliderControlToggle.style.left = "0";
      } else {
        sliderList.style.transform = 'translate(0%)';
        sliderControlToggle.style.left = '5px';
      }
    };

    /**
     * Обработчик клика по кнопке 'Стало'
     * @param {Object} event
     */
    var afterToggleClickHandler = function (event) {
      event.preventDefault();

      if (window.innerWidth >= TABLET_WIDTH) {
        photoBefore.style.width = "0%";
        sliderControlToggle.style.left = "100%";
      } else {
        sliderList.style.transform = 'translate(-100%)';
        sliderControlToggle.style.left = '40px';
      }
    };

    beforeToggle.addEventListener('click', beforeToggleClickHandler);
    afterToggle.addEventListener('click', afterToggleClickHandler);

    if (window.innerWidth > TABLET_WIDTH) {
      /**
       * Обработчик опускания кнопки мыши
       * @param {Object} event
       */
      var toggleMouseDownHandler = function (event) {
        event.preventDefault();
        sliderControlToggle.style.transition = 'none';

        toggleStartCoords = {
          x: event.clientX
        };

        document.addEventListener('mousemove', toggleMoveHandler);
        document.addEventListener('mouseup', toggleMouseUpHandler);
      };

      /**
       * Обработчик движения мыши
       * @param {object} moveEvent
       */
      var toggleMoveHandler = function (moveEvent) {
        moveEvent.preventDefault();

        var shift = {
          x: toggleStartCoords.x - moveEvent.clientX
        };

        toggleStartCoords = {
          x: moveEvent.clientX
        };

        var currentCoords = {
          x: sliderControlToggle.offsetLeft - shift.x
        };

        if (currentCoords.x < 0) {
          currentCoords.x =  0;
        }

        if (currentCoords.x > 428) {
          currentCoords.x = 428;
        }

        sliderControlToggle.style.left = currentCoords.x + 'px';
        photoBefore.style.width = 'calc(' + (100 - currentCoords.x/428 * 100) + '%)';
      };

      /**
       * Обработчик отпускания кнопки мыши
       * @param {object} upEvent
       */
      var toggleMouseUpHandler = function (upEvent) {
        upEvent.preventDefault();
        sliderControlToggle.style.transition = 'box-shadow 0.3s ease, border 0.1s ease, left 0.4s ease-out';

        document.removeEventListener('mousemove', toggleMoveHandler);
        document.removeEventListener('mouseup', toggleMouseUpHandler);
      };

      sliderControlToggle.addEventListener('mousedown', toggleMouseDownHandler);
    }
  });
}());
