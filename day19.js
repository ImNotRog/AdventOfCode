const fs = require('fs');
const input = fs.readFileSync('day19.in').toString();
const lines = input.split('\n');

let stage = 0;
let rules = new Map();

function setOfRuleNum(rulenum) {

    rulenum = parseInt(rulenum);

    let rule = rules.get(rulenum);

    return setOf(rule);
}

function setOf(rule) {
    try {
        if(rule === `"a"`) {
            let ret = new Set();
            ret.add("a");
            return ret;
        }
        if(rule === `"b"`){
            let ret = new Set();
            ret.add("b");
            return ret;
        }
        if(rule.includes("|")) {
            let set = new Set();
            let beforerule = rule.slice(0,rule.indexOf("|") - 1);
            let afterrule = rule.slice(rule.indexOf("|") + 2);
            let beforeset = setOf(beforerule);
            let afterset = setOf(afterrule);

            for(const a of beforeset) {
                set.add(a);
            }
            for(const b of afterset) {
                set.add(b);
            }

            return set;
        }

        if(!rule.includes(" ")) {
            return setOfRuleNum(rule);
        }

        let before = rule.split(" ")[0];
        let after = rule.split(" ")[1]; 
        // let beforerule = rules.get(parseInt(before));
        // let afterrule = rules.get(parseInt(after));
        
        let beforeset = setOfRuleNum(before);
        let afterset = setOfRuleNum(after);

        let set = new Set();
        for (const a of beforeset) {
            for (const b of afterset) {
                set.add(a + b);
            }
        }
        return set;

    }catch(err) {
        console.log(err);
        console.log(rule);
        return new Set();
    }

}

let total = 0;

let fourtytwo;
let thirtyone;
for (let line of lines) {
    if(line === '') {
        stage++;

        fourtytwo = setOfRuleNum(42);
        thirtyone = setOfRuleNum(31);
        continue;
    }

    if(stage === 0) {
        rules.set(parseInt(line.split(":")[0]),line.slice(line.indexOf(":") + 2));
    }
    else {
        let num42 = 0;

        while(true) {
            let changed = false;
            for(const a of fourtytwo) {
                if(line.startsWith(a)) {
                    num42++;
                    changed = true;
                    line = line.slice(a.length);
                }
            }
            if(!changed) {
                break;
            }
        }

        let num31 = 0;
        while(true) {
            let changed = false;
            for (const a of thirtyone) {
                if (line.startsWith(a)) {
                    num31++;
                    changed = true;
                    line = line.slice(a.length);
                }
            }
            if (!changed) {
                break;
            }
        }

        if(num42 > num31 && num31 > 0 && line === "") {
            total ++;
        }
    }
}

console.log(total);
