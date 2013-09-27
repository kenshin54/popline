/*
  jquery.popline.decoration.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

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
    }

  });
})(jQuery);
