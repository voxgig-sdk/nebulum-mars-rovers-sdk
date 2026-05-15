
import { Context } from './Context'


class NebulumMarsRoversError extends Error {

  isNebulumMarsRoversError = true

  sdk = 'NebulumMarsRovers'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  NebulumMarsRoversError
}

