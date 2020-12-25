const fs = require('fs');
const input = fs.readFileSync('day9.in').toString();
const lines = input.split('\n');
let out = '';

let nums = [];

let ways = [];
for (const line of lines) {
    nums.push(parseInt(line));
    ways.push(0);
}
nums.push(0);
ways.push(0);

ways[0] = 1;

nums = nums.sort((a,b) => a-b);

console.log(nums);

let one = 0;
let three = 0;


for(let i = 1; i < nums.length; i++){
    let diff = nums[i] - nums[i-1];

    if(diff === 1) {
        one ++;
    } else if(diff === 3) {
        three++;
    }

    let index = i;
    index--;
    while(true) {
        if(index < 0) break;
        if(nums[i] - nums[index] > 3) break;

        ways[i] += ways[index];
        index--;
    }
}

three++;

out += three;
out += "\n";
out += one;

console.log(ways);

fs.writeFileSync('day9.out', out);
