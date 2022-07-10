// ************************************************************************************
// ************************************************************************************
// ************************************************************************************
//

//Global Variable
var teamSearch = $("#search-value").val();
const LOGO_URL = 'https://squiggle.com.au'


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
        url:
            "https://api.squiggle.com.au/?q=teams" + ";" + teamSearch,
        method: "GET",
    };

    $.ajax(searchTeamInfo).done(function (response) {
        console.log(response)
        // Clears all old content that may be present within the main content container
        $("#main-content").empty();

        // Dynamically Adds in the div containers and sections for the all-team search api

        var RightCard = $("<div>")
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

        // loops 18 times to get the 18 playing teams.
        for (var i = 0; i < 18; i++) {
            var TeamName = 'Team Name :' + allTeams[i].name + ' ';
            var TeamDebut = 'Team Debut :' + allTeams[i].debut + ' ';
            //var TeamShortName = 'TeamShortName :' + allTeams[i].abbrev + ' ';
            var teamLogo = allTeams[i].logo;
            //const imgLogo = `${LOGO_URL}${teamLogo}`
            //console.log(imgLogo)
            var TeamInfoCol = $("<p style='font-size: 12px'>")
                .addClass("lineup-col")
                .text(
                    TeamName + ", " + TeamDebut + ""
                )
                .appendTo($(".secM"));
        }

    });
}