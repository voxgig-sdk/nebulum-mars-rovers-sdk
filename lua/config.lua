-- NebulumMarsRovers SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NebulumMarsRovers",
      slug = "nebulum-mars-rovers",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["now"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://rovers.nebulum.one/api/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["photo"] = {},
      },
    },
    entity = {
      ["photo"] = {
        ["fields"] = {
          {
            ["name"] = "camera",
            ["title"] = "Camera",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "earth_date",
            ["title"] = "Earth Date",
            ["type"] = "`$STRING`",
            ["short"] = "Earth date when the photo was taken",
            ["format"] = "date",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "Unique identifier for the photo",
          },
          {
            ["name"] = "img_src",
            ["title"] = "Img Src",
            ["type"] = "`$STRING`",
            ["short"] = "URL to the image file",
            ["format"] = "uri",
          },
          {
            ["name"] = "rover",
            ["title"] = "Rover",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sol",
            ["title"] = "Sol",
            ["type"] = "`$INTEGER`",
            ["short"] = "Martian sol (day) when the photo was taken",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "photo",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rovers/curiosity/photos",
                ["segments"] = {
                  {
                    ["lit"] = "rovers",
                  },
                  {
                    ["lit"] = "curiosity",
                  },
                  {
                    ["lit"] = "photos",
                  },
                },
                ["parts"] = {
                  "rovers",
                  "curiosity",
                  "photos",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.photos`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "earth_date",
                      ["orig"] = "earth_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2015-06-03",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "sol",
                      ["orig"] = "sol",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 3718,
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rovers/perseverance/photos",
                ["segments"] = {
                  {
                    ["lit"] = "rovers",
                  },
                  {
                    ["lit"] = "perseverance",
                  },
                  {
                    ["lit"] = "photos",
                  },
                },
                ["parts"] = {
                  "rovers",
                  "perseverance",
                  "photos",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.photos`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "earth_date",
                      ["orig"] = "earth_date",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["example"] = "2025-11-06",
                      ["field"] = true,
                    },
                    {
                      ["name"] = "sol",
                      ["orig"] = "sol",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 1676,
                      ["field"] = true,
                    },
                  },
                },
                ["select"] = {},
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/photos/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "photos",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "photos",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 878,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["response"] = {
                  ["kind"] = "json",
                  ["media"] = "application/json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
