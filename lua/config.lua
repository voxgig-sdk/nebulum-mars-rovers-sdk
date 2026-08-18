-- NebulumMarsRovers SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "NebulumMarsRovers",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "earth_date",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "img_src",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "rover",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sol",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "photo",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "2015-06-03",
                      ["kind"] = "query",
                      ["name"] = "earth_date",
                      ["orig"] = "earth_date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 3718,
                      ["kind"] = "query",
                      ["name"] = "sol",
                      ["orig"] = "sol",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rovers/curiosity/photos",
                ["parts"] = {
                  "rovers",
                  "curiosity",
                  "photos",
                },
                ["select"] = {
                  ["exist"] = {
                    "earth_date",
                    "sol",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.photos`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "2025-11-06",
                      ["kind"] = "query",
                      ["name"] = "earth_date",
                      ["orig"] = "earth_date",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 1676,
                      ["kind"] = "query",
                      ["name"] = "sol",
                      ["orig"] = "sol",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/rovers/perseverance/photos",
                ["parts"] = {
                  "rovers",
                  "perseverance",
                  "photos",
                },
                ["select"] = {
                  ["exist"] = {
                    "earth_date",
                    "sol",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.photos`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 878,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/photos/{id}",
                ["parts"] = {
                  "photos",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
