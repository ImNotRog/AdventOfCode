
/*
ID: rogerjo2
LANG: JAVA
TASK: pwphilo
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

public class pwphilo {
    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("pwphilo.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("pwphilo.out")));
        
        int count = 0;

        while(in.hasNextLine()) {
            String str = in.nextLine();
            int dash = str.indexOf('-');
            int space = str.indexOf(' ');
            if(dash == -1) {
                break;
            }
            int from = Integer.parseInt( str.substring(0,dash) );
            int to = Integer.parseInt(str.substring(dash+1,space));

            char c = str.charAt(space+1);

            String targetstr = str.substring(space+3);

            int num = 0;
            for(char curr : targetstr.toCharArray()) {
                if(curr == c) {
                    num++;
                }
            }

            if(num >= from && num <= to) {
                count++;
            }
            
        }

        out.println(count);
        out.flush();

        out.close(); in.close();
    }
}