# NebulumMarsRovers SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NebulumMarsRoversFeatures
  def self.make_feature(name)
    case name
    when "base"
      NebulumMarsRoversBaseFeature.new
    when "test"
      NebulumMarsRoversTestFeature.new
    else
      NebulumMarsRoversBaseFeature.new
    end
  end
end
