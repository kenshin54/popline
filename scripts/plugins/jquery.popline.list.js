/*
  jquery.popline.list.js 0.1.0-dev

  Version: 0.1.0-dev
  Updated: Aug 11th, 2014

  (c) 2014 by kenshin54
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
