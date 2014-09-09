/*
  jquery.popline.blockformat.js 1.0.0

  Version: 1.0.0
  Updated: Sep 10th, 2014

  (c) 2014 by kenshin54
*/
;(function($) {

  var tags = ["P", "H1", "H2", "H3", "H4", "H5", "H6", "VOID"];

  var voidClass = "popline-el-void";

  // in order to support `undo format` feature
  // we don't use document.execCommand('formatblock', false, "<H1>") directly
  // instead, use some trick to do this

  var commonWrap = function(tag) {
    var range = window.getSelection().getRangeAt(0);
    var focusNode = window.getSelection().focusNode;
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

  var ieWrap = function(tag) {
    var text = $.popline.utils.selection().text();
    var range = $.popline.utils.selection().range();
    var matchedNode = $.popline.utils.findNodeWithTags(range.parentElement(), tags);
    tag = matchedNode && matchedNode.tagName === tag ? "SPAN" : tag;
    var id = "popline-el-" + $.popline.utils.randomNumber();
    var clazz = "";
    // if brower lt IE9, we can not use a pseudo tag(VOID) to mark dom
    // so we use span tag and a special class to mark it
    if (tag === "SPAN") {
      clazz = " class='" + voidClass + "'";
    }
    if ($.popline.utils.isNull(matchedNode) && $(range.parentElement()).hasClass(voidClass)) {
      matchedNode = range.parentElement();
    }
    if (matchedNode && $(matchedNode).text() === text) {
      $(matchedNode).remove();
    }
    range.pasteHTML("<" + tag + " id='" + id + "'" + clazz + ">" + text + "</" + tag + ">");
    var $node = $("#" + id);
    range.moveToElementText($node[0]);
    range.select();
    $node.removeAttr("id")
  }

  var wrap = function(tag) {
    if ($.popline.utils.browser.ieLtIE9()) {
      ieWrap(tag);
    } else {
      commonWrap(tag);
    }

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
        popline.target.find("void, ." + voidClass).contents().unwrap();
      }
    }
  });

})(jQuery);
