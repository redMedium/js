var navigation = document.getElementById("navigation");
var calendarDiv = document.getElementById("calendarDiv"); // the space where the calendar is located
var createCalendarView = document.getElementById("createCalendarView"); // under "New" button, the menu for creating a new calendar
var columnsInfo = document.getElementById("columnsInfo"); // in createCalendar view, list of added column names
var columnValues = []; // array of column names

hideAllDivs();
showElement(navigation);
showElement(calendarDiv);
assignMenuButtons();
assignNewCalendarViewButtons();

function assignMenuButtons() {
    var newButton = document.getElementById("newButton");
    newButton.onclick = function() {
        showThisHideOthers(createCalendarView);
    }
    var openButton = document.getElementById("openButton");
    openButton.onclick = function() {
        loadCalendar();
    }
    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = function() {
        saveCalendar();
    }
    var clearButton = document.getElementById("clearButton");
    clearButton.onclick = function() {
        calendarDiv.innerHTML = "";
    }
}

function assignNewCalendarViewButtons() {
    var backToCalendarButton = document.getElementById("backToCalendarButton");
    backToCalendarButton.onclick = function() { 
        hideAllDivs();
        showElement(navigation);
        showElement(calendarDiv);
    }

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
}

function hideAllDivs() {
    var bodyElements = document.body.getElementsByTagName("div");
    for (var i = 0; i < bodyElements.length; i++) {
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

    for (i = 2021; i < 2023; i++) {
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
                pre = document.createElement("pre");
                button = document.createElement("button");

                textarea.setAttribute("id", "tx_" + i + rowN);
                hideElement(textarea);

                pre.setAttribute("id", "pr_" + i + rowN);

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
    zebraStripeCalendar();
}

var storage = window.localStorage;

function saveCalendar() {
    storage.clear;

    var tableRows = calendarDiv.firstChild.children; // div/table/*
    var headerCells = tableRows[0]; // 1st tr/*
    var rowsInTable = calendarDiv.firstChild.childElementCount;
    var cellsInRow = tableRows[0].childElementCount;
    var colN, cell;
    var headerRow = "";
    var dataRow = "";
    var rowId = 1;
    
    // header tr's structure differs from that of data cells, first cell is ignored
    for (colN = 1; colN < cellsInRow; colN++) {
        cell = headerCells.children[colN].innerHTML;
        headerRow += " ~~~ " + cell; // use ~~~ as cell data separator
    }
    storage.setItem(0, headerRow + " @@@ "); // @@@ as row count indicator (used in loadCalendar() )

    // collect calendar dates and notes
    for (rowN = 1; rowN < rowsInTable; rowN++) {
        for (colN = 0; colN < cellsInRow; colN++) {
            cell = tableRows[rowN].children[colN]; 
            if (colN == 0) {
                dataRow += " ~~~ " + cell.innerHTML; // date is put directly in td
            } else {
                dataRow += " ~~~ " + cell.getElementsByTagName("pre")[0].innerHTML;
            }
            storage.setItem(rowId, dataRow);
        }
        rowId++;
        dataRow = "";
    }
}

function loadCalendar() {
    calendarDiv.innerHTML = "";

    var dataString = "";
    var dataArray = [];
    var keys = Object.keys(storage);
    var rowCount = keys.length - 1;
    var columnCount;

    for (var i = 0; i < keys.length; i++) {
        dataString += storage.getItem(i);
    }
    
    dataArray = dataString.split(" ~~~ ");

    for (var i = 1; i < dataArray.length; i++) {
        if (dataArray[i].includes(" @@@ ")) {
            columnCount = i + 1;
            dataArray[i] = dataArray[i].replace(" @@@ ", "");
            break;
        }
    }

    var tr, th, td, textarea, pre, button;
    var dataIndex = 0;

    var table = document.createElement("table");
    calendarDiv.appendChild(table);

    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        tr = document.createElement("tr");

        for (var columnIndex = 0; columnIndex < columnCount; columnIndex++, dataIndex++) {
            if (rowIndex < 1) {
                th = document.createElement("th");

                if (columnIndex > 0) { // first cell is left empty
                    th.innerHTML = dataArray[dataIndex];
                }
                
                tr.appendChild(th);
            } else {
                td = document.createElement("td");

                if (columnIndex < 1) {
                    td.innerHTML = dataArray[dataIndex];
                    tr.appendChild(td);
                } else {
                    textarea = document.createElement("textarea");
                    pre = document.createElement("pre");
                    button = document.createElement("button");

                    textarea.setAttribute("id", "tx_" + columnIndex + rowIndex);
                    hideElement(textarea);

                    pre.setAttribute("id", "pr_" + columnIndex + rowIndex);
                    pre.innerHTML = dataArray[dataIndex];

                    button.setAttribute("id", "bt_" + columnIndex + rowIndex);
                    button.innerHTML = "Edit";
                    
                    ((pseudoColI, pseudoRowI) => {
                        button.addEventListener("click", function() {
                            textarea = document.getElementById("tx_" + pseudoColI + pseudoRowI);
                            pre = document.getElementById("pr_" + pseudoColI + pseudoRowI);
                            button = document.getElementById("bt_" + pseudoColI + pseudoRowI);

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
                    })(columnIndex, rowIndex);

                    tr.appendChild(td);
                    td.append(textarea, pre, button);
                }
            }        
        }
        table.appendChild(tr);
        columnIndex = 0;
    }
    zebraStripeCalendar();
}

function zebraStripeCalendar() {
    var table = calendarDiv.firstChild;
    var tr;
    var firstCell = table.children[0].children[0];
    var headerCell;
    var dateCell;
    var dataCell;
    var rowCount = table.childElementCount;
    var colCount = table.children[0].childElementCount;

    for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        tr = table.children[rowIndex];

        if (rowIndex == 0) {
            for (var colIndex = 1; colIndex < colCount; colIndex++) {   
                headerCell = tr.children[colIndex];
                headerCell.setAttribute("style", "background-color: rgb(56, 41, 6)");
            }
        } else {
            for (var colIndex = 1; colIndex < colCount; colIndex++) {
                dataCell = tr.children[colIndex];
                
                if (rowIndex % 2 == 0) {
                    dataCell.setAttribute("style", "background-color: rgb(17, 25, 51)");
                } else {
                    dataCell.setAttribute("style", "background-color: rgba(17, 25, 51, 0.6)");
                }
            }
        }

        dateCell = tr.children[0];

        if (rowIndex % 2 == 0) {
            dateCell.setAttribute("style", "background-color: rgb(56, 6, 11)");
        } else {
            dateCell.setAttribute("style", "background-color: rgba(56, 6, 11, 0.6)");
        }
    }

    firstCell.setAttribute("style", "background-color: transparent");
}


// function saveCalendarAsFile(filename) {
//     var calendarData;
//     (() => {calendarData = collectCalendarData();})();
//     writeToFile(filename, calendarData);

//     function collectCalendarData() {
//         var dataArray = [];
//         var colN;
//         var tableRows = calendarDiv.firstChild.children; // div/table/*
//         var headerCells = tableRows[0]; // 1st tr/*
//         var rowsInTable = calendarDiv.firstChild.childElementCount;
//         var cellsInRow = tableRows[0].childElementCount;
//         var cell;

//         for (colN = 1; colN < cellsInRow; colN++) { // header tr's structure differs from that of data cells, first cell is empty
//             dataArray.push(headerCells.children[colN].innerHTML); // collect column headers
//         }

//         for (rowN = 1; rowN < rowsInTable; rowN++) {
//             for (colN = 0; colN < cellsInRow; colN++) {
//                 cell = tableRows[rowN].children[colN];
//                 if (colN < 1) {
//                     dataArray.push(cell.innerHTML); // collect dates
//                 } else {
//                     dataArray.push(cell.getElementsByTagName("pre")[0].innerHTML); // collect calendar notes
//                 }
//             }
//         }
//         return dataArray.join(" ~~~~~~ "); // custom separator, comma is an available character in calendar notes
//     }

//     function writeToFile(filename, data) {
//         var link = document.createElement("a");
//         link.download = filename + ".calendar";
//         link.href = window.URL.createObjectURL(new Blob([data], {type: "text/plain"}));
//         link.click();
//     }
// }

// function loadCalendar() {    HUOM KESKEN!
//     var fileInput;
//     var inputFile;
//     var fileReader;
//     var inputData;
//     var dataArray;

//     fileInput = document.createElement("input");
//     fileInput.setAttribute("type", "file");
//     // fileInput.setAttribute("accept", ".calendar/*,.txt/*,.md/*");
//     fileInput.onclick = function() {
//         inputFile = fileInput.files[0];
// console.log(typeof(inputFile));
//         fileReader = new FileReader();

//         fileReader.readAsText(inputFile);
//         fileReader.onload = function() {
//             inputData = fileReader.result;
//             console.log(inputData);
//         }
//     }
//     fileInput.click();
// }

