const fs = require('fs');
const input = fs.readFileSync('day10.in').toString();
const lines = input.split('\n');


let grid = [];
for (const line of lines) {
    grid.push([ ...line ]);
}

while(true) {
    let changed = false;

    let grid2 = grid.map((a) => a.map(b => b));

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {

            let numocc = 0;

            let log = [];

            for(let vecx = -1; vecx <= 1; vecx++){
                for(let vecy = -1; vecy <= 1; vecy++){


                    if(vecx === 0 && vecy === 0) continue;

                    let currx = i;
                    let curry = j;
                    try {
                        currx += vecx;
                        curry += vecy;
                        while (grid[currx][curry] === ".") {
                            currx += vecx;
                            curry += vecy;
                        }

                        if (grid[currx][curry] === "#") {
                            numocc++;
                            log.push([vecx, vecy]);
                        }
                    } catch (err) {

                    }
                }
            }
            

            if(numocc === 0 && grid[i][j] === "L") {
                grid2[i][j] = "#"
                changed = true;
            } else if(numocc >= 5 && grid[i][j] === "#") {
                grid2[i][j] = "L"
                changed = true;
            }
        }
    }


    grid = grid2;

    if(!changed) {
        break
    }

}

console.log(grid.map((a) => a.join("/")));


let total = 0;
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if(grid[i][j] === "#") {
            total++;
        }
    }
}

console.log(total);