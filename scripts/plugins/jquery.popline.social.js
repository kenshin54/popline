/*
  jquery.popline.social.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
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
        var url = "https://www.google.com/search?q=" + encodeURIComponent(window.getSelection().toString());
        openWindow(url, false);
      }
    },
    twitter: {
      iconClass: "fa fa-twitter",
      mode: "view",
      action: function(event) {
        var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(window.getSelection().toString()+ " - " + location.href);
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
        params.push("p[summary]=" + encodeURIComponent(window.getSelection().toString()));
        params.push("p[url]=" + encodeURIComponent(location.href));
        openWindow(url + "?" + params.join("&"), true);
      }
    },
    pinterest: {
      iconClass: "fa fa-pinterest",
      mode: "view",
      action: function(event) {
        var url = "http://pinterest.com/pin/create/button/";
        var range = window.getSelection().getRangeAt(0);
        var fragment = range.cloneContents();
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
