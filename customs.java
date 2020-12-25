

/*
ID: rogerjo2
LANG: JAVA
TASK: customs
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class customs {
    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("customs.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("customs.out")));
        
        int total = 0;
        while(in.hasNextLine()) {
            // HashSet<Character> counted = new HashSet<>();
            int[] chars = new int[26];
            String alpha = "abcdefghijklmnopqrstuvwxyz";

            int count = 0;

            while(true) {
                if(!in.hasNextLine()) {
                    break;
                }
                String line = in.nextLine();
                if(line.length() == 0) {
                    break;
                } else {
                    for(char c : line.toCharArray()) {
                        chars[alpha.indexOf(c + "")]++;
                    }
                }
                count++;
            }

            for(int n : chars) {
                if(n == count) {
                    total++;
                }
            }
            
        }
        out.println(total);
        out.close(); in.close();
    }
}