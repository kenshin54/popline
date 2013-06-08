/*
  jquery.popline.justify.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  // Left margin of a blockquote element.
  var el = $("<blockquote></blockquote>");
  var blockQuoteMargin = parseInt(el.hide().appendTo("body").css("marginLeft"));
  el.remove();

  // Returns the number of indented pixels caused by indent command (number of
  // blockquotes * number of indents).
  var rightIndentPixels = function() {
    var node = window.getSelection().baseNode;
    var indents = 0;

    while (node.parentNode.nodeName !== "DIV") {
      if (node.parentNode.nodeName === "BLOCKQUOTE") indents++;
      node = node.parentNode;
    }

    return blockQuoteMargin * indents;
  }

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
            if (rightIndentPixels() + blockQuoteMargin < parseInt($(".editor").css("width"))) {
              document.execCommand("indent");
            }
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
