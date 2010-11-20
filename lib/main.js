var tabs = require("tabs");
var widgets = require("widget");
var timer = require("timer");

var widg;

var invalidate = function(tab) {
    if (tab.contentDocument.__ttStart)
        widg.content = Math.ceil(((new Date()).getTime() - tab.contentDocument.__ttStart)/1000) + "s";
    else
        widg.content = "0s";
}

exports.main = function(options, callback) { 

    // add a widget to the widget bar

    widg = widgets.Widget({
        label: "TabTimer Widget",
        content: "0s",
        width: 100
    });
    widgets.add(widg);

    // keep a start time for the active tab and any new tabs

    tabs.activeTab.contentDocument.__ttStart = (new Date()).getTime();
    tabs.onReady.add(function(tab) { tab.contentDocument.__ttStart = (new Date()).getTime(); });

    // update the widget display when a tab is activated, or every second

    tabs.onActivate.add(function(tab) { invalidate(tab); });
    timer.setInterval(function() { invalidate(tabs.activeTab); }, 1000);

};
