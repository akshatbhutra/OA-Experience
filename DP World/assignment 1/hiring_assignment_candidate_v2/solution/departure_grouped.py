"""Departure-aware, group-compatible container placement strategy."""

from datetime import datetime
from typing import Optional, Tuple

from src.models import Event, Position
from src.placement_interface import PlacementStrategy
from src.yard_state import YardState


class DepartureGroupedStrategy(PlacementStrategy):
    """Keep containers likely to be retrieved together in compatible stacks."""

    _WEIGHT_RANK = {"LIGHT": 1, "MEDIUM": 2, "HEAVY": 3}

    def initialize(self, yard_layout: dict, initial_state: dict) -> None:
        self._layout = yard_layout

    @staticmethod
    def _time(value: str) -> datetime:
        try:
            return datetime.fromisoformat(value)
        except (TypeError, ValueError):
            return datetime.max

    @classmethod
    def _weight_rank(cls, weight_class: str) -> int:
        return cls._WEIGHT_RANK.get(weight_class.upper(), 2)

    def _candidate_score(
        self,
        yard_state: YardState,
        event: Event,
        block: str,
        bay: int,
        row: int,
    ) -> Optional[Tuple[int, int, int, int, int]]:
        block_info = yard_state.blocks[block]
        height = yard_state.get_stack_height(block, bay, row)
        if height >= block_info.tiers:
            return None

        top_id = yard_state.get_container_at(block, bay, row, height)
        if top_id is None:
            group_score = 0
            order_score = 0
            weight_score = 0
        else:
            top = yard_state.get_container_info(top_id)
            if top is None:
                return None

            incoming_time = self._time(event.departure_time)
            top_time = self._time(top.departure_time)
            order_score = 2 if incoming_time <= top_time else -2

            incoming_weight = self._weight_rank(event.weight_class)
            top_weight = self._weight_rank(top.weight_class)
            weight_score = 1 if incoming_weight >= top_weight else -1

            same_departure = top.departure_time == event.departure_time
            group_score = (1 if same_departure else 0)

        # Keep the lowest stacks as the primary objective; use compatibility
        # to choose among similarly shallow columns.
        return (-height, order_score, group_score, weight_score, -bay * 100 - row)

    def place_container(self, yard_state: YardState, event: Event) -> Position:
        best_position = None
        best_score = None

        for block_name, block_info in yard_state.blocks.items():
            for bay in range(1, block_info.bays + 1):
                for row in range(1, block_info.rows + 1):
                    score = self._candidate_score(
                        yard_state, event, block_name, bay, row)
                    if score is not None and (best_score is None or score > best_score):
                        height = yard_state.get_stack_height(block_name, bay, row)
                        best_score = score
                        best_position = Position(block_name, bay, row, height + 1)

        if best_position is None:
            first_block = next(iter(yard_state.blocks))
            return Position(first_block, 1, 1, 999)
        return best_position
