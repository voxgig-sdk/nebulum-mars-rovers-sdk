# NebulumMarsRovers SDK configuration

module NebulumMarsRoversConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "camera",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "earth_date",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "img_src",
              "type" => "`$STRING`",
            },
            {
              "name" => "rover",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sol",
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "photo",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2015-06-03",
                        "kind" => "query",
                        "name" => "earth_date",
                        "orig" => "earth_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 3718,
                        "kind" => "query",
                        "name" => "sol",
                        "orig" => "sol",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                    "res" => "`body.photos`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "2025-11-06",
                        "kind" => "query",
                        "name" => "earth_date",
                        "orig" => "earth_date",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 1676,
                        "kind" => "query",
                        "name" => "sol",
                        "orig" => "sol",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                    "res" => "`body.photos`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 878,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
