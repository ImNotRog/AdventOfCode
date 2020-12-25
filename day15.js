const fs = require('fs');
const input = fs.readFileSync('day15.in').toString();
const lines = input.split('\n');

let nums = lines[0].split(",").map(a => parseInt(a));

let lasttimes = new Map();
for(let i = 0; i < nums.length - 1; i++) {
    lasttimes.set(nums[i], i);
}
let lastnum = nums[nums.length - 1];

// console.log(lasttimes)

for (let i = nums.length; i < 30000000; i++) {

    if(i % 1000000 === 0) console.log(i);

    let newnum = 0;
    if(lasttimes.has(lastnum)){
        newnum = i - 1 - lasttimes.get(lastnum);
    }

    // console.log(lastnum, lasttimes.get(lastnum),newnum)
    lasttimes.set(lastnum, i-1);

    lastnum = newnum;

}

console.log(lastnum)
