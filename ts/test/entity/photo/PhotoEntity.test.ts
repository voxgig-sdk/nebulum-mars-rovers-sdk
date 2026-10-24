

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NebulumMarsRoversSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PhotoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEBULUM_MARS_ROVERS_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEBULUM_MARS_ROVERS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NebulumMarsRoversSDK.test()
    const ent = testsdk.Photo()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('photo hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of NebulumMarsRoversSDK.test(offline).Photo().stream('list')) { }
    }, /offline/)

    for await (const _item of NebulumMarsRoversSDK.test(offline).Photo()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = NebulumMarsRoversSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Photo().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of NebulumMarsRoversSDK.test().Photo().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new NebulumMarsRoversSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Photo().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Photo().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = NebulumMarsRoversSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Photo().list({"earth_date":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEBULUM_MARS_ROVERS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"camera":{"a":true,"h":"Camera","n":"camera","r":false,"t":"`$OBJECT`","key$":"camera","index$":0},"earth_date":{"a":true,"fo":"date","h":"Earth Date","n":"earth_date","r":false,"sh":"Earth date when the photo was taken","t":"`$STRING`","key$":"earth_date","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the photo","t":"`$INTEGER`","key$":"id","index$":2},"img_src":{"a":true,"fo":"uri","h":"Img Src","n":"img_src","r":false,"sh":"URL to the image file","t":"`$STRING`","key$":"img_src","index$":3},"rover":{"a":true,"h":"Rover","n":"rover","r":false,"t":"`$OBJECT`","key$":"rover","index$":4},"sol":{"a":true,"h":"Sol","n":"sol","r":false,"sh":"Martian sol (day) when the photo was taken","t":"`$INTEGER`","key$":"sol","index$":5}},"id":{"field":"id","name":"id"},"name":"photo","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /rovers/curiosity/photos","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2015-06-03","k":"query","n":"earth_date","or":"earth_date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":3718,"k":"query","n":"sol","or":"sol","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/rovers/curiosity/photos","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"rovers"},{"lit":"curiosity"},{"lit":"photos"}],"t":{"req":"`reqdata`","res":"`body.photos`"},"index$":0},{"a":true,"co":{"id":"GET /rovers/perseverance/photos","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"2025-11-06","k":"query","n":"earth_date","or":"earth_date","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1676,"k":"query","n":"sol","or":"sol","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/rovers/perseverance/photos","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"rovers"},{"lit":"perseverance"},{"lit":"photos"}],"t":{"req":"`reqdata`","res":"`body.photos`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /photos/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":878,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/photos/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"photos"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"photo","name__orig":"photo","Name":"Photo","name_":"photo","name-":"photo","NAME":"PHOTO","index$":0}, {"active":true,"entity":"photo","key$":"BasicPhotoFlow","kind":"basic","name":"BasicPhotoFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"photo_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"photo_ref01","srcdatavar":"photo_ref01_data","suffix":"_dt0"},"m":{"id":"photo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_ref01"}}],"index$":1}]}, 'Photo', {"GET /rovers/curiosity/photos":{"protocol":"http","parameters":[{"name":"earth_date","in":"query","description":"Earth date in YYYY-MM-DD format","required":false,"schema":{"type":"string","format":"date","example":"2015-06-03"},"index$":0},{"name":"sol","in":"query","description":"Martian sol (day) number","required":false,"schema":{"type":"integer","example":3718},"index$":1}]},"GET /rovers/perseverance/photos":{"protocol":"http","parameters":[{"name":"earth_date","in":"query","description":"Earth date in YYYY-MM-DD format","required":false,"schema":{"type":"string","format":"date","example":"2025-11-06"},"index$":0},{"name":"sol","in":"query","description":"Martian sol (day) number","required":false,"schema":{"type":"integer","example":1676},"index$":1}]},"GET /photos/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Unique identifier of the photo","required":true,"schema":{"type":"integer","example":878},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_ref01_data = Object.values(setup.data.existing.photo)[0] as any

    // LIST
    const photo_ref01_ent = client.Photo()
    const photo_ref01_match: any = {}

    const photo_ref01_list = (await photo_ref01_ent.list(photo_ref01_match)).map((e: any) => e.data())


    // LOAD
    const photo_ref01_match_dt0: any = {}
    photo_ref01_match_dt0.id = photo_ref01_data.id
    const photo_ref01_data_dt0 = (await photo_ref01_ent.load(photo_ref01_match_dt0)).data()
    assert(photo_ref01_data_dt0.id === photo_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo/PhotoTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NebulumMarsRoversSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['photo01','photo02','photo03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEBULUM_MARS_ROVERS_TEST_PHOTO_ENTID': idmap,
    'NEBULUM_MARS_ROVERS_TEST_LIVE': 'FALSE',
    'NEBULUM_MARS_ROVERS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['NEBULUM_MARS_ROVERS_TEST_PHOTO_ENTID']

  const live = 'TRUE' === env.NEBULUM_MARS_ROVERS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEBULUM_MARS_ROVERS_TEST_PHOTO_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NebulumMarsRoversSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.NEBULUM_MARS_ROVERS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
