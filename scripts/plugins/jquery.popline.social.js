/*
  jquery.popline.social.js 1.0.0

  Version: 1.0.0
  Updated: Sep 10th, 2014

  (c) 2014 by kenshin54
*/
;(function($) {

  var openWindow = function(url, openWithWindow){
    if (openWithWindow) {
      var width = 600, height = 480;
      var left = (screen.width - width)  / 2;
      var top = (screen.height - height) / 2;
      window.open(url, null, "width=" + width + ", height=" + height + ", top=" + top + ", left=" + left);
    }else {
      window.open(url);
    }
  }

  $.popline.addButton({
    search: {
      iconClass: "fa fa-search",
      mode: "view",
      action: function(event) {
        var url = "https://www.google.com/search?q=" + encodeURIComponent($.popline.utils.selection().text());
        openWindow(url, false);
      }
    },
    twitter: {
      iconClass: "fa fa-twitter",
      mode: "view",
      action: function(event) {
        var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent($.popline.utils.selection().text() + " - " + location.href);
        openWindow(url, true);
      }
    },
    facebook: {
      iconClass: "fa fa-facebook",
      mode: "view",
      action: function(event) {
        var url = "http://www.facebook.com/sharer.php";
        params = [];
        params.push("s=100");
        params.push("p[summary]=" + encodeURIComponent($.popline.utils.selection().text()));
        params.push("p[url]=" + encodeURIComponent(location.href));
        openWindow(url + "?" + params.join("&"), true);
      }
    },
    pinterest: {
      iconClass: "fa fa-pinterest",
      mode: "view",
      action: function(event) {
        var url = "http://pinterest.com/pin/create/button/";
        var range = $.popline.utils.selection().range();
        var fragment = null;
        if ($.popline.utils.browser.ieLtIE9()) {
          fragment = range.htmlText;
        } else {
          fragment = range.cloneContents();
        }

        var $p = $("<p />");
        $p.append(fragment);
        var $img = $p.find("img:first");
        params = [];
        params.push("url=" + encodeURIComponent(location.href));
        if ($img.length > 0) {
          params.push("media=" + encodeURIComponent($img.attr("src")));
        }
        openWindow(url + "?" + params.join("&"), true);
      }
    }
  });
})(jQuery);
