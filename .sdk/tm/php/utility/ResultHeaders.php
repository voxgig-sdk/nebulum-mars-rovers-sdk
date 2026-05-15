<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility: result_headers

class NebulumMarsRoversResultHeaders
{
    public static function call(NebulumMarsRoversContext $ctx): ?NebulumMarsRoversResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
