// In the Java file, write a program to perform a GET request on the route htttp://coderbyte.com/api/challenges/json/age-counting which contains a data key and the value is a string which contains items in the format: key=STRING, age=INTEGER. Your goal is to count how many items exist that have an age equal to or greater than 50, and print this final value.

// Example Input
// {"data":"key=IAfpK, age=58, key=WNVdi, age=64, key=jp9zt, age=47"}

// Example Output
// 2

import java.io.*;
import java.net.*;
import java.util.*;
import com.google.gson.*;

class Main {  
  public static void main (String[] args) { 
    try {
      // Fetch API response
      URL url = new URL("https://coderbyte.com/api/challenges/json/age-counting");
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");

      BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String inputLine;
      StringBuilder content = new StringBuilder();
      while ((inputLine = in.readLine()) != null) {
        content.append(inputLine);
      }
      in.close();

      // Parse JSON
      JsonObject jsonObject = JsonParser.parseString(content.toString()).getAsJsonObject();
      String data = jsonObject.get("data").getAsString();

      // Split by commas, parse ages
      String[] items = data.split(",");
      int count = 0;
      for (String item : items) {
        item = item.trim();
        if (item.startsWith("age=")) {
          int age = Integer.parseInt(item.substring(4));
          if (age >= 50) {
            count++;
          }
        }
      }

      // Print result
      System.out.println(count);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }   
}
