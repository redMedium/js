var navigation = document.getElementById("navigation");
var calendar = document.getElementById("calendar");

hideAllElements();
showElement(navigation);
showElement(calendar);

var createCalendarView = document.getElementById("createCalendarView");

var newButton = document.getElementById("newButton");
newButton.onclick = function() {
    showThisHideOthers(createCalendarView);
}

var openButton = document.getElementById("openButton");
openButton.onclick = function() {
    showThisHideOthers();
}

var saveButton = document.getElementById("saveButton");
saveButton.onclick = function() {
    showThisHideOthers();
}

var saveAsButton = document.getElementById("saveAsButton");
saveAsButton.onclick = function() {
    showThisHideOthers();
}

var preferencesButton = document.getElementById("preferencesButton");
preferencesButton.onclick = function() {
    showThisHideOthers();
}

var addColumnButton = document.getElementById("addColumnButton");
addColumnButton.onclick = function() {
    let addColumnInput = document.getElementById("addColumnInput");
    let columnsInfo = document.getElementById("columnsInfo");
    if (addColumnInput.value == "" || addColumnInput.value == "&nbsp") {
        addColumnInput.placeholder = "Name your column!";
        return;
    }
    columnsInfo.innerHTML += "<li>" + addColumnInput.value + "</li><br>";
}

function hideAllElements() {
    var bodyElements = document.body.getElementsByTagName("div");
    for (var i = 0; i < bodyElements.length - 1; i++) {
        bodyElements[i].style.display = "none";
    }
}

function hideElement(element) {
    element.style.display = "none";
}

function showElement(element) {
    element.style.display = "block";
}

function showThisHideOthers(element) {
    hideAllElements();
    showElement(element);
}

var fromSelectYear = document.getElementById("fromSelectYear");
var fromSelectMonth = document.getElementById("fromSelectMonth");
var fromSelectDay = document.getElementById("fromSelectDay");
var toSelectYear = document.getElementById("toSelectYear");
var toSelectMonth = document.getElementById("toSelectMonth");
var toSelectDay = document.getElementById("toSelectDay");

var i;
(function createYears() {
    for (i = 1970; i < 2099; i++) {
        fromSelectYear.innerHTML += "<option>" + i + "</option>";
        toSelectYear.innerHTML += "<option>" + i + "</option>";
    }
})();

(function createMonths() {
    for (i = 0; i < 12; i++) {
        fromSelectMonth.innerHTML += "<option>" + (i + 1) + "</option>";
        toSelectMonth.innerHTML += "<option>" + (i + 1) + "</option>";
    }
})();

fromSelectMonth.addEventListener("change", function() {createDays(fromSelectMonth.selectedIndex)});

function createDays(month) {
    if (month == 0) {
    fromSelectDay.innerHTML = "";
    return;
    }

    fromSelectDay.innerHTML = "<option>Select day</option>";
    var howManyDays;
    i = 0;
    if ((month % 2 == 0 && month < 8) || (month % 2 == 1 && month > 8)) {
        howManyDays = 30;
    } else {
        howManyDays = 31;
    }
    for (; i < howManyDays; i++) {
        fromSelectDay.innerHTML += "<option>" + (i + 1) + "</option>";
    }
}