# NebulumMarsRovers SDK configuration

module NebulumMarsRoversConfig
  def self.make_config
    {
      "main" => {
        "name" => "NebulumMarsRovers",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://rovers.nebulum.one/api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "photo" => {},
        },
      },
      "entity" => {
        "photo" => {
          "fields" => [
            {
              "active" => true,
              "name" => "camera",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "earth_date",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "img_src",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "rover",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "sol",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 5,
            },
          ],
          "name" => "photo",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "2015-06-03",
                        "kind" => "query",
                        "name" => "earth_date",
                        "orig" => "earth_date",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 3718,
                        "kind" => "query",
                        "name" => "sol",
                        "orig" => "sol",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/rovers/curiosity/photos",
                  "parts" => [
                    "rovers",
                    "curiosity",
                    "photos",
                  ],
                  "select" => {
                    "exist" => [
                      "earth_date",
                      "sol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "2025-11-06",
                        "kind" => "query",
                        "name" => "earth_date",
                        "orig" => "earth_date",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 1676,
                        "kind" => "query",
                        "name" => "sol",
                        "orig" => "sol",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/rovers/perseverance/photos",
                  "parts" => [
                    "rovers",
                    "perseverance",
                    "photos",
                  ],
                  "select" => {
                    "exist" => [
                      "earth_date",
                      "sol",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => 878,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/photos/{id}",
                  "parts" => [
                    "photos",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    NebulumMarsRoversFeatures.make_feature(name)
  end
end
