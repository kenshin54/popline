/*
  jquery.popline.decoration.js 1.0.0

  Version: 1.0.0
  Updated: Jan 30th, 2023 
  Mons (https://github.com/blyamur)
  (c) 2014 by kenshin54
*/
;(function($) {

  $.popline.addButton({
    bold: {
      iconClass: "fa fa-bold",
      mode: "edit",
      action: function(event) {
        document.execCommand("bold");
      }
    },

    italic: {
      iconClass: "fa fa-italic",
      mode: "edit",
      action: function(event) {
        document.execCommand("italic");
      }
    },

    strikethrough: {
      iconClass: "fa fa-strikethrough",
      mode: "edit",
      action: function(event) {
        document.execCommand("strikethrough");
      }
    },

    underline: {
      iconClass: "fa fa-underline",
      mode: "edit",
      action: function(event) {
        document.execCommand("underline");
      }
    },
    horisontal_line: {
      iconClass: "fa fa-h-square",
      mode: "edit",
      action: function(event) {
        document.execCommand( "insertHTML", false, $.popline.utils.selection().text() + "<hr>" );
      }
    }
  });
})(jQuery);
