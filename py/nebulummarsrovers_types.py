# Typed models for the NebulumMarsRovers SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Photo:
    camera: Optional[dict] = None
    earth_date: Optional[str] = None
    id: Optional[int] = None
    img_src: Optional[str] = None
    rover: Optional[dict] = None
    sol: Optional[int] = None


@dataclass
class PhotoLoadMatch:
    id: int


@dataclass
class PhotoListMatch:
    camera: Optional[dict] = None
    earth_date: Optional[str] = None
    id: Optional[int] = None
    img_src: Optional[str] = None
    rover: Optional[dict] = None
    sol: Optional[int] = None

