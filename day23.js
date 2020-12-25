const fs = require('fs');
const input = fs.readFileSync('day23.in').toString();
const lines = input.split('\n');

let cups = [...lines[0]].map(a => parseInt(a));
let max = Math.max(...cups);
let a = 100;
for(let i = max+1; i <= a; i++) {
    cups.push(i);
}
max = a;

// cups.reverse();

// Current cup is always 0 position
// For 3 cups

for(let i = 0; i < 10; i++) {

    console.log(cups);

    let removed = cups.slice(1, 4);
    cups = [...cups.slice(0, 1), ...cups.slice(4)];

    let dcuplabel = cups[0] - 1;

    while (!cups.includes(dcuplabel)) {
        dcuplabel--;
        if (dcuplabel < 1) {
            dcuplabel = max;
        }
    }

    let dcupposition = cups.indexOf(dcuplabel);
    cups = [...cups.slice(0, dcupposition + 1), ...removed, ...cups.slice(dcupposition + 1)];
    cups = [...cups.slice(1), cups[0]]
}

let counter = cups.indexOf(1) + 1;
let stuff = [];
for (let i = 0; i < 2; i++) {
    stuff.push(cups[counter]);
    counter++;
    if (counter >= cups.length) {
        counter = 0;
    }
}
console.log(cups);

// console.log(cups.join(""));
