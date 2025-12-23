/*
  jquery.popline.social.js 1.0.0

  Version: 1.0.1
  Updated: Jan 23th, 2023 
  Mons (https://github.com/blyamur)
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
    vkcom: {
      iconClass: "fa fa-vk",
      mode: "view",
      action: function(event) {
        var url = "https://www.vk.com/share.php";
        params = [];
        params.push("title=" + encodeURIComponent($.popline.utils.selection().text()));
        params.push("url=" + encodeURIComponent(location.href));
        openWindow(url + "?" + params.join("&"), true);
      }
    },
    okru: {
      iconClass: "fa fa-odnoklassniki",
      mode: "view",
      action: function(event) {
        var url = "https://connect.ok.ru/offer";
        params = [];
        params.push("title=" + encodeURIComponent($.popline.utils.selection().text()));
        params.push("url=" + encodeURIComponent(location.href));
        openWindow(url + "?" + params.join("&"), true);
      }
    },
    facebook: {
      iconClass: "fa fa-facebook",
      mode: "view",
      action: function(event) {
        var url = "https://www.facebook.com/sharer.php";
        params = [];
        params.push("s=100");
        params.push("p[summary]=" + encodeURIComponent($.popline.utils.selection().text()));
        params.push("p[url]=" + encodeURIComponent(location.href));
        openWindow(url + "?" + params.join("&"), true);
      }
    },
    trileru: {
      iconClass: "fa fa-compress",
      mode: "view",
      action: function(event) {
        var url = "https://3le.ru/api/";
        params = [];
		params.push("social=" + encodeURIComponent('3LE'));
        params.push("apik=" + encodeURIComponent('3LE'));
        params.push("url=" + encodeURIComponent(location.href));
        openWindow(url + "?" + params.join("&"), true);
      }
    },
    pinterest: {
      iconClass: "fa fa-pinterest",
      mode: "view",
      action: function(event) {
        var url = "https://pinterest.com/pin/create/button/";
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
