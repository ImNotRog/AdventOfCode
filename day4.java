
/*
ID: rogerjo2
LANG: JAVA
TASK: day4
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class day4 {
    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("day4.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("day4.out")));
        
        boolean[] taken = new boolean[1023];

        int max = 0;

        while(in.hasNextLine()) {
            String str = in.nextLine();
            int c = 0;
            int d = 64;
            for(int i = 0; i < 7; i++) {
                c += str.charAt(i) == 'B' ? d : 0;
                d /=2;
            }

            int c2 = 0;
            d = 4;
            for(int i = 0; i < 3; i++) {
                c2 += str.charAt(i + 7) == 'R' ? d : 0;
                d /=2;
            }

            int id = c * 8 + c2;

            if(id > max) {
                max = id;
            }

            taken[id] = true;
        }

        for(int i = 0; i < taken.length; i++) {
            if(!taken[i]) {
                out.println(i);
            }
        }

        // out.println(max);
        
        
        out.close(); in.close();
    }
}