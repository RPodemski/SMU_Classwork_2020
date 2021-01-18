// YOUR CODE HERE!

var tableData = data;

$(document).ready(function() {
    // from data.js
    // buildTableString(tableData);
    buildFilters();
    buildTable();

    $("#filter-btn").on("click", function(e) {
        e.preventDefault();
        buildTable();
    });
    $("#form").on("submit", function(e) {
        e.preventDefault();
        buildTable();
    });
});

function buildFilters() {
    var unqCountries = [...new Set(tableData.map(x => x.country))];
    unqCountries.forEach(function(val) {
        var nOption = `<option>${val.toUpperCase()}</option>`;
        $('#country').append(nOption);
    });

    var unqStates = [...new Set(tableData.map(x => x.state))];
    unqStates.forEach(function(val) {
        var nOption = `<option>${val.toUpperCase()}</option>`;
        $('#state').append(nOption);
    });
}

function buildTable() {
    var Date = $("#datetime").val();
    var City = $("#city").val();
    var State = $("#state").val();
    var Country = $("#country").val();
    var Shape = $("#shape").val();

    //apply filters
    var filterData = tableData;
    if (Date) {
        filterData = filterData.filter(row => row.datetime === Date);
    }
    if (City) {
        filterData = filterData.filter(row => row.city === City.toLowerCase());
    }
    if (State) {
        filterData = filterData.filter(row => row.state === State.toLowerCase());
    }
    if (Country) {
        filterData = filterData.filter(row => row.country === Country.toLowerCase());
    }
    if (Shape) {
        filterData = filterData.filter(row => row.shape === Shape.toLowerCase());
    }

    // see if we have any data left
    if (filterData.length === 0) {
        alert("No Data Found!");
    }

    buildTableString(filterData);
}

function buildTableString(data) {
    var tbody = $("#ufo-table>tbody");
    tbody.empty();

    data.forEach(function(row) {
        var nRow = "<tr>"
        Object.entries(row).forEach(function([key, value]) {
            nRow += `<td>${value}</td>`
        });

        nRow += "</tr>";
        tbody.append(nRow);
    });
}