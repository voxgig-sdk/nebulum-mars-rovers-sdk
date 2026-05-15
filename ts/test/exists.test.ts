
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NebulumMarsRoversSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NebulumMarsRoversSDK.test()
    equal(null !== testsdk, true)
  })

})
