const fs = require('fs');
const { formatWithOptions } = require('util');
const input = fs.readFileSync('day21.in').toString();
const lines = input.split('\n');

class food {
    /**
     * 
     * @param {string[]} ingredients 
     * @param {string[]} allergens 
     */
    constructor(ingredients, allergens) {
        this.ingredients = ingredients;
        this.allergens = allergens;
    }
}

/**
 * @type {food[]}
 */
let foods = [];

let allingredients = new Set();
let allallergens = new Set();
for (const line of lines) {
    let beginparen = line.indexOf("(");
    let ingredients = line.slice(0,beginparen-1).split(" ");
    let allergens = line.slice(beginparen + 10, line.length - 1).split(", ");
    // console.log(foods,allergens);

    for(const food of ingredients) {
        allingredients.add(food);
    }
    for(const allergen of allergens) {
        allallergens.add(allergen);
    }
    foods.push(new food(ingredients,allergens));
    // console.log(foods);
}

// console.log([...allallergens]);

/**
 * @type {Map<string,string[]>}
 */
let ingredients = new Map()

for(const ingredient of allingredients) {
    ingredients.set(ingredient, [...allallergens]);
}
for(let i = 0; i < foods.length; i++) {
    const currfood = foods[i];

    let allergens = currfood.allergens;

    for(const ingredient of allingredients) {
        if(!currfood.ingredients.includes(ingredient)) {
            let prevarr = ingredients.get(ingredient);
            let newarr = [];
            for (const a of prevarr) {
                if (!allergens.includes(a)) {
                    newarr.push(a);
                }
            }
            ingredients.set(ingredient, newarr);
        }
    }
}

let safeingredients = [];
for(const name of ingredients.keys()) {
    if(ingredients.get(name).length === 0) {
        safeingredients.push(name);
    }
}

let num = 0;
for(const food of foods) {
    for(const safe of safeingredients) {
        if(food.ingredients.includes(safe)) {
            num++;
        }
    }
}

// console.log(num);

let potentingredients = new Map();
for(const ingredient of allingredients) {
    if(!safeingredients.includes(ingredient)) {
        potentingredients.set(ingredient,ingredients.get(ingredient));
    }
}

while (true) {
    let changed = false;

    for(const ingredient of potentingredients.keys()) {
        let possibilities = potentingredients.get(ingredient);
        if(typeof possibilities !== "string") {
            if(possibilities.length === 1) {
                potentingredients.set(ingredient,possibilities[0]);
                changed = true;

                for(const otheringredient of potentingredients.keys()) {
                    let otherpossibilities = potentingredients.get(otheringredient)
                    if(typeof otherpossibilities !== "string") {
                        otherpossibilities = otherpossibilities.filter(a => a !== possibilities[0]);
                        potentingredients.set(otheringredient,otherpossibilities);
                    }
                }
            }
        }
    }

    if(!changed) break;
}

// console.log(potentingredients);

let stuff = [];
for(const ing of potentingredients.keys()) {
    stuff.push({
        coded: ing,
        name: potentingredients.get(ing)
    })
}

stuff.sort((a,b) => a.name.localeCompare(b.name));

// stuff = stuff.sort((a,b) => a.name.localeCompare(b.name) < 0);

console.log(stuff.map(a => a.coded).join(","));
