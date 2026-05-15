# NebulumMarsRovers SDK utility: feature_add
module NebulumMarsRoversUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
