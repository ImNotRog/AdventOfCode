const fs = require('fs');
const input = fs.readFileSync('day11.in').toString();
const lines = input.split('\n');


let x = 0;
let y = 0;

let wx = 10;
let wy = 1;
for (const line of lines) {
    
    let c = line.charAt(0);
    let num = parseInt(line.slice(1));
    if(c === "F") {
        x += wx * num;
        y += wy * num;
    }
    if(c === "N") {
        wy += num;
    }
    if(c === "S") {
        wy -= num;
    }
    if(c === "E") {
        wx += num;
    } 
    if(c === "W" ) {
        wx -= num;
    }

    if(c === "R") {
        let currdeg = Math.atan2(wy, wx);
        let mag = Math.sqrt(wy ** 2 + wx ** 2)
        currdeg -= num * Math.PI / 180;
        wx = mag * Math.cos(currdeg);
        wy = mag * Math.sin(currdeg);
    }
    if(c === "L") {
        let currdeg = Math.atan2(wy, wx);
        let mag = Math.sqrt(wy ** 2 + wx ** 2)
        currdeg += num * Math.PI / 180;
        wx = mag * Math.cos(currdeg);
        wy = mag * Math.sin(currdeg);
    }
}

console.log(x,y);