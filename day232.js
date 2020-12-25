class LinkedList {
    constructor(value,head,tail) {
        this.value = value;
        this.start = false;
        this.end = false;
        if(head) {
            /**
             * @type {LinkedList}
             */
            this.head = head;
        } else {
            this.start = true;
        }
        if(tail) {
            /**
             * @type {LinkedList}
             */
            this.tail = tail;
        } else {
            this.end = true;
        }
    }

    setHead(head) {
        if(head) {
            this.start = false;
            this.head = head;
        } else {
            this.start = true;
        }
    }

    setTail(tail) {

        if(tail) {
            this.end = false;
            this.tail = tail;
        } else {
            this.end = true;
        }

    }
}

const fs = require('fs');
const input = fs.readFileSync('day23.in').toString();
const lines = input.split('\n');

let cups = [...lines[0]].map(a => parseInt(a));
let max = Math.max(...cups);
let a = 1000000;
for (let i = max + 1; i <= a; i++) {
    cups.push(i);
}
max = a;

// console.log(cups);

/**
 * @type {LinkedList[]}
 */
let bshashmap = Array(max + 1);

let linkedlist = new LinkedList(0, false, false);
let currlinkedlist = linkedlist;
for (let i = 0; i < max; i++) {
    currlinkedlist.setTail(new LinkedList(cups[i], currlinkedlist, false));
    currlinkedlist = currlinkedlist.tail;
    bshashmap[cups[i]] = currlinkedlist;
}
linkedlist = linkedlist.tail;
linkedlist.setHead(currlinkedlist);
currlinkedlist.setTail(linkedlist);

for(let i = 0; i < 10000000; i++) {

    let toremove = linkedlist.tail;
    let secondchain = toremove.tail.tail.tail;
    secondchain.setHead(linkedlist);
    linkedlist.setTail(secondchain);
    toremove.setHead(false);
    toremove.tail.tail.setTail(false);

    let currval = linkedlist.value;
    currval--;
    if (currval < 1) {
        currval = max;
    }

    while (true) {
        if (toremove.value === currval || toremove.tail.value === currval || toremove.tail.tail.value === currval) {
            currval--;

            if (currval < 1) {
                currval = max;
            }
        } else {
            break;
        }
    }

    let destination = bshashmap[currval];
    let destinationtail = destination.tail;
    destination.setTail(toremove);
    toremove.setHead(destination);
    toremove.tail.tail.setTail(destinationtail);
    destinationtail.setHead(toremove.tail.tail);

    linkedlist = linkedlist.tail;
}

let curr = linkedlist;

let timessince1 = -1;
for(let i = 0; i < max; i++) {
    if(timessince1 > 0 && timessince1 <= 2) {
        console.log(curr.value);
    }
    if(curr.value == 1) {
        timessince1 = 0;
    }
    if(timessince1 >= 0) {
        timessince1 ++;
    }
    curr = curr.tail;
}
