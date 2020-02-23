const PLAYERS = ["Leonard, Kawhi",
                "James, LeBron", 
                "Antetokounmpo, Giannis",
                "Harden, James",
                "Curry, Stephen",
                "Davis, Anthony",
                "George, Paul",
                "Embiid, Joel",
                "Durant, Kevin",
                "Jokic, Nikola",
                "Lillard, Damian",
                "Irving, Kyrie",
                "Butler, Jimmy",
                "Green, Draymond",
                "Beal, Bradley",
                "Mitchell, Donovan",
                "Anthony-Towns, Karl",
                "Oladipo, Victor",
                "Thompson, Klay",
                "Paul, Chris",
                "Simmons, Ben",
                "Walker, Kemba",
                "Booker, Devin",
                "Gobert, Rudy"];

/* Toggles dropdown menu */
$(function() {
    $(".dropdown-menu a").click(function() {
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
   });

});

/* Creates an element node and treats the rest
of its arguments as children to that node */
function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child);
        else node.appendChild(document.createTextNode(child));
    }
    return node;
}

/* Inserts each player into dropdown menu */
for (let player of PLAYERS) {
    let newNode = elt("a", player)
    newNode.setAttribute("class", "dropdown-item")
    document.getElementById("menu").appendChild(newNode)
}

/* Fetches data from API to create player profile */
document.getElementById("menu").addEventListener("click", function(event) {
    event.preventDefault();
    const playerName = document.getElementById("selectedPlayer").value;
    let firstName = playerName.substr(playerName.indexOf(',') + 2);
    let lastName = playerName.substr(0, playerName.indexOf(','));
    console.log(firstName + " " + lastName);

    // Get player data
    const playerURL = "https://api-nba-v1.p.rapidapi.com/players/lastName/" + lastName;
    fetch(playerURL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "cfb6a4fd7bmshf84cff832b6e524p13094cjsn45e16ba54f13"
        }
    })
    .then(response => {
        return response.json();
    }).then(json => {
        // Multiple players have the same first/last name, so make sure 
        // the selected player matches the returned player
        index = 0;
        if (json.api.players.length > 1) {
            for (let player of json.api.players) {
                if (player.firstName === firstName && player.lastName === lastName) {
                    break;
                }
                index++;
            }
        }

        // Fill player profile table
        let data = json.api.players[index];
        const playerTable = document.getElementById("table-body");
        playerTable.innerHTML = '';
        playerTable.appendChild(elt("tr", elt("th", "NAME"), 
                                            elt("td", data.firstName + " " + data.lastName)));
        playerTable.appendChild(elt("tr", elt("th", "COUNTRY"), 
                                            elt("td", data.country)));
        let college = (data.collegeName === " ") ? "No College" : data.collegeName;
        playerTable.appendChild(elt("tr", elt("th", "COLLEGE"), 
                                            elt("td", college)));
        playerTable.appendChild(elt("tr", elt("th", "DATE OF BIRTH"), 
                                            elt("td", data.dateOfBirth)));
        let idNode = elt("td", data.teamId);
        idNode.setAttribute("id", "teamID");
        let teamNode = elt("tr", elt("th", "TEAM"), idNode);
        playerTable.appendChild(teamNode);
        playerTable.appendChild(elt("tr", elt("th", "STARTED NBA"), 
                                            elt("td", data.startNba)));
        playerTable.appendChild(elt("tr", elt("th", "YEARS PRO"), 
                                            elt("td", data.yearsPro)));
        playerTable.appendChild(elt("tr", elt("th", "HEIGHT"), 
                                            elt("td", data.heightInMeters + " m")));
        playerTable.appendChild(elt("tr", elt("th", "WEIGHT"), 
                                            elt("td", data.weightInKilograms + " kg")));
        playerTable.appendChild(elt("tr", elt("th", "JERSEY #"), 
                                            elt("td", data.leagues.standard.jersey)));

        // Get team name from team ID
        let teamID = document.getElementById("teamID").textContent
        const teamURL = "https://api-nba-v1.p.rapidapi.com/teams/teamId/" + teamID;
        fetch(teamURL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "cfb6a4fd7bmshf84cff832b6e524p13094cjsn45e16ba54f13"
        }
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            let newTeamNode = elt("tr", elt("th", "TEAM"),
                                        elt("td", json.api.teams[0].fullName))
            playerTable.replaceChild(newTeamNode, playerTable.childNodes[4])
        })
        .catch(err => {
            console.log(err);
        });

        // Get player stats
        const playerStatsURL = "https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/" + data.playerId;
        fetch(playerStatsURL, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key": "cfb6a4fd7bmshf84cff832b6e524p13094cjsn45e16ba54f13"
        }
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            const statistics = json.api.statistics;
            let last100 = statistics.splice(statistics.length-100, statistics.length);

            // Gather appropriate data
            let points = [];
            let rebounds = [];
            let assists = [];
            let steals = [];
            let blocks = [];
            for (let num of statistics) {
                points.push(num.points)
                rebounds.push(num.totReb)
                assists.push(num.assists)
                steals.push(num.steals)
                blocks.push(num.blocks)
            }

            let config = {responsive: true};

            // Points plot
            const playerPoints = document.getElementById("playerPoints");

            let pointsTrace = {
                x: [...Array(100).keys()],
                y: points,
                type: "scatter",
                // line: {
                //     color: '#D02A32'
                // }
            };

            let pointsData = [pointsTrace];

            let pointsLayout = {
                title: {
                    text: "Last 100 Games: PPG",
                    font: {
                        size: 18,
                    }
                },
                xaxis: {
                    title: {
                        text: "Game",
                        font: {size: 14}
                    },
                    ticks: "outside",
                    ticklen: 5,
                    zeroline: true,
                    zerolinewidth: 2
                },
                yaxis: {
                    title: {
                        text: "Points per Game (PPG)",
                        font: {size: 14}
                    },
                    ticks: "outside",
                    ticklen: 5,
                    zeroline: true,
                    zerolinewidth: 2
                },
                font: {family: "HelveticaNeue-Thin, Helvetica, Arial, sans-serif"}
            };

            Plotly.newPlot(playerPoints, pointsData, pointsLayout, config);

            // Rebounds plot
            const playerRebounds = document.getElementById("playerRebounds");

            let reboundsTrace = {
                x: [...Array(100).keys()],
                y: rebounds,
                type: "scatter"
            };

            let reboundsData = [reboundsTrace];

            let reboundsLayout = {
                title: {
                    text: "Last 100 Games: Rebounds",
                    font: {
                        size: 18,

                    }
                },
                xaxis: {
                    title: {
                        text: "Game",
                        font: {size: 14}
                    },
                    ticks: "outside",
                    ticklen: 5,
                    zeroline: true,
                    zerolinewidth: 2
                },
                yaxis: {
                    title: {
                        text: "Rebounds per Game",
                        font: {size: 14}
                    },
                    ticks: "outside",
                    ticklen: 5,
                    zeroline: true,
                    zerolinewidth: 2
                },
                font: {family: "HelveticaNeue-Thin, Helvetica, Arial, sans-serif"}
            };

            Plotly.newPlot(playerRebounds, reboundsData, reboundsLayout, config);

            // Assists plot
            const playerAssists = document.getElementById("playerAssists");

            let assistsTrace = {
                x: [...Array(100).keys()],
                y: assists,
                type: "scatter"
            };

            let assistsData = [assistsTrace];

            let assistsLayout = {
                title: {
                    text: "Last 100 Games: Assists",
                    font: {
                        size: 18,

                    }
                },
                xaxis: {
                    title: {
                        text: "Game",
                        font: {size: 14}
                    },
                    ticks: "outside",
                    ticklen: 5,
                    zeroline: true,
                    zerolinewidth: 2
                },
                yaxis: {
                    title: {
                        text: "Assists per Game",
                        font: {size: 14}
                    },
                    ticks: "outside",
                    ticklen: 5,
                    zeroline: true,
                    zerolinewidth: 2
                },
                font: {family: "HelveticaNeue-Thin, Helvetica, Arial, sans-serif"}
            };

            Plotly.newPlot(playerAssists, assistsData, assistsLayout, config);
        })
        .catch(err => {
            console.log(err);
        });

    })
    .catch(err => {
        console.log(err);
    });
})