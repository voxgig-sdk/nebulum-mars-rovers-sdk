-- NebulumMarsRovers SDK error

local NebulumMarsRoversError = {}
NebulumMarsRoversError.__index = NebulumMarsRoversError


function NebulumMarsRoversError.new(code, msg, ctx)
  local self = setmetatable({}, NebulumMarsRoversError)
  self.is_sdk_error = true
  self.sdk = "NebulumMarsRovers"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function NebulumMarsRoversError:error()
  return self.msg
end


function NebulumMarsRoversError:__tostring()
  return self.msg
end


return NebulumMarsRoversError
