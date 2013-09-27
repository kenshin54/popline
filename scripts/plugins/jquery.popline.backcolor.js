/*
  jquery.popline.backcolor.js 0.0.1

  Version: 0.0.1
  Updated: Sep 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  var colors = [
      'rgba(255, 0, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(156, 190, 90, 1)',
      'rgba(0, 174, 82, 1)',
      'rgba(7, 168, 236, 1)',
      'rgba(0, 36, 99, 1)',
      'rgba(115, 73, 165, 1)',
      'rgba(0, 0, 0, 1)'
  ];

  var getColorButtons = function (){
      var buttons = {};

      $(colors).each(function (index, color) {
        buttons['color' + index] = {
            bgColor: color,
            text: '&nbsp',
            action: function (event) {
                document.execCommand('ForeColor', "false", $(this).css('background-color'));
            }
        }
      });

      return buttons;
  }

  $.popline.addButton({
    color: {
      iconClass: "icon-font",
      mode: "edit",
      buttons: getColorButtons()
    }
  });
})(jQuery);
