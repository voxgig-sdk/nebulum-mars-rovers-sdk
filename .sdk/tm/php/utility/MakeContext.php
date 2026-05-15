<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NebulumMarsRoversMakeContext
{
    public static function call(array $ctxmap, ?NebulumMarsRoversContext $basectx): NebulumMarsRoversContext
    {
        return new NebulumMarsRoversContext($ctxmap, $basectx);
    }
}
