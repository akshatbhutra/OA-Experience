#include <iostream>
#include <string>
using namespace std;

string PalindromicSubstring(string str) {
    int n = str.size();
    if (n == 0) return "none";

    int start = 0, maxLen = 1;

    // Helper lambda: expand around center
    auto expandAroundCenter = [&](int left, int right) {
        while (left >= 0 && right < n && str[left] == str[right]) {
            int len = right - left + 1;
            if (len > maxLen) {
                maxLen = len;
                start = left;
            }
            left--;
            right++;
        }
    };

    for (int i = 0; i < n; i++) {
        // Odd length palindrome
        expandAroundCenter(i, i);
        // Even length palindrome
        expandAroundCenter(i, i + 1);
    }

    if (maxLen < 3) return "none"; // return "none" if no palindrome longer than 2
    return str.substr(start, maxLen);
}

// keep this function call here
int main(void) { 
    string input;
    getline(cin, input);   // read input from stdin
    cout << PalindromicSubstring(input);
    return 0;
}
