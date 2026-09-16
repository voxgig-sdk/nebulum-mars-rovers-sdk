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
        "slug" => "nebulum-mars-rovers",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
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
              "format" => "date",
              "name" => "earth_date",
              "short" => "Earth date when the photo was taken",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the photo",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "uri",
              "name" => "img_src",
              "short" => "URL to the image file",
              "type" => "`$STRING`",
            },
            {
              "name" => "rover",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sol",
              "short" => "Martian sol (day) when the photo was taken",
              "type" => "`$INTEGER`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "segments" => [
                    {
                      "lit" => "rovers",
                    },
                    {
                      "lit" => "curiosity",
                    },
                    {
                      "lit" => "photos",
                    },
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
                  "parts" => [
                    "rovers",
                    "curiosity",
                    "photos",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "rovers",
                    },
                    {
                      "lit" => "perseverance",
                    },
                    {
                      "lit" => "photos",
                    },
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
                  "parts" => [
                    "rovers",
                    "perseverance",
                    "photos",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "photos",
                    },
                    {
                      "var" => "id",
                    },
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
                  "parts" => [
                    "photos",
                    "{id}",
                  ],
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
