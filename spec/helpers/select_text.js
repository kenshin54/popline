jQuery.fn.selectText = function(){
    var element = $(this)[0];
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    return this;
};