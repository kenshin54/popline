/*
  jquery.popline.link.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

  var selectionIsLink = function() {
    var result = false;
    var selection = window.getSelection();
    if ($.popline.utils.browser.webkit) {
      result = $.popline.utils.findNodeWithTags(selection.focusNode, 'A');
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
      $textField.addClass("textfield");
      $textField.attr("placeholder", "http://");

      $textField.keyup(function(event) {
        if (event.which === 13) {
          $(this).blur();
		  if (pattern.test($(this).val())) {
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(button.data('selection'));
            document.execCommand("createlink", false, $(this).val());
		  } else {
            window.getSelection().addRange(button.data('selection'));
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
        if (selectionIsLink()) {
          this.find("i").removeClass("fa fa-link").addClass("fa fa-unlink");
        }else {
          this.find("i").removeClass("fa fa-unlink").addClass("fa fa-link");
        }

        if (!this.data("click-event-binded")) {
          
          this.click(function(event) {
            var $_this = $(this);

            if (selectionIsLink()) {

              document.execCommand("unlink");
              $_this.find("i").removeClass("fa fa-unlink").addClass("fa fa-link");

            }else {

              buildTextField(popline, $_this);

              if (!$_this.hasClass("boxed")) {
                popline.switchBar($_this, function() {
                  $_this.siblings("li").hide().end()
                    .children(":text").show().end()
                }, function() {
                  $_this.children(":text").focus()
                });
                $_this.data('selection', window.getSelection().getRangeAt(0));
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
