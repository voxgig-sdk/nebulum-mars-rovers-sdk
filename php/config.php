<?php
declare(strict_types=1);

// NebulumMarsRovers SDK configuration

class NebulumMarsRoversConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NebulumMarsRovers",
                "slug" => "nebulum-mars-rovers",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://rovers.nebulum.one/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "photo" => [],
                ],
            ],
            "entity" => [
        'photo' => [
          'fields' => [
            [
              'name' => 'camera',
              'type' => '`$OBJECT`',
            ],
            [
              'format' => 'date',
              'name' => 'earth_date',
              'short' => 'Earth date when the photo was taken',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the photo',
              'type' => '`$INTEGER`',
            ],
            [
              'format' => 'uri',
              'name' => 'img_src',
              'short' => 'URL to the image file',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'rover',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sol',
              'short' => 'Martian sol (day) when the photo was taken',
              'type' => '`$INTEGER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'photo',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2015-06-03',
                        'kind' => 'query',
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 3718,
                        'kind' => 'query',
                        'name' => 'sol',
                        'orig' => 'sol',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rovers/curiosity/photos',
                  'segments' => [
                    [
                      'lit' => 'rovers',
                    ],
                    [
                      'lit' => 'curiosity',
                    ],
                    [
                      'lit' => 'photos',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'earth_date',
                      'sol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.photos`',
                  ],
                  'parts' => [
                    'rovers',
                    'curiosity',
                    'photos',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2025-11-06',
                        'kind' => 'query',
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 1676,
                        'kind' => 'query',
                        'name' => 'sol',
                        'orig' => 'sol',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/rovers/perseverance/photos',
                  'segments' => [
                    [
                      'lit' => 'rovers',
                    ],
                    [
                      'lit' => 'perseverance',
                    ],
                    [
                      'lit' => 'photos',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'earth_date',
                      'sol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.photos`',
                  ],
                  'parts' => [
                    'rovers',
                    'perseverance',
                    'photos',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 878,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/photos/{id}',
                  'segments' => [
                    [
                      'lit' => 'photos',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'photos',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NebulumMarsRoversFeatures::make_feature($name);
    }
}
