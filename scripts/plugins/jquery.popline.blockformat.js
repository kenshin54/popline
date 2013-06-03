/*
  jquery.popline.blockformat.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  var tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];

  var wrap = function(tag) {
    var range = window.getSelection().getRangeAt(0);
    var anchorNode = window.getSelection().anchorNode, focusNode = window.getSelection().focusNode;
    var parentTag = focusNode.parentNode.tagName;
    var currentTag = null;

    if (focusNode.nodeType !== 3) {
      currentTag = focusNode.tagName;
    }else {
      currentTag = "";
    }

    var currentTagMatched = existsInTags(currentTag) && currentTag === tag;
    var parentTagMatched = existsInTags(parentTag) && parentTag === tag;
    // void tag is a trick because I don't know how to select a plain textNode
    tag = (anchorNode === focusNode && ( currentTagMatched || parentTagMatched )) ? "void" : tag;
    var node = document.createElement(tag);
    var fragment = range.extractContents();
    if (anchorNode !== focusNode) {
      removeEmptyTag(focusNode.parentNode);
    }
    if (currentTagMatched) {
      removeEmptyTag(anchorNode);
    }else {
      removeEmptyTag(anchorNode.parentNode);
    }
    var textNode = document.createTextNode($(fragment).text());
    node.appendChild(textNode);
    range.insertNode(node);
    window.getSelection().selectAllChildren(node);
  }

  var existsInTags = function(tagName) {
    return tags.indexOf(tagName.toLowerCase()) === -1 ? false : true;
  }

  var removeEmptyTag = function(node) {
    if ((existsInTags(node.tagName) || isVoidTag(node.tagName)) && $.popline.utils.trim($(node).text()) === "") {
      $(node).remove();
    }
  }

  var isVoidTag = function(tagName) {
    return tagName.toLowerCase() === "void";
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
