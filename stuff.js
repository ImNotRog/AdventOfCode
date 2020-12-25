const fs = require('fs');

const input = fs.readFileSync("stuff.in").toString();
const lines = input.split("\n");
let out = "";

let map = new Map();
for(const line of lines) {
    let words = line.split(" ");
    let n = words[0] + " " + words[1];
    let arr = [];
    if(words[4] !== "no") {
        for (let i = 4; i < words.length; i += 4) {
            let num = parseInt(words[i]);
            let name = words[i+1] + " " + words[i+2];
            arr.push({
                num,
                name
            })
        }
    }
    map.set(n, arr);
    
}

function containsGold(name) {
    for(let i = 0; i < map.get(name).length; i++) {
        if(map.get(name)[i].name === "shiny gold") {
            return true;
        }
        if(containsGold(map.get(name)[i].name)) return true;
    }
    return false;
}

function num(name) {
    let total = 1;
    for (let i = 0; i < map.get(name).length; i++) {
        total += num(map.get(name)[i].name) * map.get(name)[i].num;
    }
    return total;
}

let total = 0;
for(const key of map.keys()) {
    if(containsGold(key)) {
        total ++;
    }
}

out += total;

out += "\n";

out += num("shiny gold") - 1;

fs.writeFileSync("stuff.out", out);
