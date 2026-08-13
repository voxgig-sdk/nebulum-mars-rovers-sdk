# NebulumMarsRovers SDK utility: make_context

from nebulummarsrovers_sdk.core.context import NebulumMarsRoversContext


def make_context_util(ctxmap, basectx):
    return NebulumMarsRoversContext(ctxmap, basectx)
