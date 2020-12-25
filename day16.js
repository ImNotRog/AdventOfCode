const fs = require('fs');
const { posix } = require('path');
const input = fs.readFileSync('day15.in').toString();
const lines = input.split('\n');

let rules = [];
let stage = 0;

let total = 0;

let truenums = [];
let yourballot = [191, 139, 59, 79, 149, 83, 67, 73, 167, 181, 173, 61, 53, 137, 71, 163, 179, 193, 107, 197];
// let yourballot = [11, 12, 13];
for (const line of lines) {
    if(stage === 0) {
        if(line === "") continue;
        if(line === "your ticket:") {
            stage = 1;
            continue;
        }

        let dash = line.indexOf("-");
        let colon = line.indexOf(":");
        let seconddash = line.lastIndexOf("-")
        let or = line.indexOf("or ");

        let a = parseInt(line.slice(colon+2,dash));
        let b = parseInt(line.slice(dash+1,or-1));
        if(isNaN(b)){
            console.log(line.slice(dash + 1, or - 1))
        }
        let c = parseInt(line.slice(or+3,seconddash));
        let d = parseInt(line.slice(seconddash+1));

        rules.push([a,b,c,d]);
    }
    else {
        if(line === "") continue;
        if(line.includes("ticket")) continue;

        let nums = line.split(",").map(a => parseInt(a));
        
        let invalid = false;
        for(const num of nums) {
            let ok = false;
            for(const rule of rules) {
                if(num >= rule[0] && num <= rule[1]) {
                    ok = true;
                } else if(num >= rule[2] && num <= rule[3]) {
                    ok = true;
                }
            }

            if (!ok) {
                total += (num);
                invalid = true;
            } 
        }
        if(!invalid) {
            truenums.push(nums);
        }
    }
}

// console.log(rules);

let rulesmap = [];

// for each column
for(let i = 0; i < truenums[0].length; i++) {
    let ispossible = Array(rules.length).fill(true);

    // for each row
    for(let j = 0; j < truenums.length;  j++) {

        // check if it makes it not possible
        let num = truenums[j][i];

        for(let k = 0; k < rules.length; k++) {
            let rule = rules[k];
            let ok = false;
            if( num >= rule[0] && num <= rule[1]) {
                ok = true;
            }
            if(num >= rule[2] && num <= rule[3]) {
                ok = true;
            }
            
            if(!ok){
                // console.log(k);
                ispossible[k] = false;
            }
        }
    }

    rulesmap[i] = ispossible;
}

// console.log(rules[2])

let taken = Array(rules.length).fill(false);
let final = Array(rules.length).fill(-1);

// rulesmap = [[false, true, false,false], [false,true,true,true], [true,true,true,false], [false,false,false,true]]

while(true) {
    let changed = false;
    for(let i = 0; i < rulesmap.length; i++) {
        let a = 0;
        let lasta = 0;
        for(let j = 0; j < rulesmap[i].length; j++){
            if(rulesmap[i][j]&& final[i] === -1) {
                a++;
                lasta = j;
            }
        }
        if(a === 1) {
            // console.log(lasta, i);
            taken[lasta] = true;
            for(let j = 0; j < rulesmap.length; j++) {
                rulesmap[j][lasta] = false;
            }
            final[i] = lasta;
            changed = true;
        }
    }

    for(let i = 0; i < rules.length; i++) {
        let a = 0;
        let lasta = 0;
        for(let j = 0; j < rulesmap.length; j++) {
            if(rulesmap[j][i] && final[j] === -1) {
                a ++;
                lasta = j;
            }
        }
        if(a === 1) {
            // console.log("p2")
            taken[i] = true;
            for (let j = 0; j < rulesmap.length; j++) {
                rulesmap[j][i] = false;
            }
            final[lasta] = i;
            // console.log(i,lasta)
            changed = true;
        }
    }
    if(!changed) break;
}

let m = 1

let zeroes = [];

for(let i = 0; i < final.length; i++) {
    if(final[i] < 6 && final[i] > -1) {
        m *= ( yourballot[i] );
    }
     if(final[i] === -1) {
        zeroes.push(yourballot[i])
    }
}

// console.log()

console.log(m)
// console.log(rulesmap)
// fs.writeFileSync("test.out",rulesmap.map(a => a[2]).join("\n"))