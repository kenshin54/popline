describe('popline editor', function() {

    var $editor, $popline;

    beforeEach(function() {
        $('<div class="editor" contenteditable="true">Text goes here</div><div class="not-editor"></div>').appendTo('body');

        $editor = $('.editor');
        console.log($editor.popline());
        $popline = $('.popline');
    });

    afterEach(function () {
        $editor.popline('destroy');
        $editor.remove();
    });

    it('should add the popline editor to the page', function() {
        expect($popline.length).toBeGreaterThan(0);
    });

    it('should show popline editor after text has been selected', function() {
        expect($popline.is(':visible')).toBeFalsy();

        synchronize(function() {
            $editor.selectText();
            $editor.mousedown();
            $editor.mouseup();
        });

        expect($popline.is(':visible')).toBeTruthy();
    });

});

































jQuery.fn.selectText = function(){
    var element = $(this)[0];
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    return this;
};

function synchronize(callback) {

    var current_timeout_implementation = this.setTimeout;

    this.setTimeout = function(callback) {
        callback();
    };

    try {
        callback();
    }
    finally {
        this.setTimeout = current_timeout_implementation
    }
}