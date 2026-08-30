// You are given an array of integers codeSequence of length n, and an integer maxValue.

// You may modify any element of the array to any integer in the range [1, maxValue], at a cost of 1 per modification (any number of elements may be changed).

// After modifications, you must select one element from the array that is coprime with every other element in the array (i.e., gcd(selected, x) == 1 for all other elements x in the array).

// The lock code is defined as:

// lock code = (value of the selected element) - (total number of modifications made)

// Determine the maximum possible lock code achievable by optimally choosing which elements to modify (and to what values) and which element to select.

// cpp
// int decryptlock(vector<int> codeSequence, int maxValue);

// Constraints:

// n ≤ 1000
// maxValue ≤ 10^9



#include <bits/stdc++.h>
using namespace std;

int decryptlock(vector<int>& codeSequence, int maxValue) {
    int n = codeSequence.size();
    long long lo = max(1LL, (long long)maxValue - n);
    long long best = LLONG_MIN;

    for (long long V = lo; V <= maxValue; V++) {
        bool inArray = false;
        int bad = 0;

        for (int x : codeSequence) {
            if (x == V) inArray = true;
            if (__gcd((long long)x, V) != 1) bad++;
        }

        long long cost;
        if (inArray) {
            int selfContribution = (V > 1) ? 1 : 0;
            cost = bad - selfContribution;
        } else {
            cost = max(bad, 1);
        }

        best = max(best, V - cost);
    }

    return (int)best;
}