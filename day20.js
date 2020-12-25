
const fs = require('fs');
const input = fs.readFileSync('day20.in').toString();
const lines = input.split('\n');

let dimensions1 = 3;
let dimensions2 = 3;

let tilemap = new Map();
let num = 0;
let currtile = [];
for (const line of lines) {
    if(line === "") {
        // Compile stuff
        tilemap.set(num, currtile);
        currtile = [];
    } else if(line.includes("Tile")) {
        num = parseInt( line.slice(5, line.length - 1) );
    } else {
        currtile.push([...line]);
    }
}

function edges(tile) {
    let top = tile[0].map(a => a);
    let bottom = tile[tile.length-1].map(a => a).reverse();
    let left = tile.map(a => a[0]).reverse();
    let right = tile.map(a => a[a.length - 1]);

    let flippedtop = tile[0].map(a => a).reverse();
    let flippedbottom = tile[tile.length - 1].map(a => a);
    let flippedleft = tile.map(a => a[0]);
    let flippedright = tile.map(a => a[a.length - 1]).reverse();

    return [right, top, left, bottom,flippedright,flippedtop,flippedleft,flippedbottom];
}

function similiaritiesof(tilekey) {
    let similarities = [];
    let tileedges = edges(tilemap.get(tilekey));
    for (const othertilekey of tilemap.keys()) {

        if (tilekey === othertilekey) continue;

        let similar = false;
        let similarity = {
            side1: 0,
            side2: 0,
        }

        let othertileedges = edges(tilemap.get(othertilekey));
        for (let i = 0; i < tileedges.length; i++) {
            if (similar) break;
            const edge0 = tileedges[i];
            for (let j = 0; j < othertileedges.length; j++) {
                const edge1 = othertileedges[j];
                let ok = true;
                for (let i = 0; i < edge0.length; i++) {
                    if (edge0[i] !== edge1[i]) {
                        ok = false;
                    }
                }
                if (ok) {
                    similar = true;
                    similarity = {
                        side1: i,
                        side2: j
                    }
                    break;
                }
            }
        }

        if (similar) {
            similarities.push({
                with: othertilekey,
                ...similarity
            });
            // console.log(tilekey,othertilekey)
        }
    }
    return similarities;
}

let nummap = new Map();
for(const tilekey of tilemap.keys()) {
    let similarities = similiaritiesof(tilekey);
    nummap.set(tilekey,similarities)
}

let numstuff = 0;
let total = 1;

let topleft = 0;
for(const k of nummap.keys()) {
    if(nummap.get(k).length === 2) {
        numstuff++;
        total *= k;
        topleft = k;
    }
}

// console.log(total);

function rotate(arr,num) {
    for(let i = 0; i < num; i++) {
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

function flipVert(arr) {
    let newarr = [];
    for(let i = 0; i < arr.length; i++) {
        let rownum = arr.length - i - 1;
        newarr.push(arr[rownum].map(a => a));
    }
    return newarr;
}

function flipHori(arr) {
    let newarr = [];
    for(let i = 0; i < arr.length; i++) {
        let newrow = arr[i].map((a,colindex) => arr[i][arr.length - colindex - 1])
        newarr.push(newrow);
    }
    return newarr;
}


// topleft = 1951;
let grid = [[topleft]];

let toplefttile = tilemap.get(topleft);

// toplefttile = flipVert(toplefttile);
// tilemap.set(topleft,toplefttile);

nummap.set(topleft, similiaritiesof(topleft));

let orientations = nummap.get(topleft).map(a => a.side1);

// console.log(orientations)
// let newtopleft = flipVert(toplefttile);
let newtopleft = toplefttile;
if(Math.min( ...orientations ) === 0) {
    if(Math.max(...orientations) === 1) {
        newtopleft = rotate( toplefttile, 3);
    }
} else {
    newtopleft = rotate(toplefttile, 3 - Math.min(...orientations));
}
tilemap.set(topleft, newtopleft)
nummap.set(topleft, similiaritiesof(topleft));
console.log("a",nummap.get(topleft))

// console.log([...nummap.keys()].length)

for(let column = 0; column < dimensions2; column ++) {
    if(column !== 0) {

        let rowabove = grid[column-1][0];
        let connections = nummap.get(rowabove);
        console.log("CONNECTIONS: ",connections)
        for (const connekt of connections) {
            if (connekt.side1 === 3) {
                grid.push([connekt.with]);

                console.log(grid);

                let to = connekt.with;
                let orientation = connekt.side2;

                let prevtile = tilemap.get(to);
                let newtile = prevtile;

                

                let torot = (orientation % 4 - 1);

                if (torot < 0) {
                    torot += 4;
                }

                newtile = rotate(newtile, torot);

                if (orientation >= 4) {
                    orientation -= 4;
                    newtile = flipHori( newtile );
                } else {
                    // 
                }

                tilemap.set(to, newtile);
                console.log("BEFORE:", nummap.get(to));
                nummap.set(to, similiaritiesof(to));
                console.log("AFTER:",nummap.get(to));
            }
        }


    }

    for (let i = 1; i < dimensions1; i++) {

        // console.log(grid);
        let prev = grid[column][i - 1];
        // console.log(prev)
        let prevnum = nummap.get(prev);
        // console.log(prevnum);
        for (const a of prevnum) {
            if (a.side1 === 0) {
                grid[column].push(a.with);

                // console.log("PREV: ", nummap.get(a.with))

                let orientation = a.side2;

                // console.log(orientation)

                let prevtile = tilemap.get(a.with);
                let newtile = prevtile;
                if (orientation >= 4) {
                    orientation -= 4;
                    newtile = flipVert(newtile);
                    // console.log("flipped")
                }
                let torot = orientation - 2;
                if (torot < 0) {
                    torot += 4;
                }
                // if(orientation === 3) {
                //     torot = 3;
                // }
                // console.log(torot);
                newtile = rotate(newtile, torot);
                tilemap.set(a.with, newtile);
                nummap.set(a.with, similiaritiesof(a.with));
            }
        }
    }

}

let fullgrid = new Array(8 * dimensions2).fill(0).map(a => new Array(8*dimensions1));
console.log(grid);
for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid.length; j++) {
        for(let i0 = 0; i0 < 8; i0++) {
            for (let j0 = 0; j0 < 8; j0++) {
                let numi = i * 8 + i0;
                let numj = j * 8 + j0;
                fullgrid[numi][numj] = tilemap.get( grid[i][j])[i0+1][j0+1];
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

for(let flipped = 0; flipped < 2; flipped++){

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
                    monstercoords.push([seai,seaj]);
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

            for(const a of fullgrid) {
                for(const b of a) {
                    if(b === "#"){
                        final++;
                    }
                }
            }
            console.log(final);
        }

    }

    fullgrid = flipHori(fullgrid);
}