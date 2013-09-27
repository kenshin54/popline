/*
  jquery.popline.decoration.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  var colors = [
      'rgba(189, 4, 0, 1)',
      'rgba(255, 0, 0, 1)',
      'rgba(255, 204, 0, 1)',
      'rgba(255, 255, 0, 1)',
      'rgba(156, 190, 90, 1)',
      'rgba(0, 174, 82, 1)',
      'rgba(7, 168, 236, 1)',
      'rgba(0, 36, 99, 1)',
      'rgba(115, 73, 165, 1)'
  ];

  var getColorButtons = function (){
      var buttons = {};

      $(colors).each(function (index, color) {
        buttons['color' + index] = {
            bg_color: color,
            text: '&nbsp',
            action: function (event) {
                document.execCommand('BackColor', "false", $(this).css('background-color'));
            }
        }
      });

      return buttons;
  }

  $.popline.addButton({
    bold: {
      iconClass: "icon-bold",
      mode: "edit",
      action: function(event) {
        document.execCommand("bold");
      }
    },

    italic: {
      iconClass: "icon-italic",
      mode: "edit",
      action: function(event) {
        document.execCommand("italic");
      }
    },

    strikethrough: {
      iconClass: "icon-strikethrough",
      mode: "edit",
      action: function(event) {
        document.execCommand("strikethrough");
      }
    },

    underline: {
      iconClass: "icon-underline",
      mode: "edit",
      action: function(event) {
        document.execCommand("underline");
      }
    },

    color: {
      iconClass: "icon-font",
      mode: "edit",
      buttons: getColorButtons()
    }
  });
})(jQuery);
