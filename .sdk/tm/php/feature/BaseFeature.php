<?php
declare(strict_types=1);

// NebulumMarsRovers SDK base feature

class NebulumMarsRoversBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NebulumMarsRoversContext $ctx, array $options): void {}
    public function PostConstruct(NebulumMarsRoversContext $ctx): void {}
    public function PostConstructEntity(NebulumMarsRoversContext $ctx): void {}
    public function SetData(NebulumMarsRoversContext $ctx): void {}
    public function GetData(NebulumMarsRoversContext $ctx): void {}
    public function GetMatch(NebulumMarsRoversContext $ctx): void {}
    public function SetMatch(NebulumMarsRoversContext $ctx): void {}
    public function PrePoint(NebulumMarsRoversContext $ctx): void {}
    public function PreSpec(NebulumMarsRoversContext $ctx): void {}
    public function PreRequest(NebulumMarsRoversContext $ctx): void {}
    public function PreResponse(NebulumMarsRoversContext $ctx): void {}
    public function PreResult(NebulumMarsRoversContext $ctx): void {}
    public function PreDone(NebulumMarsRoversContext $ctx): void {}
    public function PreUnexpected(NebulumMarsRoversContext $ctx): void {}
}
