
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NebulumMarsRoversSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = NebulumMarsRoversSDK.test()
    equal(testsdk instanceof NebulumMarsRoversSDK, true,
      'NebulumMarsRoversSDK.test() must return a client synchronously')
  })

})
