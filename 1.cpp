// Statement:

// You are given a scheduling system with n tasks, numbered 1 to n. You are given an array taskDependency of length n, where taskDependency[i] (1-indexed value, 1 ≤ taskDependency[i] ≤ n) represents the task that task (i+1) depends on.

// A valid dependency configuration must satisfy:

// Each task depends on exactly one other task (this is already guaranteed by the array structure — one outgoing edge per task).
// No task may depend on itself, directly or indirectly, except for exactly one special task — the final task — which depends on itself (a self-loop).
// All tasks must form a single chain of dependencies that eventually leads into the final task (i.e., the whole structure must be one connected chain ending in the self-loop, with no separate cycles or disconnected components).

// In one change, you may modify any single task's dependency (taskDependency[i]) to point to any other task, at a cost of 1.

// Return the minimum number of changes required to transform the given taskDependency array into a valid configuration.


#include <vector>
using namespace std;

int findMin(vector<int>& taskDependency) {
    int n = taskDependency.size();
    if (n == 0) return 0;

    vector<int> edge(n);
    for (int i = 0; i < n; i++) edge[i] = taskDependency[i] - 1;

    vector<int> state(n, 0);
    vector<int> pos(n, -1);
    int cycles = 0;
    bool hasSelfLoop = false;

    for (int i = 0; i < n; i++) {
        if (state[i] != 0) continue;
        vector<int> path;
        int cur = i;
        while (state[cur] == 0) {
            state[cur] = 1;
            pos[cur] = (int)path.size();
            path.push_back(cur);
            cur = edge[cur];
        }
        if (state[cur] == 1) {
            cycles++;
            if ((int)path.size() - pos[cur] == 1) hasSelfLoop = true;
        }
        for (int node : path) state[node] = 2;
    }

    return hasSelfLoop ? cycles - 1 : cycles;
}