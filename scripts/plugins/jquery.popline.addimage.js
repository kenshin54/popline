/*
  jquery.popline.addimage.js 1.0.0

  Version: 1.0.0
  Updated: Jan 31th, 2023

  (c) 2023 by Monseg
*/
;(function($) {

  $.popline.addButton({
    addimage: {
      iconClass: "fa fa-image",
      mode: "edit",
     action: function(event, popline) {
           document.execCommand("insertHTML", false, "<br><br><img src=\""+$.popline.utils.selection().text().trim()+"\"><br><br>" );
      },
    }
  });
})(jQuery);
