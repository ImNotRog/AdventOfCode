


/*
ID: rogerjo2
LANG: JAVA
TASK: day3
*/

import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class day3 {
    public static void main(String[] args) throws IOException {
        Scanner in = new Scanner(new FileReader("day3.in"));
        PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter("day3.out")));
        
        ArrayList<String> necessary = new ArrayList<>();
        necessary.add("byr");
        necessary.add("iyr");
        necessary.add("eyr");
        necessary.add("hgt");
        necessary.add("hcl");
        necessary.add("ecl");
        necessary.add("pid");

        int count = 0;

        while(in.hasNextLine()) {
            
            boolean[] validity = new boolean[necessary.size()];
            while(true) {

                if(!in.hasNextLine()) break;

                String line = in.nextLine();
                if(line.length() == 0) break;

                String[] keyvals = line.split(" ");
                for(String pair : keyvals) {
                    String key = pair.substring(0,3);
                    int n = necessary.indexOf(key);

                    boolean valid = false;

                    String val = pair.substring(4);
                    if(key.equals("byr")) {
                        int y = Integer.parseInt(val);
                        if(y >= 1920 && y <= 2002) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    } else if(key.equals("iyr"))  {
                        int y = Integer.parseInt(val);
                        if(y >= 2010 && y <= 2020) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    } else if(key.equals("eyr"))  {
                        int y = Integer.parseInt(val);
                        if(y >= 2020 && y <= 2030) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    } else if(key.equals("hgt") && val.length() > 2) {
                        

                        int num = Integer.parseInt( val.substring(0, val.length() - 2) );
                        if(val.substring(val.length() - 2).equals("cm")) {
                            if(num >= 150 && num <= 193) {
                                valid = true;
                            } else {
                                valid = false;
                            }
                        } else {
                            if(num >= 59 && num <= 76) {
                                valid = true;
                            } else {
                                valid = false;
                            }
                        }
                    } else if(key.equals("hcl")) {
                        valid = true;
                        if(val.charAt(0) != '#') valid = false;

                        String part = val.substring(1);
                        if(part.length() != 6) valid = false;
                        for(char c : part.toCharArray()) { 
                            String t = "abcdef0123456789";
                            if(t.indexOf(c) == -1) {
                                valid = false;
                            }
                        }
                    } else if(key.equals("ecl")) {
                        ArrayList<String> t = new ArrayList<>();
                        t.add("amb");
                        t.add("blu");
                        t.add("brn");
                        t.add("gry");
                        t.add("grn");
                        t.add("hzl");
                        t.add("oth");
                        if(t.indexOf(val) != -1) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    } else if(key.equals("pid")) {
                        // while(val.charAt(0) == '0') {
                            // val = val.substring(1);
                        // }
                        if(val.length() == 9) {
                            valid = true;
                        } else {
                            valid = false;
                        }
                    }

                    if(n != -1 && valid) {
                        validity[n] = true;
                    }
                }
            }

            boolean ok = true;
            for(int i = 0; i < validity.length; i++) {
                if(!validity[i]) ok = false;
            }
            
            if(ok) { 
                count++;
            }
            out.println(Arrays.toString(validity));
            out.println(count);

        }

        out.println(count);
        
        out.close(); in.close();
    }
}