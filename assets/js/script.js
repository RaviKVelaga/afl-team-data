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
});

$(".AllTeams").click(function () {
    // clear old data and recall getTeamOverview function
    $("#main-content").empty();
    $(".card-top-main").empty();
    getTeamOverview(teamSearch);
});

$(".CurrentLadder").click(function () {

    $("#main-content").empty();
    $(".card-top-main").empty();
    getTeamStandings();

})

//Calls left cell of main container
function getTeamStandings() {

    const StandingInfo = {
        async: true,
        crossDomain: true,
        url:
            "https://api.squiggle.com.au/?q=standings",
        method: "GET",
    };

    $.ajax(StandingInfo).done(function (response) {
        //console.log(response)
        // Clears all old content that may be present within the main content container
        $("#main-content").empty();

        // Dynamically Adds in the div containers and sections for the all-team search api

        var RightCard = $("<div>")
            .addClass("card-section small-6 secM")
            .attr("id", "bottom-right-card")
            .appendTo($("#main-content"));

        var StandingTeams = $("<p style='font-size: 18px'>")
            .addClass("Current Ladder for Playing Teams 2022")
            .text("Current Ladder for Playing Teams 2022")
            .appendTo($(".secM"));

        // object shortcut variable
        var currentStandings = response.standings;
        console.log(currentStandings)

        // loops 18 times to get the 18 playing teams.
        for (var i = 0; i < 18; i++) {
            var TeamName = 'Team Name :' + currentStandings[i].name + ' ';
            var TeamRank = 'Rank :' + currentStandings[i].rank + ' ';
            var wins = 'wins :' + currentStandings[i].wins + ' ';

            var TeamSatndingCol = $("<p style='font-size: 12px'>")
                .addClass("lineup-col")
                .text(
                    TeamName + "," + TeamRank + ", " + wins + " "
                )
                .appendTo($(".secM"));
        }

    });
}

// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
//
function getTeamOverview(teamSearch) {
    // setup ajax livescore api parameters.
    const searchTeamInfo = {
        async: true,
        crossDomain: true,
        url: "https://api.squiggle.com.au/?q=teams" + ";" + teamSearch,
        method: "GET",
    };

    $.ajax(searchTeamInfo).done(function (response) {
        console.log(response);
        // Clears all old content that may be present within the main content container
        $("#main-content").empty();

        // Grabs team ID to use as the parameter for another AJAX call
        var teamID = response.teams[0].id;

        // Stores the team logo url, the team name, country of origin, and founding date
        var logo = response.teams[0].logo;
        var name = response.teams[0].name;
        var debut = response.teams[0].debut;
        var abbrev = response.teams[0].abbrev;

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
        console.log(allTeams);
        // loops 18 times to get the 18 playing teams.
        for (var i = 0; i <= 18; i++) {
            var TeamName = allTeams[i].name;
            var TeamDebut = allTeams[i].debut;
            var TeamShortName = allTeams[i].abbrev;
            var TeamInfoCol = $("<p style='font-size: 12px'>")
                .addClass("lineup-col")
                .text(TeamName + ", " + TeamDebut + ", " + TeamShortName + "")
                .appendTo($(".secM"));
        }
    });
}

// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
//

var inputData = "melbourne";

$(".venues").click(function () {
    // clear old data and recall getTeamOverview function

    console.log("testing");
    fetchApi();
});

//GoogleMaps fetch API
function fetchApi() {
    var requestUrl =
        "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
        inputData.value +
        "&key=AIzaSyBfcesBR0jIfC2a5_y6_Y2Y9t3On2z39hU";
    fetch(requestUrl, { mode: 'no-cors' })
        .then(function (response) {
            // After getting into the API this function will now happen (promise)
            return response; // Returns the information as JSON
        })
        .then(function (
            data // We take that data and use it inside this function to start outputting our information
        ) {
            console.log(data);
            return data;
        });
}

