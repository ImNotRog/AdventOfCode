const fs = require('fs');
const input = fs.readFileSync('day12.in').toString();
const lines = input.split('\n');

let num = 0;
// let orig = num;
// for (const line of lines) {
    
// }
let nums = (lines[1]).split(",");

let dates = [];
let counter = 0;
let n = [];
for(const num of nums) {
    if(num !== "x") {
        dates.push(parseInt(num));
        n.push(parseInt(num))
    } else {
        dates.push("x");
        
    }
    counter++;
}

let a = [];

for(let i = 0; i < nums.length; i++) {
    if(dates[i] === "x") continue;
    a.push( ( (-i) % dates[i]) + dates[i]);
}
a[0] = 0;

let y = [];

for(let i = 0; i < n.length; i++) {
    let prod = 1;
    for(let j = 0; j < n.length; j++) {
        if(i === j) continue;
        prod *= n[j];
    }

    y.push(prod % n[i])
}

console.log(n);

let z = [];
let ans = 0;
let mult = 1;
for(let i = 0; i < n.length; i++) {
    
    let inv = 1;

    while(true) {
        if((inv * y[i]) % n[i] === 1) {
            break;
        }
        inv++;
    }

    z.push(inv);
    ans += z[i] * a[i] * y[i];
    console.log(ans);
    mult *= n[i];
}

console.log(n, a);
// console.log(num - orig);