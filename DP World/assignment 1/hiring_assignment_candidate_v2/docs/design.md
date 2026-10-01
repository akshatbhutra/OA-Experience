# Departure-Ordered Stack Placement

## Summary

`solution.departure_grouped.DepartureGroupedStrategy` is a lightweight online
heuristic inspired by priority-based container yard storage research. It uses
arrival-time metadata while preserving deterministic placement and the yard's
hard stack constraints.

The research reference is **Dynamic Attention Model - A Deep Reinforcement
Learning Approach for the Container Relocation Problem** (2023, Springer,
DOI: [10.1007/978-3-031-36822-6_24](https://doi.org/10.1007/978-3-031-36822-6_24)).
That work prioritizes relocation-sensitive decisions from the current yard
state. This submission applies the same principle as an interpretable online
priority rule rather than requiring a trained neural policy.

The main principle is to keep the yard balanced first. A shallow stack exposes
fewer containers to future retrievals, so stack height is the primary ranking
criterion. Among columns at the same height, the strategy prefers a column
whose top container is compatible with the incoming container's departure
horizon: an earlier or equal departure should not be buried beneath a later
departure. Exact departure-time matches and the HEAVY-to-LIGHT loading order
are secondary tie-breakers.

## Algorithm

For every bay-row column, the strategy rejects full columns, reads the current
height and top-container metadata, and ranks the candidate lexicographically
by lowest height, departure ordering, exact departure-time match, weight order,
and stable bay/row order. It returns the next tier of the highest-ranked
column.

Empty columns receive neutral compatibility scores, so the policy cannot create
deep stacks merely to force vessel or port affinity. Train experiments rejected
strong vessel/port grouping because it increased reshuffles on this synthetic
stream despite remaining valid.

## Complexity and trade-offs

There are at most 9,600 bay-row columns. Each placement scans them once, so the
time complexity is O(B), where B is the number of bay-row columns, with O(1)
additional strategy memory. It avoids snapshots and global optimization, so
runtime remains predictable for the 20k-event evaluation streams.

The trade-off is that this is not a globally optimal assignment: it cannot
reserve a column for a future vessel or see the complete retrieval sequence.
The balanced-stack objective therefore remains dominant, while departure and
weight metadata are used only where they are least likely to create tall,
mixed stacks.

## Evaluation notes

The supplied greedy test reference produced 7,416 total reshuffles, or 0.7687
per retrieval, with zero constraint violations. Aggressive grouping experiments
were rejected after they increased reshuffles. The final candidate and its
measured output are stored in `results/results.json`.