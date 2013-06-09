/*
  jquery.popline.blockformat.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  var tags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "VOID"];

  var wrap = function(tag) {
    var range = window.getSelection().getRangeAt(0);
    var anchorNode = window.getSelection().anchorNode, focusNode = window.getSelection().focusNode;
    var matchedNode = $.popline.utils.findNodeWithTags(focusNode, tags);
    tag = matchedNode && matchedNode.tagName === tag ? "VOID" : tag;
    var node = document.createElement(tag);
    var fragment = range.extractContents();

    removeEmptyTag(matchedNode);

    var textNode = document.createTextNode($(fragment).text());
    node.appendChild(textNode);

    range.insertNode(node);
    window.getSelection().selectAllChildren(node);
  }

  var removeEmptyTag = function(node) {
    if ($.popline.utils.trim($(node).text()) === "") {
      $(node).remove();
    }
  }

  $.popline.addButton({
    blockFormat: {
      text: "H",
      mode: "edit",
      buttons: {
        normal: {
          text: "P",
          textClass: "lighter",
          action: function(event) {
            wrap("P");
          }
        },
        h1: {
          text: "H1",
          action: function(event) {
            wrap("H1");
          }
        },
        h2: {
          text: "H2",
          action: function(event) {
            wrap("H2");
          }
        },
        h3: {
          text: "H3",
          action: function(event) {
            wrap("H3");
          }
        },
        h4: {
          text: "H4",
          action: function(event) {
            wrap("H4");
          }
        },
        h5: {
          text: "H5",
          action: function(event) {
            wrap("H5");
          }
        },
        h6: {
          text: "H6",
          action: function(event) {
            wrap("H6");
          }
        }
      },
      afterHide: function(popline){
        popline.target.find("void").contents().unwrap();
      }
    }
  });

})(jQuery);
