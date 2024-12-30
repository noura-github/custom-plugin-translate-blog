
/* Developed by Noura Bensaber */

(function($) {

    function __translatetooltip(elem, data) {
        var that = this;

    }

    $.fn.translateTooltip = function(data) {
    return this.each(function() {
        // Check if the element already has tooltip data initialized
        if (!$.data(this, "translatetooltip")) {
            // Initialize the tooltip data and store it in the element's data
            $.data(this, "translatetooltip", new __translatetooltip($(this), data));
        }
    });
};
}(jQuery));