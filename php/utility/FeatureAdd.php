<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility: feature_add

class NebulumMarsRoversFeatureAdd
{
    public static function call(NebulumMarsRoversContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
