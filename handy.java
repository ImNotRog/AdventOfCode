
/*
ID: rogerjo2
LANG: JAVA
TASK: handy
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class handy {
    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("handy.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("handy.out")));
        
        HashMap<String,ArrayList<BagNum>> map = new HashMap<>();
        while(in.hasNextLine()) {
            String s = in.nextLine();
            String[] words = s.split(" ");
            String bagname = words[0] + " " + words[1];
            ArrayList<BagNum> curr = new ArrayList<>();
            if(!words[4].equals("no")) {
                for(int i = 4; i < words.length; i+=4) {
                    curr.add(new BagNum(words[i+1] + " " + words[i+2], Integer.parseInt(words[i])));
                }
            }
            map.put(bagname, curr);
        }

        Object[] keyarr = map.keySet().toArray();
        int[] numbags = new int[map.size()];
        for(int i = 0; i < keyarr.length; i++) {
            if(keyarr[i].equals("shiny gold")) {
                numbags[i] ++;
            }
        }

        int total = -1;
        while(true) {
            boolean changed = false;
            for(int i = 0; i < keyarr.length; i++) {
                if(numbags[i] > 0) {
                    if(map.get(keyarr[i]).size() > 0) {
                        int num = numbags[i];
                        changed = true;
                        numbags[i] = 0;
                        for(int j = 0; j < map.get(keyarr[i]).size(); j++) {
                            String name = map.get(keyarr[i]).get(j).name;
                            int index = -1;
                            for(int k = 0; k < keyarr.length; k++) {
                                if(keyarr[k].equals(name)) index = k;
                            }
                            numbags[index] += num * map.get(keyarr[i]).get(j).quantity;
                        }
                        total += num;
                    }
                }
            }
            if(!changed) {
                break;
            }
        }

        for(int i = 0; i < numbags.length; i++) {
            total += numbags[i];
        }

        out.println(total);
        
        out.close(); in.close();
    }
}

class BagNum {
    public String name;
    public int quantity;
    BagNum(String name, int quan) {
        this.name = name;
        this.quantity = quan;
    }
}
