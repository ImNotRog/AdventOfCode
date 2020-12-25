
/*
ID: rogerjo2
LANG: JAVA
TASK: toboggan
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class toboggan {

    public static int trees(int right, int down, char[][] map) {

        int m = map.length;
        int n = map[0].length;

        int trees = 0;

        int pos = 0;
        for(int i = 0; i < m; i += down) {
            if(map[i][pos] == '#') {
                trees++;
            }

            pos += right;
            pos %= n;
        }

        return trees;
    }

    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("toboggan.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("toboggan.out")));
        

        int m = 0;
        int n = 0;
        ArrayList<String> tempmap = new ArrayList<>();
        while(in.hasNextLine()) {
            tempmap.add(in.nextLine());
        }
        m = tempmap.size();
        n = tempmap.get(0).length();

        char[][] map = new char[m][n];

        for(int i = 0; i < m; i++) {
            map[i] = tempmap.get(i).toCharArray();
        }

        long a = toboggan.trees(1, 1, map);
        long b = toboggan.trees(3, 1, map);
        long c = toboggan.trees(5, 1, map);
        long d = toboggan.trees(7, 1, map);
        long e = toboggan.trees(1, 2, map);
        
        out.println(a*b*c*d*e);

        out.close(); in.close();
    }
}