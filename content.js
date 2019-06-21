chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            invertColors();
            openNewTab();
        }
    }
);

function openNewTab() {
    chrome.runtime.sendMessage({ "message": "open_new_tab", });
}

function invertColors() {
    var colorProperties = ['color', 'background-color'];
    $('*').each(function () {
        var color = null;
        for (var prop in colorProperties) {
            prop = colorProperties[prop];
            if (!$(this).css(prop)) continue;
            color = new RGBColor($(this).css(prop));
            if (color.ok) {
                $(this).css(prop, 'rgb(' + (255 - color.r) + ',' + (255 - color.g) + ',' + (255 - color.b) + ')');
            }
            color = null;
        }
    });
}