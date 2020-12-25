const fs = require('fs');
const input = fs.readFileSync('day8.in').toString();
const lines = input.split('\n');
let out = '';

let nums = [];
for (const line of lines) {
    nums.push(parseInt(line));
}

console.log(nums);

let target = 27911108;

for(let i = 0; i < nums.length; i++) {
    let sum = 0;
    for(let j = i; j < nums.length; j++) {
        sum += nums[j];
        if(sum === target) {
            let smallest = nums[i];
            let largest = nums[i];
            for(let k = i; k <= j; k++) {
                if(nums[k] < smallest) {
                    smallest = nums[k]
                } else if(nums[k] > largest) {
                    largest = nums[k]
                }
            }
            console.log(smallest + largest);
            out += `${(smallest + largest)}`
        }
    }
}

fs.writeFileSync('day8.out', out);
