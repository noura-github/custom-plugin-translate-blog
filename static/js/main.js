
$(document).ready(function () {

    getSelectedLanguage();
    prepareText();
});

function getSelectedLanguage() {
    $(".dropdown-item").on("click", function (e) {
        // Prevent the default link action
        e.preventDefault();

        // Get the language code
        let selectedLang = $(this).data("lang");

        // Update the display
        $("#selectedLanguage").text(selectedLang);
    });
}

function prepareText() {
    // Select the text container
    let $textContainer = $("#texts_container");

    // Extract text and split into words
    let words = $textContainer.text().split(/\s+/);

    // Clear the original text container
    $textContainer.empty();

    // Wrap each word in a span and append it to the text container
    words.forEach(function (word) {
        let $wordSpan = $("<span>")
            .addClass("tooltip-word")
            .text(word)
            .translateTooltip({
                containment: $("#tooltip_container"), //$("body"),
                translateUrl: "/wordtranslate",
                tooltipClass: "tooltip",
                tooltipContent: word,
                langContainer: $("#selectedLanguage"),
            });

        // Add space between words
        $textContainer.append($wordSpan).append(" ");
    });
}