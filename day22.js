const fs = require('fs');
const input = fs.readFileSync('day22.in').toString();
const lines = input.split('\n');

let players = [[],[]];
let currplayer = 0;
for (const line of lines) {
    if(line.includes("Player")) {
        currplayer = parseInt( line.slice(line.length-2, line.length-1) ) - 1;
    } else if(line !== "") {
        players[currplayer].push(parseInt(line));
    }
}

function game(players) {

    let prev0 = new Set();
    let prev1 = new Set();

    while (players[0].length > 0 && players[1].length > 0) {

        let thisstr0 = players[0].join(", ");
        if(prev0.has(thisstr0)) {
            return 0;
        }

        let thisstr1 = players[1].join(", ");
        if (prev1.has(thisstr1)) {
            return 0;
        }

        prev0.add(thisstr0);
        prev1.add(thisstr1);

        if(players[0][0] <= players[0].length - 1 && players[1][0] <= players[1].length - 1 ) {
            let winner = game([players[0].slice(1,1+players[0][0]), players[1].slice(1, 1+ players[1][0])]);
            if(winner === 0) {
                players[0] = [...players[0].slice(1), players[0][0], players[1][0]];
                players[1] = players[1].slice(1);
            } else {
                players[1] = [...players[1].slice(1), players[1][0], players[0][0]];
                players[0] = players[0].slice(1);
            }
        }
        else if (players[0][0] > players[1][0]) {
            players[0] = [...players[0].slice(1), players[0][0], players[1][0]];
            players[1] = players[1].slice(1);
        } else {
            players[1] = [...players[1].slice(1), players[1][0], players[0][0]];
            players[0] = players[0].slice(1);
        }
    }
    if(players[0].length > 0 ) {
        return 0;
    } else {
        return 1;
    }
}

let outcome = game(players);

let total = 0;
for(let i = 0; i < players[0].length; i++) {
    total += players[0][i] * (players[0].length - i);
}

console.log(total)
