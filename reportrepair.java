
/*
ID: rogerjo2
LANG: JAVA
TASK: reportrepair
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class reportrepair {
    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("reportrepair.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("reportrepair.out")));
        
        ArrayList<Integer> nums = new ArrayList<>();
        while(in.hasNextInt()) {
            nums.add(in.nextInt());
        }

        int target = 2020;

        Integer[] sorted = new Integer[nums.size()];
        sorted = nums.toArray(sorted);

        Arrays.sort(sorted);

        int left = 0;
        int right = sorted.length - 1;

        
        while(true) {
            
            if(sorted[left] + sorted[right] > target) {
                right--;
            } else if(sorted[left] + sorted[right] < target) {
                left++;
            } else {
                out.println(sorted[left] * sorted[right]);
                break;
            }

            if(left > right) {
                break;
            }
        }

        out.flush();
        
        out.close(); in.close();
    }
}