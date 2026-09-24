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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Camera',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'earth_date',
              'title' => 'Earth Date',
              'type' => '`$STRING`',
              'short' => 'Earth date when the photo was taken',
              'format' => 'date',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'Unique identifier for the photo',
            ],
            [
              'name' => 'img_src',
              'title' => 'Img Src',
              'type' => '`$STRING`',
              'short' => 'URL to the image file',
              'format' => 'uri',
            ],
            [
              'name' => 'rover',
              'title' => 'Rover',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'sol',
              'title' => 'Sol',
              'type' => '`$INTEGER`',
              'short' => 'Martian sol (day) when the photo was taken',
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
                  'parts' => [
                    'rovers',
                    'curiosity',
                    'photos',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.photos`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2015-06-03',
                      ],
                      [
                        'name' => 'sol',
                        'orig' => 'sol',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 3718,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'earth_date',
                      'sol',
                    ],
                  ],
                ],
                [
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
                  'parts' => [
                    'rovers',
                    'perseverance',
                    'photos',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.photos`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '2025-11-06',
                      ],
                      [
                        'name' => 'sol',
                        'orig' => 'sol',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 1676,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'earth_date',
                      'sol',
                    ],
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
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
                  'parts' => [
                    'photos',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 878,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
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
