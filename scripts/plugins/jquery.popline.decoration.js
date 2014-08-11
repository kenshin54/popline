/*
  jquery.popline.decoration.js 0.1.0-dev

  Version: 0.1.0-dev
  Updated: Aug 11th, 2014

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
    }

  });
})(jQuery);
