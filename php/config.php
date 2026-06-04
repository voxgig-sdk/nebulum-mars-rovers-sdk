<?php
declare(strict_types=1);

// NebulumMarsRovers SDK configuration

class NebulumMarsRoversConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "NebulumMarsRovers",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'earth_date',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'img_src',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'rover',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'sol',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 5,
            ],
          ],
          'name' => 'photo',
          'op' => [
            'list' => [
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
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 3718,
                        'kind' => 'query',
                        'name' => 'sol',
                        'orig' => 'sol',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/rovers/curiosity/photos',
                  'parts' => [
                    'rovers',
                    'curiosity',
                    'photos',
                  ],
                  'select' => [
                    'exist' => [
                      'earth_date',
                      'sol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '2025-11-06',
                        'kind' => 'query',
                        'name' => 'earth_date',
                        'orig' => 'earth_date',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 1676,
                        'kind' => 'query',
                        'name' => 'sol',
                        'orig' => 'sol',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/rovers/perseverance/photos',
                  'parts' => [
                    'rovers',
                    'perseverance',
                    'photos',
                  ],
                  'select' => [
                    'exist' => [
                      'earth_date',
                      'sol',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 1,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
            ],
            'load' => [
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
                        'active' => true,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/photos/{id}',
                  'parts' => [
                    'photos',
                    '{id}',
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
