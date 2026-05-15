<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility: result_body

class NebulumMarsRoversResultBody
{
    public static function call(NebulumMarsRoversContext $ctx): ?NebulumMarsRoversResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
