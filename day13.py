f = open("day13.in", "r")
lines = f.read().split("\n")

import math

mems = {};

def setmem(seq,num):

    global mems
    for i in range(len(seq)):
        if seq[i] == 'X':
            seq[i] = 0
            setmem(seq,num)
            seq[i] = 1
            setmem(seq,num)
            seq[i] = 'X'
            return
    
    f = 1
    total = 0
    for i in range(len(seq)):
        total += seq[i] * f
        f *= 2

    mems[total] = num

mask = [];
for line in lines:
    words = line.split(" ")
    # print(words)
    if(words[0] == "mask"):
        mask = words[2]
    else:
        mem = int(words[0][4:-1])
        arr = []
        val = int(words[2])
        # print(val)

        arr = []
        num = mem
        while num > 0:
            arr.append(num % 2)
            num /= 2
            num = math.floor(num)

        while len(arr) < len(mask):
            arr.append(0)
        
        for i in range(len(mask)):
            char = mask[len(mask) - i - 1]
            if char == 'X':
                arr[i] = 'X'
            elif char == '1':
                arr[i] = 1
        
        # print(arr)

        setmem(arr, val)

# print(mems)
t = 0
for a in mems.keys():
    t += mems[a]

print(t)
