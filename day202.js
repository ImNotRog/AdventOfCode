const fs = require('fs');
const input = fs.readFileSync('day20.in').toString();
const lines = input.split('\n');

let dimensions = 12

let tilemap = new Map();
let num = 0;
let currtile = [];
for (const line of lines) {
    if (line === "") {
        // Compile stuff
        tilemap.set(num, currtile);
        currtile = [];
    } else if (line.includes("Tile")) {
        num = parseInt(line.slice(5, line.length - 1));
    } else {
        currtile.push([...line]);
    }
}

function edges(tile) {
    let flippedtop = tile[0].map(a => a);
    let flippedbottom = tile[tile.length - 1].map(a => a).reverse();
    let flippedleft = tile.map(a => a[0]).reverse();
    let flippedright = tile.map(a => a[a.length - 1]);

    let top = tile[0].map(a => a).reverse();
    let bottom = tile[tile.length - 1].map(a => a);
    let left = tile.map(a => a[0]);
    let right = tile.map(a => a[a.length - 1]).reverse();

    return [right, top, left, bottom, flippedright, flippedtop, flippedleft, flippedbottom];
}

function flipVert(arr) {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
        let rownum = arr.length - i - 1;
        newarr.push(arr[rownum].map(a => a));
    }
    return newarr;
}

function rotate(arr, num) {
    for (let i = 0; i < num; i++) {
        let newarr = [];
        for (let i = 0; i < arr.length; i++) {
            let colnum = arr.length - i - 1;
            let currrow = arr.map(a => a[colnum]);
            newarr.push(currrow);
        }
        arr = newarr;
    }
    return arr;
}

function flipHori(arr) {
    let newarr = [];
    for (let i = 0; i < arr.length; i++) {
        let newrow = arr[i].map((a, colindex) => arr[i][arr.length - colindex - 1])
        newarr.push(newrow);
    }
    return newarr;
}

function similaritiesOf(num){
    let similarities = new Map();
    for(const key of tilemap.keys()) {
        if(key === num) continue;
        let similarity = {
            side0: 0,
            side1: 0
        }

        let e0 = edges(tilemap.get(num));
        let e1 = edges(tilemap.get(key));

        let similar = false;
        for(let i = 0; i < e0.length; i++) {
            if(similar) break;
            let edge0 = e0[i];
            for(let j = 0; j < e1.length; j++) {
                let edge1 = e1[j];
                
                let sameedge = true;
                for(let k = 0; k < edge0.length; k++) {
                    if(edge0[k] !== edge1[k]) {
                        sameedge = false;
                    }
                }
                if(sameedge) {
                    similarity = {
                        side0: i,
                        side1: j
                    }
                    similar = true;
                    break;
                }
            }
        }

        if(similar) {
            similarities.set(similarity.side0, { side: similarity.side1, with: key });
        } 
    }
    return similarities
}

let similaritiesmap = new Map();

for(const key of tilemap.keys()) {
    similaritiesmap.set(key, similaritiesOf(key));
}

let topleft = 0;
for(const key of similaritiesmap.keys()) {
    if([...similaritiesmap.get(key).keys()].length === 2) {
        topleft = key;
        // break;
    }
}

let similaritytopleft = similaritiesmap.get(topleft)

let sides = [...similaritytopleft.keys()];
sides.sort();
let topleftrotatenum = 0;
if(sides[0] === 0) {
    if(sides[1] === 1) {
        topleftrotatenum = 3;
    }
} else {
    topleftrotatenum = 3 - sides[0];
}

let toplefttile = tilemap.get(topleft);
toplefttile = rotate(toplefttile, topleftrotatenum);
tilemap.set(topleft,toplefttile);
similaritiesmap.set(topleft, similaritiesOf(topleft))

let grid = [[topleft]];

for(let row = 0; row < dimensions; row++) {
    if(row !== 0) {
        let abovenum = grid[row-1][0];
        let abovesimilarities = similaritiesmap.get(abovenum);
        let thisnum = abovesimilarities.get(3).with;
        grid.push([thisnum]);

        let thistile = tilemap.get(thisnum);
        let orientation = abovesimilarities.get(3).side;
        if (orientation >= 4) {
            orientation -= 4;
        } else {
            thistile = flipVert(thistile);
            tilemap.set(thisnum, thistile)
            similaritiesmap.set(abovenum, similaritiesOf(abovenum));
            abovesimilarities = similaritiesmap.get(abovenum);
            orientation = abovesimilarities.get(3).side;

            orientation -= 4;
        }

        let torot = 1 - orientation;
        if (torot < 0) {
            torot += 4;
        }

        thistile = rotate(thistile, torot);
        tilemap.set(thisnum, thistile)
        similaritiesmap.set(thisnum, similaritiesOf(thisnum));

        // break;
    }

    for (let i = 1; i < dimensions; i++) {
        let prevnum = grid[row][i - 1];
        let prevsimilarities = similaritiesmap.get(prevnum);

        let thisnum = prevsimilarities.get(0).with;
        grid[row].push(thisnum);

        let thistile = tilemap.get(thisnum);
        let orientation = prevsimilarities.get(0).side;
        if (orientation >= 4) {
            orientation -= 4;
        } else {

            // console.log("SIMILAR BEFORE", prevsimilarities);
            thistile = flipVert(thistile);
            tilemap.set(thisnum, thistile)
            similaritiesmap.set(prevnum, similaritiesOf(prevnum));
            prevsimilarities = similaritiesmap.get(prevnum);
            orientation = prevsimilarities.get(0).side;

            // console.log("FLIPPED")
            orientation -= 4;

        }

        // console.log(orientation);

        let torot = 2 - orientation;
        if (torot < 0) {
            torot += 4;
        }

        thistile = rotate(thistile, torot);
        tilemap.set(thisnum, thistile)
        similaritiesmap.set(thisnum, similaritiesOf(thisnum));
    }

}

// console.log(grid);

let fullgrid = new Array(8 * dimensions).fill(0).map(a => new Array(8 * dimensions));
// console.log(grid);
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
        for (let i0 = 0; i0 < 8; i0++) {
            for (let j0 = 0; j0 < 8; j0++) {
                let numi = i * 8 + i0;
                let numj = j * 8 + j0;
                fullgrid[numi][numj] = tilemap.get(grid[i][j])[i0 + 1][j0 + 1];
            }
        }
    }
}

let seamonster =
    [
        `                  # `,
        `#    ##    ##    ###`,
        ` #  #  #  #  #  #   `];


// console.log(fullgrid);

for (let flipped = 0; flipped < 2; flipped++) {

    for (let num = 0; num < 4; num++) {
        let nummonsters = 0;
        fullgrid = rotate(fullgrid, 1);

        let monstercoords = [];
        for (let seai = 0; seai <= fullgrid.length - seamonster.length; seai++) {
            for (let seaj = 0; seaj <= fullgrid.length - seamonster[0].length; seaj++) {

                let ismonster = true;

                for (let i = 0; i < seamonster.length; i++) {
                    for (let j = 0; j < seamonster[i].length; j++) {
                        if (seamonster[i][j] === "#") {
                            if (fullgrid[seai + i][seaj + j] !== "#") {
                                ismonster = false;
                            }
                        }
                    }
                }

                if (ismonster) {
                    nummonsters++;
                    monstercoords.push([seai, seaj]);
                }
            }
        }
        if (nummonsters > 0) {
            console.log(nummonsters)

            for (const coords of monstercoords) {
                let seai = coords[0];
                let seaj = coords[1];
                for (let i = 0; i < seamonster.length; i++) {
                    for (let j = 0; j < seamonster[i].length; j++) {
                        if (seamonster[i][j] === "#") {
                            fullgrid[seai + i][seaj + j] = "O";
                        }
                    }
                }
            }

            let final = 0;

            for (const a of fullgrid) {
                for (const b of a) {
                    if (b === "#") {
                        final++;
                    }
                }
            }
            console.log(final);
        }

    }

    fullgrid = flipHori(fullgrid);
}

