# ProjectName SDK exists test

import pytest
from nebulummarsrovers_sdk import NebulumMarsRoversSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = NebulumMarsRoversSDK.test(None, None)
        assert testsdk is not None
