var navigation = document.getElementById("navigation");
var calendar = document.getElementById("calendar");
var addColumnView = document.getElementById("addColumnView");
var addTimespanView = document.getElementById("addTimespanView");

var newButton = document.getElementById("newButton");
newButton.onclick = function viewAddColumnView() {
    hideAllElements();
    showElement(addColumnView);
}

var addTimespanButton = document.getElementById("addTimespanButton");
addTimespanButton.onclick = function() {
    hideAllElements();
    showElement(addTimespanView);
}

var addColumnViewButton = document.getElementById("addColumnViewButton");
addColumnViewButton.onclick = function() {viewAddColumnView()};

var openButton = document.getElementById("openButton");
openButton.onclick = function() {
    hideAllElements();
    showElement();
}

var saveButton = document.getElementById("saveButton");
saveButton.onclick = function() {
    hideAllElements();
    showElement();
}

var saveAsButton = document.getElementById("saveAsButton");
saveAsButton.onclick = function() {
    hideAllElements();
    showElement();
}

var preferencesButton = document.getElementById("preferencesButton");
preferencesButton.onclick = function() {
    hideAllElements();
    showElement();
}

hideAllElements();
showMainView();

function hideAllElements() {
    var bodyElements = document.body.getElementsByTagName("div");
    for (var i = 0; i < bodyElements.length - 1; i++) {
        bodyElements[i].style.display = "none";
    }
}

function showMainView() {
    showElement(navigation);
    showElement(calendar);
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element) {
    element.style.display = "block";
}

