<?php
declare(strict_types=1);

// Typed models for the NebulumMarsRovers SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Photo entity data model. */
class Photo
{
    public ?array $camera = null;
    public ?string $earth_date = null;
    public ?int $id = null;
    public ?string $img_src = null;
    public ?array $rover = null;
    public ?int $sol = null;
}

/** Request payload for Photo#load. */
class PhotoLoadMatch
{
    public int $id;
}

/** Request payload for Photo#list. */
class PhotoListMatch
{
    public ?array $camera = null;
    public ?string $earth_date = null;
    public ?int $id = null;
    public ?string $img_src = null;
    public ?array $rover = null;
    public ?int $sol = null;
}

