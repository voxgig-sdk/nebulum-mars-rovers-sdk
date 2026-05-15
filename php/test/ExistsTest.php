<?php
declare(strict_types=1);

// NebulumMarsRovers SDK exists test

require_once __DIR__ . '/../nebulummarsrovers_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = NebulumMarsRoversSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
