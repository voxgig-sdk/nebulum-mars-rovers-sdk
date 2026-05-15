# NebulumMarsRovers SDK exists test

require "minitest/autorun"
require_relative "../NebulumMarsRovers_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NebulumMarsRoversSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
