# NebulumMarsRovers SDK utility: prepare_body
require_relative 'media'
module NebulumMarsRoversUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return NebulumMarsRoversUtilities.raw_body(ctx.reqdata) if NebulumMarsRoversUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
