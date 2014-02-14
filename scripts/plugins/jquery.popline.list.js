/*
  jquery.popline.list.js 0.0.1

  Version: 0.0.1
  Updated: May 18th, 2013

  (c) 2013 by kenshin54
*/
;(function($) {

  $.popline.addButton({
    orderedList: {
      iconClass: "fa fa-list-ol",
      mode: "edit",
      action: function(event) {
        document.execCommand("InsertOrderedList");
      }
    },

    unOrderedList: {
      iconClass: "fa fa-list-ul",
      mode: "edit",
      action: function(event) {
        document.execCommand("InsertUnorderedList");
      }
    }
  });
})(jQuery);
