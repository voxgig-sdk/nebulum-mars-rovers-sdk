package = "voxgig-sdk-nebulum-mars-rovers"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/nebulum-mars-rovers-sdk.git"
}
description = {
  summary = "NebulumMarsRovers SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nebulum-mars-rovers_sdk"] = "nebulum-mars-rovers_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
