<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility: prepare_path

class NebulumMarsRoversPreparePath
{
    public static function call(NebulumMarsRoversContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
