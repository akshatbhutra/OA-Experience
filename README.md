# OA-Experience

24 August 2025 - Gave Online Assessement of SD-1 role at Wokelo AI. (CoderByte Platform)

Questions:

A) MCQ Questions

1. 

B) Coding Questions

**Problem Statement 1: (Reference: https://leetcode.com/problems/minimum-window-substring/)
**
Have the function StringChallenge(strArr) take the array of strings stored in strArr, which will contain only two strings.

The first parameter is the string N.

The second parameter is the string K, which is a set of characters.

Your goal is to determine the smallest substring of N that contains all the characters in K.

**Example 1:
**If strArr is ["aaabaaddae", "aed"], then the smallest substring of N that contains the characters a, e, and d is "dae", which is located at the end of the string.
So for this example, your program should return the string:

dae

**Example 2:
**If strArr is ["aabdccdbcacd", "aad"], then the smallest substring of N that contains all the characters in K is "aabd", which is located at the beginning of the string.
So for this example, your program should return the string:

aabd


**Constraints:
**
Both parameters will be strings ranging in length from 1 to 50 characters.

All of K's characters will exist somewhere in the string N.

Both strings will contain only lowercase alphabetic characters.

**Final Step:
**Once your function is working, take the final output string and:

Concatenate it with your ChallengeToken.


**Problem Statement 2:
**
Imagine you are writing a function within a Django application to parse JSON data.

In the Python file, write a program to perform a GET request on the following route:

http://coderbyte.com/api/challenges/json/json-cleaning


After retrieving the data, clean the JSON object according to the following rules:

Remove all keys that have values of "N/A", "-", or an empty string "".

If one of these values appears in an array, remove only that single item from the array.

Finally, print the modified object as a string.

**Example Input:
**
{"name":{"first":"Daniel","middle":"N/A","last":"Smith"},"age":45}


**Example Output:
**
{"name":{"first":"Daniel","last":"Smith"},"age":45}


**Starter Code (to be completed):
**
import requests
import json

def clean_data():
    r = requests.get('https://coderbyte.com/api/challenges/json/json-cleaning')
    return r.json()

Replace every third character in this new string with the character 'X'.


**Problem Statement 3:
**
Have the function ArrayChallenge(strArr) take the parameter strArr, which will be an array containing:

One letter representing a Tetris piece type (capital letter).

Followed by 12 numbers representing the fill levels for the 12 columns of the Tetris board.

Your goal is to calculate the greatest number of horizontal lines that can be completed when the given piece is dropped onto the board.

Assume the piece is dropped immediately after being rotated and moved horizontally from the top.

Complicated combinations of vertical and horizontal adjustments (like sliding after partial descent) are excluded.

**Example:
**
Input:

["L","3","4","4","5","6","2","0","6","5","3","6","6"]


The board will look something like this:

(columns filled to the given heights)


In this case, the L piece can be rotated and dropped in columns 6–7, which completes 3 full rows of blocks.

Output:

3
