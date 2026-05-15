<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility: prepare_body

class NebulumMarsRoversPrepareBody
{
    public static function call(NebulumMarsRoversContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
