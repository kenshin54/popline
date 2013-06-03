/*
  jquery.popline.justify.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {
  $.popline.addButton({
    justify: {
      iconClass: "icon-align-justify",
      mode: "edit",
      buttons: {
        justifyLeft: {
          iconClass: "icon-align-left",
          action: function(event) {
            document.execCommand("JustifyLeft");
          }
        },

        justifyCenter: {
          iconClass: "icon-align-center",
          action: function(event) {
            document.execCommand("JustifyCenter");
          }
        },

        justifyRight: {
          iconClass: "icon-align-right",
          action: function(event) {
            document.execCommand("JustifyRight");
          }
        },

        indent: {
          iconClass: "icon-indent-right",
          action: function(event) {
            document.execCommand("indent");
          }
        },

        outdent: {
          iconClass: "icon-indent-left",
          action: function(event) {
            document.execCommand("outdent");
          }
        }
      }
    }
  });
})(jQuery);
