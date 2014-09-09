/*
  jquery.popline.list.js 1.0.0

  Version: 1.0.0
  Updated: Sep 10th, 2014

  (c) 2014 by kenshin54
*/
;(function($) {

  var firefoxCleanupCheck = function(tag) {
    var focusNode = $.popline.utils.selection().focusNode();
    var node = $.popline.utils.findNodeWithTags(focusNode, tag);
    return node ? true : false;
  }

  var firefoxCleanup = function(addPTag) {
    $.popline.current.target.find("br[type=_moz]").parent().remove();
    if (addPTag) {
      document.execCommand("formatblock", false, "P");
      var selection = $.popline.utils.selection().obj();
      if (selection.anchorNode && (node = selection.anchorNode.parentNode.previousSibling) && node.tagName === "BR") {
        node.remove();
      }
      if (selection.focusNode && (node = selection.focusNode.parentNode.nextSibling) && node.tagName === "BR") {
        node.remove();
      }
      addPTag = null;
    }
  }

  $.popline.addButton({
    orderedList: {
      iconClass: "fa fa-list-ol",
      mode: "edit",
      action: function(event) {
        if ($.popline.utils.browser.firefox) {
          var addPTag = firefoxCleanupCheck('OL');
        }
        document.execCommand("InsertOrderedList");
        if ($.popline.utils.browser.firefox) {
          firefoxCleanup(addPTag);
        }
      }
    },

    unOrderedList: {
      iconClass: "fa fa-list-ul",
      mode: "edit",
      action: function(event) {
        if ($.popline.utils.browser.firefox) {
          var addPTag = firefoxCleanupCheck('UL');
        }
        document.execCommand("InsertUnorderedList");
        if ($.popline.utils.browser.firefox) {
          firefoxCleanup(addPTag);
        }
      }
    }
  });
})(jQuery);
