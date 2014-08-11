/*
  jquery.popline.blockquote.js 0.1.0-dev

  Version: 0.1.0-dev
  Updated: Aug 11th, 2014

  (c) 2014 by kenshin54
*/
;(function($) {

  var quoteUtils = function() {
    if ($.popline.utils.browser.ie) {
      return {
        quote: function() {
          document.execCommand('indent');
        },
        unquote: function() {
          document.execCommand('outdent');
        }
      }
    } else {
      return {
        quote: function() {
          document.execCommand('formatblock', false, 'BLOCKQUOTE');
        },
        unquote: function() {
          document.execCommand('formatblock', false, 'P');
        }
      }
    }
  }

  $.popline.addButton({
    blockquote: {
      iconClass: "fa fa-quote-left",
      mode: "edit",
      action: function(event, popline) {
        var focusNode = $.popline.utils.selection().focusNode();
        var node = $.popline.utils.findNodeWithTags(focusNode, 'BLOCKQUOTE');
        if (node) {
          quoteUtils().unquote();
        }else {
          quoteUtils().quote();
        }
      }
    }
  });
})(jQuery);
