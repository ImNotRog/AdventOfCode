const fs = require('fs');
const input = fs.readFileSync('day18.in').toString();
const lines = input.split('\n');


function parseSeq(words) {

    // Eval all subexpressions
    for (let i = 0; i < words.length; i += 2) {

        if (words[i] === "(") {
            let paran = 0;
            let endparan = -1;
            for (let j = i; j < words.length; j++) {
                if (words[j] === '(') paran++;
                if (words[j] === ')') paran--;
                if (paran === 0) { endparan = j; break; };
            }
            let c = parseSeq(words.slice(i + 1, endparan));
            words = [...words.slice(0, i), c, ...words.slice(endparan + 1)];
        }

    }

    // Step through and evaluate all +s
    while(words.includes("+")) {
        for (let i = 1; i < words.length; i += 2) {

            let prevnum = parseInt(words[i - 1]);

            if (words[i] === "+") {
                words = [...words.slice(0,i-1), parseInt(words[i+1]) + prevnum, ...words.slice(i+2)];
            }

        }
    }

    // Step through and evaluate all *s
    while (words.includes("*")) {
        for (let i = 1; i < words.length; i += 2) {

            let prevnum = parseInt(words[i - 1]);

            if (words[i] === "*") {
                words = [...words.slice(0, i - 1), parseInt(words[i + 1]) * prevnum, ...words.slice(i + 2)];
            }

        }
    }

    // words should only have 1 element now
    return words[0];
}

let total = 0;
for (const line of lines) {
    // Add spaces before and after (s and )s 
    let newline = "";
    for(let i = 0; i < line.length; i++) {
        if(line[i] === "(") {
            newline += "( ";
        } else if(line[i] === ")") {
            newline += " )";
        } else {
            newline += line[i];
        }
    }

    let words = newline.split(" ");
    total += parseSeq(words);
}
console.log(total);

