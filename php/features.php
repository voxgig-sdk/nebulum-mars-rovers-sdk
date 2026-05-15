<?php
declare(strict_types=1);

// NebulumMarsRovers SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NebulumMarsRoversFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NebulumMarsRoversBaseFeature();
            case "test":
                return new NebulumMarsRoversTestFeature();
            default:
                return new NebulumMarsRoversBaseFeature();
        }
    }
}
