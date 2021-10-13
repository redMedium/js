var navigation = document.getElementById("navigation");
var calendarDiv = document.getElementById("calendarDiv");

hideAllDivs();
showElement(navigation);
showElement(calendarDiv);

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
    
}

var saveAsButton = document.getElementById("saveAsButton");
saveAsButton.onclick = function() {
    saveCalendar("MyCalendar");
}

var preferencesButton = document.getElementById("preferencesButton");
preferencesButton.onclick = function() {
    showThisHideOthers();
}

var columnsInfo = document.getElementById("columnsInfo");
var columnValues = [];

var addColumnButton = document.getElementById("addColumnButton");
addColumnButton.onclick = function() {
    let addColumnInput = document.getElementById("addColumnInput");
    if (addColumnInput.value == "" || addColumnInput.value == " ") {
        addColumnInput.value = "";
        addColumnInput.placeholder = "Name your column!";
        return;
    }
    columnsInfo.innerHTML += "<li>" + addColumnInput.value + "</li><br>";
    columnValues.push(addColumnInput.value);
    addColumnInput.value = "";
}

var removeColumnsButton = document.getElementById("removeColumnsButton");
removeColumnsButton.onclick = function() {
    columnsInfo.innerHTML = "";
}

function hideAllDivs() {
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
    hideAllDivs();
    showElement(element);
}

var fromSelectYear = document.getElementById("fromSelectYear");
var fromSelectMonth = document.getElementById("fromSelectMonth");
var fromSelectDay = document.getElementById("fromSelectDay");
var toSelectYear = document.getElementById("toSelectYear");
var toSelectMonth = document.getElementById("toSelectMonth");
var toSelectDay = document.getElementById("toSelectDay");

createDateOptions(fromSelectYear, fromSelectMonth, fromSelectDay);
createDateOptions(toSelectYear, toSelectMonth, toSelectDay);

function createDateOptions(selectYear, selectMonth, selectDay) {
    var selectedYearValue = 0;
    var selectedMonthValue = 0;
    var februaryDays = 0;
    var i;

    for (i = 1999; i < 2100; i++) {
        selectYear.innerHTML += "<option>" + i + "</option>";
    }

    for (i = 1; i < 13; i++) {
        selectMonth.innerHTML += "<option>" + i + "</option>";
    }

    selectDay.style.display = "none";

    selectYear.addEventListener(
        "change", function() {
            i = selectYear.selectedIndex;
            if (i > 0) {
                selectedYearValue = selectYear.options[i].innerHTML;
                checkLeapYear(selectedYearValue);
                createDaysCondition();
            }
        });

    selectMonth.addEventListener(
        "change", function() {
            selectedMonthValue = selectMonth.selectedIndex;
            createDaysCondition();
        });

    function createDaysCondition() {
        if (selectedYearValue != 0 && selectedMonthValue != 0) {
            selectDay.style.display = "inline";
            createDays(selectedMonthValue);
        } else {
            selectDay.style.display = "none";
        }
    }

    function createDays(month) {
        selectDay.innerHTML = "<option>Select day</option>";
        var howManyDays;
        if ((month % 2 == 0 && month < 8) || (month % 2 == 1 && month > 8)) {
            howManyDays = 30;
        } else {
            howManyDays = 31;   
        } 
        
        if (month == 2) {
            howManyDays = februaryDays;
        }

        for (i = 0; i < howManyDays; i++) {
            selectDay.innerHTML += "<option>" + (i + 1) + "</option>";
        }
    }

    function checkLeapYear(year) {
        if (year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)) {
            februaryDays = 28;
        } else {
            februaryDays = 29;
        }
    }
}

var rowN = 0; // Global row number indicator used in createTextCells() and collectCalendarData()
var createCalendarButton = document.getElementById("createCalendarButton");
createCalendarButton.onclick = function() {
    calendarDiv.innerHTML = ""; // Empty calendar if previous entries have been made

    if (fromDate > toDate) {
        window.alert("Calendar starting date must be prior to its ending date");
        return;
    }

    if (fromDate == "Invalid Date" || toDate == "Invalid Date") {
        window.alert("The timespan must be defined by selecting starting and ending year, month and day");
        return;
    }

    var fromDate = new Date(fromSelectYear.value, fromSelectMonth.value - 1, fromSelectDay.value);
    var toDate = new Date(toSelectYear.value, toSelectMonth.value - 1, toSelectDay.value);
    var i;
    var calendarTable = document.createElement("table");
    calendarDiv.innerHTML = "";
    calendarDiv.appendChild(calendarTable);
    
    hideAllDivs();
    showElement(navigation);    
    showElement(calendarDiv);
    createHeaderCells();
    createDataCells();
    
    // Empty fields in case of re-entry to createNewCalendarView
    addColumnInput.innerHTML = "";
    columnsInfo.innerHTML = "";
    fromSelectYear.value = "Select year";
    fromSelectMonth.value = "Select month";
    hideElement(fromSelectDay);
    toSelectYear.value = "Select year";
    toSelectMonth.value = "Select month";
    hideElement(toSelectDay);

    function createHeaderCells() {
        var trHeaders = document.createElement("tr");
        var thEmpty = document.createElement("th");
        var thValue;

        trHeaders.appendChild(thEmpty);
        calendarTable.appendChild(trHeaders);

        for (i = 0; i < columnValues.length; i++) {
            thValue = document.createElement("th");
            thValue.innerHTML = columnValues[i];
            trHeaders.appendChild(thValue);
        }
    }
    
    function createDataCells() {
        for (incrementDate = fromDate; 
        incrementDate <= toDate; 
        incrementDate.setDate(incrementDate.getDate() + 1)) {
            createDateCell();
            createTextCells();
        }

        rowN = 0; // set default value for reuse

        function createDateCell() {
            var formattedDate = 
                incrementDate.getDate() + "." + 
                (incrementDate.getMonth() + 1) + "." + 
                incrementDate.getFullYear();
                
            var tdDate = document.createElement("td");
            trCells = document.createElement("tr");
            tdDate.innerHTML = formattedDate;
            trCells.appendChild(tdDate);
            calendarTable.appendChild(trCells);
        }

        function createTextCells() {
            var tdText, textarea, pre, button;

            for (i = 0; i < columnValues.length; i++) {
                tdText = document.createElement("td");

                textarea = document.createElement("textarea");
                textarea.setAttribute("id", "tx_" + i + rowN);
                hideElement(textarea);

                pre = document.createElement("pre");
                pre.setAttribute("id", "pr_" + i + rowN);

                button = document.createElement("button");
                button.setAttribute("id", "bt_" + i + rowN);
                button.innerHTML = "Edit";
                ((pseudoI, pseudoRowN) => {
                    button.addEventListener("click", function() {
                        textarea = document.getElementById("tx_" + pseudoI + pseudoRowN);
                        pre = document.getElementById("pr_" + pseudoI + pseudoRowN);
                        button = document.getElementById("bt_" + pseudoI + pseudoRowN);

                        if (button.innerHTML != "Save changes") {
                            textarea.value = pre.innerHTML;
                            button.innerHTML = "Save changes";
                            hideElement(pre);
                            showElement(textarea);
                        } else {
                            pre.innerHTML = textarea.value;
                            textarea.value = "";
                            button.innerHTML = "Edit";
                            hideElement(textarea);
                            showElement(pre);
                        }
                    });
                })(i, rowN);

                trCells.appendChild(tdText);
                tdText.append(textarea, pre, button);

            }
            rowN++;
        }
    }
}


function saveCalendar(filename) {
    var calendarData;
    (() => {calendarData = collectCalendarData();})();
    writeToFile(filename, calendarData);

    function collectCalendarData() {
        var dataArray = [];
        var colN;
        var tableRows = calendarDiv.firstChild.children; // div/table/*
        var headerCells = tableRows[0]; // 1st tr/*
        var rowsInTable = calendarDiv.firstChild.childElementCount;
        var cellsInRow = tableRows[0].childElementCount;
        var cell;

        for (colN = 1; colN < cellsInRow; colN++) { // header tr's structure differs from that of data cells, first cell is empty
            dataArray.push(headerCells.children[colN].innerHTML); // collect column headers
        }

        for (rowN = 1; rowN < rowsInTable; rowN++) {
            for (colN = 0; colN < cellsInRow; colN++) {
                cell = tableRows[rowN].children[colN];
                if (colN < 1) {
                    dataArray.push(cell.innerHTML); // collect dates
                } else {
                    dataArray.push(cell.getElementsByTagName("pre")[0].innerHTML); // collect calendar notes
                }
            }
        }
        return dataArray.join(" ~~ ");
    }

    function writeToFile(filename, data) {
        var link = document.createElement("a");
        link.download = filename + ".calendar";
        link.href = window.URL.createObjectURL(new Blob([data], {type: "text/plain"}));
        link.click();
    }
}
