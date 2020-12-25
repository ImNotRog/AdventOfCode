const fs = require('fs');
const input = fs.readFileSync('day24.in').toString();
const lines = input.split('\n');

let flipped = new Set();
console.log(flipped)

for (const line of lines) {
    let instructions = [];
    let currstr = "";

    let currx = 0;
    let curry = 0;
    for(let i = 0; i < line.length; i++) {
        currstr += line[i];
        if(currstr === "n") {
            continue;
        }
        if(currstr === "s") {
            continue;
        }
        if(currstr === "e") {
            currx += 2;
        }
        if(currstr === "w") {
            currx -= 2;
        }
        if(currstr === "ne") {
            curry++;
            currx++;
        }
        if(currstr === "se") {
            curry --;
            currx++;
        }
        if(currstr === "sw") {
            curry --;
            currx --;
        }
        if(currstr === "nw") {
            curry++;
            currx--;
        }

        instructions.push(currstr);
        currstr = "";
    }

    let posstr = `${currx},${curry}`;
    if(flipped.has(posstr)) {
        flipped.delete(posstr);
    } else {
        flipped.add(posstr);
    }
    
}

let neighborsof = (x, y) => [[x + 1, y + 1], [x + 2, y], [x + 1, y - 1], [x - 1, y - 1], [x - 2, y], [x - 1, y + 1]];

for(let i = 0; i < 100; i++){

    let newflipped = new Set();
    for (const hex of flipped) {
        let [x, y] = JSON.parse(`[${hex}]`);
        // console.log(x,y);
        let tocheck = neighborsof(x, y);
        tocheck.push([x, y])
        for (const [a, b] of tocheck) {
            let neighbors = neighborsof(a, b);
            let numneighbors = 0;
            for (const [nx, ny] of neighbors) {
                if (flipped.has(`${nx},${ny}`)) {
                    numneighbors++;
                }
            }

            if (flipped.has(`${a},${b}`)) {
                if (numneighbors > 0 && numneighbors <= 2) {
                    newflipped.add(`${a},${b}`);
                }
            } else {
                if (numneighbors == 2) {
                    newflipped.add(`${a},${b}`);
                }
            }
        }
    }
    flipped = newflipped
}

console.log(flipped.size)