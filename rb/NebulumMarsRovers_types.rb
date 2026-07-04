# frozen_string_literal: true

# Typed models for the NebulumMarsRovers SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Photo entity data model.
#
# @!attribute [rw] camera
#   @return [Hash, nil]
#
# @!attribute [rw] earth_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] img_src
#   @return [String, nil]
#
# @!attribute [rw] rover
#   @return [Hash, nil]
#
# @!attribute [rw] sol
#   @return [Integer, nil]
Photo = Struct.new(
  :camera,
  :earth_date,
  :id,
  :img_src,
  :rover,
  :sol,
  keyword_init: true
)

# Request payload for Photo#load.
#
# @!attribute [rw] id
#   @return [Integer]
PhotoLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Photo#list (any subset of Photo fields).
#
# @!attribute [rw] camera
#   @return [Hash, nil]
#
# @!attribute [rw] earth_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] img_src
#   @return [String, nil]
#
# @!attribute [rw] rover
#   @return [Hash, nil]
#
# @!attribute [rw] sol
#   @return [Integer, nil]
PhotoListMatch = Struct.new(
  :camera,
  :earth_date,
  :id,
  :img_src,
  :rover,
  :sol,
  keyword_init: true
)

