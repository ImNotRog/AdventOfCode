const fs = require('fs');
const input = fs.readFileSync('day7.in').toString();
const lines = input.split('\n');
let out = '';

function isCool() {
    let curr = 0;
    let acc = 0;
    let correct = false;

    let visited = [];
    for (const line of lines) {
        visited.push(false);
    }

    // console.log(visited);
    while (true) {
        if (curr >= lines.length) {
            correct = true;
            break;
        };

        if (visited[curr]) { 
            break 
        };

        visited[curr] = true;
        let line = lines[curr];
        let words = line.split(' ');
        let command = words[0];
        let stuff = words[1];
        let num = parseInt(stuff.slice(1));
        if (stuff[0] === "-") {
            num *= -1;
        }

        if (command == "nop") {
            curr++;
        }
        if (command == "acc") {
            acc += num;
            curr++;
        }
        if (command == "jmp") {
            curr += num;
        }
    }
    return {correct, acc};
}

for (let i = 0; i < lines.length; i++) {

    let line = lines[i];
    if(line.slice(0,3) === "jmp") {
        let prevline = line;
        lines[i] = "nop" + line.slice(3);
        console.log(lines[i]);
        if(isCool().correct) {
            out += isCool().acc;
        };
        console.log(isCool())
        lines[i] = prevline;
    }
}

// console.log(curr);

fs.writeFileSync('day7.out', out);
