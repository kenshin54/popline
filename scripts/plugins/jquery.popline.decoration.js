/*
  jquery.popline.decoration.js 1.0.0

  Version: 1.0.0
  Updated: Jan 31th, 2023, Mons (https://github.com/blyamur)
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
        document.execCommand('strikethrough', false, null);
      }
    },
    horisontal_line: {
      iconClass: "fa fa-h-square",
      mode: "edit",
      action: function(event) {
        var selectedText = $.popline.utils.selection().text();
        var cleanText = selectedText.replace(/<[^>]*>/g, '');
        document.execCommand("insertHTML", false, cleanText + "<hr>");
      }
    },
    underline: {
      iconClass: "fa fa-underline",
      mode: "edit",
      action: function(event) {
        document.execCommand("underline");
      }
    }

  });
})(jQuery);
