describe('popline editor', function() {

    var $editor, $popline;

    beforeEach(function() {
        $('<div class="editor" contenteditable="true">Text goes here</div><div class="not-editor"></div>').appendTo('body');
        $editor = $('.editor');
        $popline = $('.popline');
    });

    afterEach(function () {
        $editor.popline('destroy');
        $editor.remove();
    });

    it('should initially have no popline editor on the page', function() {
        expect($popline.length).toEqual(0);
    });

    describe('after initializing the popline editor', function() {

        beforeEach(function() {
            $editor.popline();
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
});






























