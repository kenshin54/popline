/*
  jquery.popline.removeformat.js 1.0.0

  Version: 1.0.0
  Updated: Jan 27th, 2023
  (c) 2023 by (c) 2023 by Mons (https://github.com/blyamur)
*/

;(function($) {
  $.popline.addButton({
    removeFormat: {
      iconClass: "fa fa-eraser",
      mode: "edit",
      action: function(event) {
        document.execCommand("removeFormat");
      }
    }
  });
})(jQuery);
