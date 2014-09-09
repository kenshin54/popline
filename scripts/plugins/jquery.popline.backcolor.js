/*
  jquery.popline.backcolor.js 1.0.0

  Version: 1.0.0
  Updated: Sep 10th, 2014

  (c) 2014 by kenshin54
  */
  ;(function($) {

    var colors = [
    '#FF0000',
    '#FFFF00',
    '#9CBE5A',
    '#00AE52',
    '#07A8EC',
    '#002463',
    '#7349A5',
    '#000000'
    ];

    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function colorToHex(color) {
      if (color.substr(0, 1) === '#') {
        return color;
      }
      var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

      var red = parseInt(digits[2]);
      var green = parseInt(digits[3]);
      var blue = parseInt(digits[4]);

      return '#' + componentToHex(red) + componentToHex(green) + componentToHex(blue);
    };

    var getColorButtons = function (){
      var buttons = {};

      $(colors).each(function (index, color) {
        buttons['color' + index] = {
          bgColor: color,
          text: '&nbsp;',
          action: function (event) {
            document.execCommand('ForeColor', false, colorToHex($(this).css('background-color')));
          }
        }
      });

      return buttons;
    }

    $.popline.addButton({
      color: {
        iconClass: "fa fa-font",
        mode: "edit",
        buttons: getColorButtons()
      }
    });
  })(jQuery);
