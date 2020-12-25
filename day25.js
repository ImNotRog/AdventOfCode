const fs = require('fs');
const { umask } = require('process');
const input = fs.readFileSync('day25.in').toString();
const lines = input.split('\n');

let target1 = 2069194;
let target2 = 16426071;
// let target1 = 5764801;
// let target2 = 17807724;

let round1 = 0;
let round2 = 0;

let num = 7;
let rounds = 0;
while(true) {
    rounds++;

    if(num === target1) {
        round1 = rounds;
    } else if(num === target2) {
        round2 = rounds;
    }

    if(round1 * round2 !== 0) break;
    
    num *= 7;
    num = num % 20201227;
}

console.log(round1,round2)

// console.log(target1);

let t1 = target1;

let val = 1;
for(let i = 0; i < round2; i++) {
    val *= t1;
    val = val % 20201227;
}


console.log(val,target1);
