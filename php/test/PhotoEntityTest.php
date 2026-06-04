<?php
declare(strict_types=1);

// Photo entity test

require_once __DIR__ . '/../nebulummarsrovers_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PhotoEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = NebulumMarsRoversSDK::test(null, null);
        $ent = $testsdk->Photo(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = photo_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "photo." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set NEBULUMMARSROVERS_TEST_PHOTO_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $photo_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.photo")));
        $photo_ref01_data = null;
        if (count($photo_ref01_data_raw) > 0) {
            $photo_ref01_data = Helpers::to_map($photo_ref01_data_raw[0][1]);
        }

        // LIST
        $photo_ref01_ent = $client->Photo(null);
        $photo_ref01_match = [];

        [$photo_ref01_list_result, $err] = $photo_ref01_ent->list($photo_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($photo_ref01_list_result);

        // LOAD
        $photo_ref01_match_dt0 = [
            "id" => $photo_ref01_data["id"],
        ];
        [$photo_ref01_data_dt0_loaded, $err] = $photo_ref01_ent->load($photo_ref01_match_dt0, null);
        $this->assertNull($err);
        $photo_ref01_data_dt0_load_result = Helpers::to_map($photo_ref01_data_dt0_loaded);
        $this->assertNotNull($photo_ref01_data_dt0_load_result);
        $this->assertEquals($photo_ref01_data_dt0_load_result["id"], $photo_ref01_data["id"]);

    }
}

function photo_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/photo/PhotoTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = NebulumMarsRoversSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["photo01", "photo02", "photo03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("NEBULUMMARSROVERS_TEST_PHOTO_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "NEBULUMMARSROVERS_TEST_PHOTO_ENTID" => $idmap,
        "NEBULUMMARSROVERS_TEST_LIVE" => "FALSE",
        "NEBULUMMARSROVERS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["NEBULUMMARSROVERS_TEST_PHOTO_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["NEBULUMMARSROVERS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new NebulumMarsRoversSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["NEBULUMMARSROVERS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["NEBULUMMARSROVERS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
