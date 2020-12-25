const fs = require('fs');
const { formatWithOptions } = require('util');
const input = fs.readFileSync('day17.in').toString();
const lines = input.split('\n');

let alive = new Set();
for (let i = 0; i < lines.length; i++) {
    for(let j = 0; j < lines[i].length; j++) {
        if(lines[i][j] === "#") {
            alive.add(`${i},${j},0,0`);
        }
    }
}

for(let i = 0; i < 6; i++) {
    let newalive = new Set();
    let tested = new Set();
    for(const point of alive) {

        let arr = point.split(",").map(a => parseInt(a));

        for(let x = arr[0] - 1; x <= arr[0] + 1; x++) {
            for(let y = arr[1] - 1; y <= arr[1] + 1; y++) {
                for(let z = arr[2] - 1; z <= arr[2] + 1; z++) {
                    for(let w = arr[3] - 1; w <= arr[3] + 1; w++) {

                        // let currpoint = [x,y,z,w];
                        let str = `${x},${y},${z},${w}`

                        if (tested.has(str)) continue;

                        let neighbors = 0;
                        for(const newpoint of alive) {
                            let stuff = newpoint.split(",").map(a => parseInt(a));
                            if(Math.abs(stuff[0] - x) <= 1 
                            && Math.abs(stuff[1] - y) <= 1
                            && Math.abs(stuff[2] - z) <= 1
                            && Math.abs(stuff[3] - w) <= 1) {
                                neighbors ++;
                            }
                        }

                        // console.log(neighbors)
                        if(alive.has(str)) {
                            neighbors--;
                            
                            if(neighbors === 2 || neighbors === 3) {
                                newalive.add(str);
                            }
                        } else {
                            if(neighbors === 3) {
                                newalive.add(str);
                            }
                        }

                        tested.add(str);

                    }
                }
            }
        }
    }

    alive = newalive;
}

console.log(alive.size)
