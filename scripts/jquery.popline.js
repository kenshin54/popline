/*
  jquery.popline.js 1.0.0

  Version: 1.0.0

  jquery.popline.js is an open source project, contribute at GitHub:
  https://github.com/kenshin54/popline.js

  (c) 2014 by kenshin54
*/

;(function($) {

  var LEFT = -2, UP = -1, RIGHT = 2, DOWN = 1, NONE = 0, ENTER = 13;

  var isIMEMode = false;
  $(document).on('compositionstart', function(event) {
    isIMEMode = true;
  });
  $(document).on('compositionend', function(event) {
    isIMEMode = false;
  });

  var toggleBox = function(event) {
    if ($.popline.utils.isNull($.popline.current)) {
      return;
    }
    // var isTargetOrChild = $.contains($.popline.current.target.get(0), event.target) || $.popline.current.target.get(0) === event.target;
    // var isBarOrChild = $.contains($.popline.current.bar.get(0), event.target) || $.popline.current.bar.get(0) === event.target;
    // TODO disable check multiple popline check
    if ($.popline.utils.selection().text().length > 0 && !$.popline.current.keepSlientWhenBlankSelected()) {
      var target= $.popline.current.target, bar = $.popline.current.bar;
      if (bar.is(":hidden") || bar.is(":animated")) {
        bar.stop(true, true);
        var pos = Position().mouseup(event);
        $.popline.current.show(pos);
      }
    }else {
      $.popline.hideAllBar();
    }
  };

  var targetEvent = {
    mousedown: function(event) {
      $.popline.current = $(this).data("popline");
      $.popline.hideAllBar();
    },
    keyup: function(event) {
      var popline = $(this).data("popline"), bar = popline.bar;
      if (!isIMEMode && $.popline.utils.selection().text().length > 0 && !popline.keepSlientWhenBlankSelected()) {
        var pos = Position().keyup(event);
        $.popline.current.show(pos);
      }else {
        $.popline.current.hide();
      }
    },
    keydown: function(event) {
      $.popline.current = $(this).data("popline");
      var text = $.popline.utils.selection().text();
      if (!$.popline.utils.isNull(text) && $.trim(text) !== "") {
        var rects = $.popline.utils.selection().range().getClientRects();
        if (rects.length > 0) {
          $(this).data('lastKeyPos', $.popline.boundingRect());
        }
      }
    }
  }

  var Position = function() {
    var target= $.popline.current.target, bar = $.popline.current.bar, positionType = $.popline.current.settings.position;

    var positions = {
      "fixed": {
        mouseup: function(event) {
          var rect = $.popline.utils.selection().range().getBoundingClientRect();
          var left = event.pageX - bar.width() / 2;
          var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          if (left < 0) left = 10;
          var top = scrollTop + rect.top - bar.outerHeight() - 10;
          return {left: left, top: top};
        },
        keyup: function(event) {
          var left = null, top = null;
          var rect = $.popline.getRect(), keyMoved = $.popline.current.isKeyMove();
          if (keyMoved === DOWN || keyMoved === RIGHT) {
            left = rect.right - bar.width() / 2;
          }else if (keyMoved === UP || keyMoved === LEFT) {
            left = rect.left - bar.width() / 2;
          }
          var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
          top = scrollTop + rect.top - bar.outerHeight() - 10;
          return {left: left, top: top};
        }
      },
      "relative": {
        mouseup: function(event) {
          var left = event.pageX - bar.width() / 2;
          if (left < 0) left = 10;
          var top = event.pageY - bar.outerHeight() - parseInt(target.css('font-size')) / 2;
          return {left: left, top: top};
        },
        keyup: function(event) {
          var left = null, top = null;
          var rect = $.popline.getRect(), keyMoved = $.popline.current.isKeyMove();
          if (keyMoved === DOWN || keyMoved === RIGHT) {
            left = rect.right - bar.width() / 2;
            top = $(document).scrollTop() + rect.bottom - bar.outerHeight() - parseInt(target.css("font-size"));
          }else if (keyMoved === UP || keyMoved === LEFT) {
            left = rect.left - bar.width() / 2;
            top = $(document).scrollTop() + rect.top - bar.outerHeight();
          }
          return {left: left, top: top};
        }
      }
    };

    return positions[positionType];
  };

  $.fn.popline = function(options) {

    if ($.popline.utils.browser.ieLtIE8()) {
      return;
    }

    _arguments = arguments;
    this.each(function() {
      if (_arguments.length >= 1 && typeof(_arguments[0]) === "string" && $(this).data("popline")) {
        var func = $(this).data("popline")[_arguments[0]];
        if (typeof(func) === "function") {
          func.apply($(this).data("popline"), Array.prototype.slice.call(_arguments, 1));
        }
      }else if (!$(this).data("popline")) {
        var popline = new $.popline(options, this);
      }
    });

    if (!$(document).data("popline-global-binded")) {
      $(document).mouseup(function(event){
        var _this = this;
        setTimeout((function(){
          toggleBox.call(_this, event);
        }), 1);
      });
      $(document).data("popline-global-binded", true);
    }
  };

  $.popline = function(options, target) {
    this.settings = $.extend(true, {}, $.popline.defaults, options);
    this.setPosition(this.settings.position);
    this.target = $(target);
    this.init();
    $.popline.addInstance(this);
  };

  $.extend($.popline, {

    defaults: {
      zIndex: 9999,
      mode: "edit",
      enable: null,
      disable: null,
      position: "fixed",
      keepSlientWhenBlankSelected: true
    },

    instances: [],

    current: null,

    prototype: {
      init: function() {
        this.bar = $("<ul class='popline' style='z-index:" + this.settings.zIndex + "'></ul>").appendTo("body");
        this.bar.data("popline", this);
        this.target.data("popline", this);
        var me = this;

        var isEnable = function(array, name) {
          if (array === null) {
            return true;
          }
          for (var i = 0, l = array.length; i < l; i++) {
            var v = array[i];
            if (typeof(v) === "string" && name === v) {
              return true;
            }else if ($.isArray(v)) {
              if (isEnable(v, name)) {
                return true;
              }
            }
          }
          return false;
        }


        var isDisable = function(array, name) {
          if (array === null) {
            return false;
          }
          for (var i = 0, l = array.length; i < l; i++) {
            var v = array[i];
            if (typeof(v) === "string" && name === v) {
              return true;
            }else if ($.isArray(v)) {
              if ((v.length === 1 || !$.isArray(v[1])) && isDisable(v, name)) {
                return true;
              }else if (isDisable(v.slice(1), name)) {
                return true;
              }
            }
          }
          return false;
        }

        var makeButtons = function(parent, buttons) {
          for (var name in buttons) {
            var button = buttons[name];
            var mode = $.popline.utils.isNull(button.mode) ? $.popline.defaults.mode : button.mode;

            if (mode !== me.settings.mode
                || !isEnable(this.settings.enable, name)
                || isDisable(this.settings.disable, name)) {
              continue;
            }
            var $button = $("<li><span class='popline-btn'></span></li>");

            $button.addClass("popline-button popline-" + name + "-button")

            if (button.iconClass) {
               $button.children(".popline-btn").append("<a class='" + button.iconClass + "' href='javascript:void(0);'></a>");
            }

            if (button.text) {
              $button.children(".popline-btn").append("<a href='javascript:void(0);'><span class='popline-text popline-background-fix'>" + button.text + "</span></a>");
            }

            if (button.bgColor) {
              $button.css({'background-color': button.bgColor});
              $button.find("span.popline-text").removeClass('popline-background-fix');
            }

            if ($.isFunction(button.beforeShow)) {
              this.beforeShowCallbacks.push({name: name, callback: button.beforeShow});
            }

            if ($.isFunction(button.afterHide)) {
              this.afterHideCallbacks.push({name: name, callback: button.afterHide});
            }

            $button.appendTo(parent);

            if (button.buttons) {
              $subbar = $("<ul class='popline-subbar'></ul>");
              $button.append($subbar);
              makeButtons.call(this, $subbar, button.buttons);
              $button.click(function(event) {
                var _this = this;
                if (!$(this).hasClass("popline-boxed")) {
                  me.switchBar($(this), function() {
                    $(_this).siblings("li").hide().end()
                         .children(".popline-btn").hide().end()
                         .children("ul").show().end()
                  });
                  event.stopPropagation();
                }
              });
            }else if($.isFunction(button.action)) {
              $button.click((function(button) {
                  return function(event) {
                    button.action.call(this, event, me);
                  }
                })(button)
              );
            }
            $button.mousedown(function(event) {
              if (!$(event.target).is("input")) {
                event.preventDefault();
              }
            });
            $button.mouseup(function(event) {
              event.stopPropagation();
            });
          }
        }

        makeButtons.call(this, this.bar, $.popline.buttons);

        this.target.bind(targetEvent);

        this.bar.on("mouseenter", "li", function(event) {
          if (!($(this).hasClass("popline-boxed"))) {
            $(this).addClass("popline-hover");
          }
          event.stopPropagation();
        });
        this.bar.on("mouseleave", "li", function(event) {
          if (!($(this).hasClass("popline-boxed"))) {
            $(this).removeClass("popline-hover");
          }
          event.stopPropagation();
        });
      },

      show: function(options) {
        for (var i = 0, l = this.beforeShowCallbacks.length; i < l; i++) {
          var obj = this.beforeShowCallbacks[i];
          var $button = this.bar.find("li.popline-" + obj.name + "-button");
          obj.callback.call($button, this);
        }
        this.bar.css('top', options.top + "px").css('left', options.left + "px").stop(true, true).fadeIn();
        if ($.popline.utils.browser.ieLtIE9()) {
          $.popline.utils.fixIE8();
        }
      },

      hide: function() {
        var _this = this;
        if (this.bar.is(":visible") && !this.bar.is(":animated")) {
          this.bar.fadeOut(function(){
            _this.bar.find("li").removeClass("popline-boxed").show();
            _this.bar.find(".popline-subbar").hide();
            _this.bar.find(".popline-textfield").hide();
            _this.bar.find(".popline-btn").show();
            for (var i = 0, l = _this.afterHideCallbacks.length; i < l; i++) {
              var obj = _this.afterHideCallbacks[i];
              var $button = _this.bar.find("li.popline-" + obj.name + "-button");
              obj.callback.call($button, _this);
            }
          });
        }
      },

      destroy: function() {
        this.target.unbind(targetEvent);
        this.target.removeData("popline");
        this.target.removeData("lastKeyPos");
        this.bar.remove();
      },

      switchBar: function(button, hideFunc, showFunc) {
        if (typeof(hideFunc) === "function") {
          var _this = this;
          var position = parseInt(_this.bar.css('left')) + _this.bar.width() / 2;
          _this.bar.animate({ opacity: 0, marginTop: -_this.bar.height() + 'px' }, function() {
            hideFunc.call(this);
            button.removeClass('popline-hover').addClass('popline-boxed').show();
            _this.bar.css("margin-top", _this.bar.height() + "px")
            _this.bar.css("left", position - _this.bar.width() / 2 + "px");
            if (typeof(showFunc) === "function") {
              _this.bar.animate({ opacity: 1, marginTop: 0 }, showFunc);
            }else {
              _this.bar.animate({ opacity: 1, marginTop: 0 });
            }
          });
        }
      },

      keepSlientWhenBlankSelected: function() {
        if (this.settings.keepSlientWhenBlankSelected && $.trim($.popline.utils.selection().text()) === ""){
          return true;
        }else {
          return false;
        }
      },

      isKeyMove: function() {
        var lastKeyPos = this.target.data('lastKeyPos');
        currentRect = $.popline.boundingRect();
        if ($.popline.utils.isNull(lastKeyPos)) {
          return null;
        }
        if (currentRect.top === lastKeyPos.top && currentRect.bottom !== lastKeyPos.bottom) {
          return DOWN;
        }
        if (currentRect.bottom === lastKeyPos.bottom && currentRect.top !== lastKeyPos.top) {
          return UP;
        }
        if (currentRect.right !== lastKeyPos.right) {
          return RIGHT;
        }
        if (currentRect.left !== lastKeyPos.left) {
          return LEFT;
        }
        return NONE;
      },

      setPosition: function(position) {
        this.settings.position = position === "relative" ? "relative" : "fixed";
      },

      beforeShowCallbacks: [],

      afterHideCallbacks: []

    },

    hideAllBar: function() {
      for (var i = 0, l = $.popline.instances.length; i < l; i++) {
        $.popline.instances[i].hide();
      }
    },

    addInstance: function(popline){
      $.popline.instances.push(popline);
    },

    boundingRect: function(rects) {
      if ($.popline.utils.isNull(rects)) {
        rects = $.popline.utils.selection().range().getClientRects();
      }
      return {
        top: parseInt(rects[0].top),
        left: parseInt(rects[0].left),
        right: parseInt(rects[rects.length -1].right),
        bottom: parseInt(rects[rects.length - 1].bottom)
      }
    },

    webkitBoundingRect: function() {
      var rects = $.popline.utils.selection().range().getClientRects();
      var wbRects = [];
      for (var i = 0, l = rects.length; i < l; i++) {
        var rect = rects[i];
        if (rect.width === 0) {
          continue;
        }else if ((i === 0 || i === rects.length - 1) && rect.width === 1) {
          continue;
        }else {
          wbRects.push(rect);
        }
      }
      return $.popline.boundingRect(wbRects);
    },

    getRect: function() {
      if ($.popline.utils.browser.firefox || $.popline.utils.browser.opera || $.popline.utils.browser.ie) {
        return $.popline.boundingRect();
      }else if ($.popline.utils.browser.chrome || $.popline.utils.browser.safari) {
        return $.popline.webkitBoundingRect();
      }
    },

    utils: {
      isNull: function(data) {
        if (typeof(data) === "undefined" || data === null) {
          return true;
        }
        return false;
      },
      randomNumber: function() {
        return Math.floor((Math.random() * 10000000) + 1);
      },
      trim: function(string) {
        return string.replace(/^\s+|\s+$/g, '');
      },
      browser: {
        chrome: navigator.userAgent.match(/chrome/i) ? true : false,
        safari: navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) ? true : false,
        firefox: navigator.userAgent.match(/firefox/i) ? true : false,
        opera: navigator.userAgent.match(/opera/i) ? true : false,
        ie: navigator.userAgent.match(/msie|trident\/.*rv:/i) ? true : false,
        webkit: navigator.userAgent.match(/webkit/i) ? true : false,
        ieVersion: function() {
          var rv = -1; // Return value assumes failure.
          var ua = navigator.userAgent;
          var re  = new RegExp("(MSIE |rv:)([0-9]{1,}[\.0-9]{0,})");
          if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$2);
          }
          return rv;
        },
        ieLtIE8: function() {
          return $.popline.utils.browser.ie && $.popline.utils.browser.ieVersion() < 8;
        },
        ieLtIE9: function() {
          return $.popline.utils.browser.ie && $.popline.utils.browser.ieVersion() < 9;
        }
      },
      findNodeWithTags: function(node, tags) {
        if (!$.isArray(tags)) {
          tags = [tags];
        }
        while (node) {
          if (node.nodeType !== 3) {
            var index = $.inArray(node.tagName, tags);
            if (index !== -1) {
              return node;
            }
          }
          node = node.parentNode;
        }
        return null;
      },
      selection: function() {
        if ($.popline.utils.browser.ieLtIE9()) {
          return {
            obj: function() {
              return document.selection;
            },
            range: function() {
              return document.selection.createRange();
            },
            text: function() {
               return document.selection.createRange().text;
            },
            focusNode: function() {
              return document.selection.createRange().parentElement();
            },
            select: function(range) {
              range.select();
            },
            empty: function() {
              document.selection.empty();
            }
          }
        } else {
          return {
            obj: function() {
              return window.getSelection();
            },
            range: function() {
              return window.getSelection().getRangeAt(0);
            },
            text: function() {
               return window.getSelection().toString();
            },
            focusNode: function() {
              return window.getSelection().focusNode;
            },
            select: function(range) {
              window.getSelection().addRange(range);
            },
            empty: function() {
              window.getSelection().removeAllRanges();
            }
          }
        }
      },
      fixIE8: function() {
        var head = document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        style.styleSheet.cssText = ':before,:after{content:none !important';
        head.appendChild(style);
        setTimeout(function(){
            head.removeChild(style);
        }, 0);
      }
    },

    addButton: function(button) {
      $.extend($.popline.buttons, button);
    },

    buttons: {}

  });
})(jQuery);
