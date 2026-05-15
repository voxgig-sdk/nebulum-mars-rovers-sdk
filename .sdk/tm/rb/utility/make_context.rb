# NebulumMarsRovers SDK utility: make_context
require_relative '../core/context'
module NebulumMarsRoversUtilities
  MakeContext = ->(ctxmap, basectx) {
    NebulumMarsRoversContext.new(ctxmap, basectx)
  }
end
