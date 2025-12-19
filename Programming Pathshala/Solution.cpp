// Binary Search

class Solution {
public:
    int minDays(vector<int>& bloomDay, int m, int k) {
        long need = (long)m * k;
        int n = bloomDay.size();
        if (n < need) return -1;
        long  l = -1, r = (int)(1e9);
        while (r - l > 1) {
            long mid = (l + r) /2;
            bool ok = 0;
            int boq = 0, c = 0;
            for (int i = 0; i < n; i++) {
                if (bloomDay[i] <= mid) {
                    c++;
                    if (c == k) {
                        boq++;
                        c = 0;
                    }
                }
                else {
                    c = 0;
                }
            }
            ok = (boq >= m);
            if (ok) {
                r = mid;
            }
            else l = mid;
        }
        return r;
    }
};