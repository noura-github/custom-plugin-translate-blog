
/* Developed by Noura Bensaber */

(function($) {

    function __translatetooltip(elem, options) {
        var that = this;
        this.containment = options.containment || $("body");
        this.translateUrl = options.translateUrl;
        this.tooltipClass = options.tooltipClass;
        this.tooltipContent = options.tooltipContent || "";
        this.langContainer = options.langContainer;

        if (this.tooltipContent) {
            $(elem).on("mouseenter", function () {
                that.wordTranslate()
                    .then(function (data) {
                        // Handle the successful translation
                        //console.log("Translation data: ", data);
                        that.tooltipContent = data;
                        that.containment.html(data);
                        that.showTranslation();
                    })
                    .catch(function (error) {
                        // Handle the error
                        console.error("Error occurred: ", error);
                    });
            })

            $(elem).on("mouseleave", function () {
                // Hide the tooltip with a fade-out effect
                that.containment.fadeOut(200);
            });

            this.showTranslation = function() {
                // Position the tooltip near the button
                let offset = $(elem).offset();
                that.containment.css({
                    top: offset.top + $(elem).outerHeight() + 5 + "px",
                    left: offset.left + "px",
                }).fadeIn(200);
            }

            this.wordTranslate = function () {
                let lang = that.langContainer.text();
                if (lang == "None"){
                    lang = "en";
                }

                return new Promise(function (resolve, reject) {
                    $.ajax({
                        type: 'POST',
                        url: that.translateUrl,
                        dataType: 'json', // Expected response type
                        contentType: 'application/json', // Proper content type for JSON data
                        data: JSON.stringify({ 'word': that.tooltipContent, 'lang': lang }),
                        success: function (data) {
                            resolve(data); // Resolve the promise with the response data
                        },
                        error: function (xhr, status, error) {
                            reject({ xhr: xhr, status: status, error: error }); // Reject the promise with error details
                        }
                    });
                });
            };

        }
    }

    $.fn.translateTooltip = function(data) {
    return this.each(function() {
        // Check if the element already has translatetooltip initialized
        if (!$.data(this, "translatetooltip")) {
            // Initialize the translatetooltip and store it in the element's data
            $.data(this, "translatetooltip", new __translatetooltip($(this), data));
        }
    });
};
}(jQuery));