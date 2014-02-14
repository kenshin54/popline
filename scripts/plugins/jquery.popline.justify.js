/*
  jquery.popline.justify.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {
  $.popline.addButton({
    justify: {
      iconClass: "fa fa-align-justify",
      mode: "edit",
      buttons: {
        justifyLeft: {
          iconClass: "fa fa-align-left",
          action: function(event) {
            document.execCommand("JustifyLeft");
          }
        },

        justifyCenter: {
          iconClass: "fa fa-align-center",
          action: function(event) {
            document.execCommand("JustifyCenter");
          }
        },

        justifyRight: {
          iconClass: "fa fa-align-right",
          action: function(event) {
            document.execCommand("JustifyRight");
          }
        },

        indent: {
          iconClass: "fa fa-indent",
          action: function(event) {
            document.execCommand("indent");
          }
        },

        outdent: {
          iconClass: "fa fa-dedent",
          action: function(event) {
            document.execCommand("outdent");
          }
        }
      }
    }
  });
})(jQuery);
