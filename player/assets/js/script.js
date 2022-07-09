// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
//
//Global Variable
var teamSearch = $("#search-value").val();
var savedSearches = [];
var searchList = $(".history");


// Local Storage for usuer input

function saveSearch() {

    localStorage.setItem("search-value", teamSearch);
    console.log(saveSearch);
}
function renderPastSearchHistory() {

    var lastSearch = localStorage.getItem("search-value");
    console.log(lastSearch);
}

$("#search-button").on("click", function () {
    teamSearch = $("#search-value").val();

    getTeamOverview(teamSearch);
    $("#search-value").val("");

})

$(".AllTeams").click(function () {

    // clear old data and recall getTeamOverview function
    $("#main-content").empty();
    $(".card-top-main").empty();
    getTeamOverview(teamSearch);

})

//Calls left cell of main container
function getTeamOverview(teamSearch) {
    // setup ajax livescore api parameters.
    const searchTeamInfo = {
        async: true,
        crossDomain: true,
        url:
            "https://api.squiggle.com.au/?q=teams" + ";" + teamSearch,
        method: "GET",
    };

    $.ajax(searchTeamInfo).done(function (response) {
        console.log(response)
        // Clears all old content that may be present within the main content container
        $("#main-content").empty();

        // Grabs team ID to use as the parameter for another AJAX call
        var teamID = response.teams[0].id;

        // Stores the team logo url, the team name, country of origin, and founding date
        var logo = response.teams[0].logo;
        var name = response.teams[0].name;
        var debut = response.teams[0].debut;
        var abbrev = response.teams[0].abbrev;;

        // Dynamically Adds in the div containers and sections for the statistics api

        var bottomRightCard = $("<div>")
            .addClass("card-section small-6 secM")
            .attr("id", "bottom-right-card")
            .appendTo($("#main-content"));

        // Lineup header appended to divR
        var allTeams = $("<p style='font-size: 18px'>")
            .addClass("Current Playing Teams 2022")
            .text("Current Playing Teams 2022")
            .appendTo($(".secM"));

        // object shortcut variable
        var allTeams = response.teams;
        console.log(allTeams)
        // loops 18 times to get the 18 playing teams.
        for (var i = 0; i <= 18; i++) {
            var TeamName = allTeams[i].name;
            var TeamDebut = allTeams[i].debut;
            var TeamShortName = allTeams[i].abbrev;
            var TeamInfoCol = $("<p style='font-size: 12px'>")
                .addClass("lineup-col")
                .text(
                    TeamName + ", " + TeamDebut + ", " + TeamShortName + ""
                )
                .appendTo($(".secM"));
        }

    });
}

// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
//