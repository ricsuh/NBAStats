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

$(function() {
    $(".dropdown-menu a").click(function() {
        $(".btn:first-child").text($(this).text());
        $(".btn:first-child").val($(this).text());
   });

});

function elt(type, ...children) {
    let node = document.createElement(type);
    for (let child of children) {
        node.appendChild(document.createTextNode(child))
        node.classList.add("dropdown-item")
        node.setAttribute("id", "player")
    }
    return node;
}

for (let player of PLAYERS) {
    document.getElementById("menu").appendChild(
        elt("a", player)
    )
}

document.getElementById("menu").addEventListener("click", function(event) {
    event.preventDefault();
    const playerName = document.getElementById("selectedPlayer").value;
    let firstName = playerName.substr(playerName.indexOf(',') + 2);
    let lastName = playerName.substr(0, playerName.indexOf(','));
    console.log(firstName + " " + lastName);

    // const url = "https://api-nba-v1.p.rapidapi.com/players/firstName/" + firstName;
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
        console.log(json)

        index = 0;
        if (json.api.players.length > 1) {
            for (let player of json.api.players) {
                if (player.firstName === firstName && player.lastName === lastName) {
                    break;
                }
                index++;
            }
        }
        // console.log(json.api.players[index]);
        let data = json.api.players[index];

    })
    .catch(err => {
        console.log(err);
    });
})