# NebulumMarsRovers SDK feature factory

from feature.base_feature import NebulumMarsRoversBaseFeature
from feature.test_feature import NebulumMarsRoversTestFeature


def _make_feature(name):
    features = {
        "base": lambda: NebulumMarsRoversBaseFeature(),
        "test": lambda: NebulumMarsRoversTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
