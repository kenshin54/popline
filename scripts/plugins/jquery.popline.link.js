/*
  jquery.popline.link.js 1.0.0

  Version: 1.0.0
  Updated: Sep 10th, 2014

  (c) 2014 by kenshin54
  */
  ;(function($) {

    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var protocolPattern = /.+:\/\//

    var selectionIsLink = function() {
      var result = false;
      var focusNode = $.popline.utils.selection().focusNode();
      if ($.popline.utils.browser.webkit || $.popline.utils.browser.ie) {
        result = $.popline.utils.findNodeWithTags(focusNode, 'A');
      }else if ($.popline.utils.browser.firefox) {
        result = firefoxSelectionIsLink();
      }
      return result;
    }

    var firefoxSelectionIsLink = function() {
    //firefox has diffrerent behavior between double click selection and mouse move selection
    //when double click to select link, we need lookup from descendants
    var selection = window.getSelection();
    var range = window.getSelection().getRangeAt(0);
    var fragment = range.cloneContents();
    if (fragment.childNodes.length === 1 && fragment.firstChild.tagName === "A") {
      return true;
    }
    //if not found, lookup from ancestries
    return $.popline.utils.findNodeWithTags(selection.focusNode, 'A');
  }

  var buildTextField = function(popline, button) {
    if (button.find(":text").length === 0) {
      var $textField = $("<input type='text' />");
      $textField.addClass("popline-textfield");
      $textField.attr("placeholder", "http://");

      $textField.keyup(function(event) {
        if (event.which === 13) {
          $(this).blur();
          text = $(this).val();
          if (!protocolPattern.test(text)) {
            text = "http://" + text;
          }
          if (pattern.test(text)) {
            $.popline.utils.selection().empty();
            $.popline.utils.selection().select(button.data('selection'));
            document.execCommand("createlink", false, text);
          } else {
            $.popline.utils.selection().select(button.data('selection'));
          }
          popline.hide();
        }
      });

      $textField.mouseup(function(event) {
        event.stopPropagation();
      });
      button.append($textField);
    }
  }

  $.popline.addButton({
    link: {
      iconClass: "fa fa-link",
      mode: "edit",
      beforeShow: function(popline) {
        var $a = this.find("a");
        if (selectionIsLink()) {
          $a.removeClass("fa fa-link").addClass("fa fa-unlink");
        }else {
          $a.removeClass("fa fa-unlink").addClass("fa fa-link");
        }

        if (!this.data("click-event-binded")) {

          this.click(function(event) {
            var $_this = $(this);

            if (selectionIsLink()) {

              document.execCommand("unlink");
              $_this.find("a").removeClass("fa fa-unlink").addClass("fa fa-link");

            }else {

              buildTextField(popline, $_this);

              if (!$_this.hasClass("boxed")) {
                $_this.data('selection', $.popline.utils.selection().range());
                $.popline.utils.selection().empty();
                popline.switchBar($_this, function() {
                  $_this.siblings("li").hide().end()
                  .children(":text").show().end();
                }, function() {
                  $_this.children(":text").focus();
                });
                event.stopPropagation();
              }
            }
          });

          this.data("click-event-binded", true);
        }

      },
      afterHide: function() {
        this.find(":text").val('');
      }
    }
  });
})(jQuery);
