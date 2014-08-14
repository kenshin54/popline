/*
  jquery.popline.justify.js 0.1.0-dev

  Version: 0.1.0-dev
  Updated: Aug 11th, 2014

  (c) 2014 by kenshin54
*/
;(function($) {

  var removeRedundantParagraphTag = function(popline, align) {
    if ($.popline.utils.browser.ie) {
      $paragraphs = popline.target.find("p[align=" + align + "]");
      $paragraphs.each(function(i, obj){
        if (obj.childNodes.length === 1 && obj.childNodes[0].nodeType === 3 && !/\S/.test(obj.childNodes[0].nodeValue)) {
          $(obj).remove();
        }
      })
    }
  }

  $.popline.addButton({
    justify: {
      iconClass: "fa fa-align-justify",
      mode: "edit",
      buttons: {
        justifyLeft: {
          iconClass: "fa fa-align-left",
          action: function(event, popline) {
            document.execCommand("JustifyLeft");
            removeRedundantParagraphTag(popline, "left");
          }
        },

        justifyCenter: {
          iconClass: "fa fa-align-center",
          action: function(event, popline) {
            document.execCommand("JustifyCenter");
            removeRedundantParagraphTag(popline, "center");
          }
        },

        justifyRight: {
          iconClass: "fa fa-align-right",
          action: function(event, popline) {
            document.execCommand("JustifyRight");
            removeRedundantParagraphTag(popline, "right");
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
