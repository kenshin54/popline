;(function($) {
  $.popline.addButton({
    justify: {
      iconClass: "icon-tint",
      mode: "edit",
      buttons: {
        justifyLeft: {
          iconClass: "icon-tint green",
          action: function(event) {
            document.execCommand('ForeColor', false, '#468858');
          }
        },

        justifyCenter: {
          iconClass: "icon-tint red",
          action: function(event) {
            document.execCommand('ForeColor', false, '#a74240');
          }
        },

        justifyRight: {
          iconClass: "icon-tint grey",
          action: function(event) {
            document.execCommand('ForeColor', false, '#8f8f8f');
          }
        },

        indent: {
          iconClass: "icon-tint orange",
          action: function(event) {
            document.execCommand('ForeColor', false, '#c99a4a');
          }
        },

        outdent: {
          iconClass: "icon-tint blue",
          action: function(event) {
            document.execCommand('ForeColor', false, '#2d6987');
          }
        }
      }
    }
  });
})(jQuery);
