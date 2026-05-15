# NebulumMarsRovers SDK utility: make_context

from core.context import NebulumMarsRoversContext


def make_context_util(ctxmap, basectx):
    return NebulumMarsRoversContext(ctxmap, basectx)
