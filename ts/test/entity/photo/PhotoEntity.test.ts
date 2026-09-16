

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NebulumMarsRoversSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEBULUM_MARS_ROVERS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"camera","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"format":"date","name":"earth_date","req":false,"short":"Earth date when the photo was taken","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the photo","type":"`$INTEGER`","index$":2},{"active":true,"format":"uri","name":"img_src","req":false,"short":"URL to the image file","type":"`$STRING`","index$":3},{"active":true,"name":"rover","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"sol","req":false,"short":"Martian sol (day) when the photo was taken","type":"`$INTEGER`","index$":5}],"id":{"field":"id","name":"id"},"name":"photo","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"2015-06-03","kind":"query","name":"earth_date","orig":"earth_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":3718,"kind":"query","name":"sol","orig":"sol","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /rovers/curiosity/photos","json":"{\"operationId\":\"getCuriosityPhotos\",\"parameters\":[{\"description\":\"Earth date in YYYY-MM-DD format\",\"in\":\"query\",\"name\":\"earth_date\",\"required\":false,\"schema\":{\"example\":\"2015-06-03\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Martian sol (day) number\",\"in\":\"query\",\"name\":\"sol\",\"required\":false,\"schema\":{\"example\":3718,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"photos\":{\"items\":{\"properties\":{\"camera\":{\"properties\":{\"full_name\":{\"description\":\"Full camera name\",\"type\":\"string\"},\"id\":{\"description\":\"Camera identifier\",\"type\":\"integer\"},\"name\":{\"description\":\"Camera name\",\"type\":\"string\"},\"rover_id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"}},\"type\":\"object\"},\"earth_date\":{\"description\":\"Earth date when the photo was taken\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the photo\",\"example\":878,\"type\":\"integer\"},\"img_src\":{\"description\":\"URL to the image file\",\"format\":\"uri\",\"type\":\"string\"},\"rover\":{\"properties\":{\"id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"},\"landing_date\":{\"description\":\"Date the rover landed on Mars\",\"format\":\"date\",\"type\":\"string\"},\"launch_date\":{\"description\":\"Date the rover was launched\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"description\":\"Rover name\",\"enum\":[\"Curiosity\",\"Perseverance\"],\"type\":\"string\"},\"status\":{\"description\":\"Current status of the rover\",\"type\":\"string\"}},\"type\":\"object\"},\"sol\":{\"description\":\"Martian sol (day) when the photo was taken\",\"example\":1000,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of photos\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rovers/curiosity/photos","segments":[{"lit":"rovers"},{"lit":"curiosity"},{"lit":"photos"}],"select":{"exist":["earth_date","sol"]},"transform":{"req":"`reqdata`","res":"`body.photos`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"2025-11-06","kind":"query","name":"earth_date","orig":"earth_date","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1676,"kind":"query","name":"sol","orig":"sol","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /rovers/perseverance/photos","json":"{\"operationId\":\"getPerseverancePhotos\",\"parameters\":[{\"description\":\"Earth date in YYYY-MM-DD format\",\"in\":\"query\",\"name\":\"earth_date\",\"required\":false,\"schema\":{\"example\":\"2025-11-06\",\"format\":\"date\",\"type\":\"string\"}},{\"description\":\"Martian sol (day) number\",\"in\":\"query\",\"name\":\"sol\",\"required\":false,\"schema\":{\"example\":1676,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"photos\":{\"items\":{\"properties\":{\"camera\":{\"properties\":{\"full_name\":{\"description\":\"Full camera name\",\"type\":\"string\"},\"id\":{\"description\":\"Camera identifier\",\"type\":\"integer\"},\"name\":{\"description\":\"Camera name\",\"type\":\"string\"},\"rover_id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"}},\"type\":\"object\"},\"earth_date\":{\"description\":\"Earth date when the photo was taken\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the photo\",\"example\":878,\"type\":\"integer\"},\"img_src\":{\"description\":\"URL to the image file\",\"format\":\"uri\",\"type\":\"string\"},\"rover\":{\"properties\":{\"id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"},\"landing_date\":{\"description\":\"Date the rover landed on Mars\",\"format\":\"date\",\"type\":\"string\"},\"launch_date\":{\"description\":\"Date the rover was launched\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"description\":\"Rover name\",\"enum\":[\"Curiosity\",\"Perseverance\"],\"type\":\"string\"},\"status\":{\"description\":\"Current status of the rover\",\"type\":\"string\"}},\"type\":\"object\"},\"sol\":{\"description\":\"Martian sol (day) when the photo was taken\",\"example\":1000,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of photos\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/rovers/perseverance/photos","segments":[{"lit":"rovers"},{"lit":"perseverance"},{"lit":"photos"}],"select":{"exist":["earth_date","sol"]},"transform":{"req":"`reqdata`","res":"`body.photos`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":878,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /photos/{id}","json":"{\"operationId\":\"getPhotoById\",\"parameters\":[{\"description\":\"Unique identifier of the photo\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"example\":878,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"camera\":{\"properties\":{\"full_name\":{\"description\":\"Full camera name\",\"type\":\"string\"},\"id\":{\"description\":\"Camera identifier\",\"type\":\"integer\"},\"name\":{\"description\":\"Camera name\",\"type\":\"string\"},\"rover_id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"}},\"type\":\"object\"},\"earth_date\":{\"description\":\"Earth date when the photo was taken\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the photo\",\"example\":878,\"type\":\"integer\"},\"img_src\":{\"description\":\"URL to the image file\",\"format\":\"uri\",\"type\":\"string\"},\"rover\":{\"properties\":{\"id\":{\"description\":\"Rover identifier\",\"type\":\"integer\"},\"landing_date\":{\"description\":\"Date the rover landed on Mars\",\"format\":\"date\",\"type\":\"string\"},\"launch_date\":{\"description\":\"Date the rover was launched\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"description\":\"Rover name\",\"enum\":[\"Curiosity\",\"Perseverance\"],\"type\":\"string\"},\"status\":{\"description\":\"Current status of the rover\",\"type\":\"string\"}},\"type\":\"object\"},\"sol\":{\"description\":\"Martian sol (day) when the photo was taken\",\"example\":1000,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with photo details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Photo not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/photos/{id}","segments":[{"lit":"photos"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"photo","name__orig":"photo","Name":"Photo","name_":"photo","name-":"photo","NAME":"PHOTO","index$":0}, {"active":true,"entity":"photo","key$":"BasicPhotoFlow","kind":"basic","name":"BasicPhotoFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"photo_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"photo_ref01","srcdatavar":"photo_ref01_data","suffix":"_dt0"},"match":{"id":"photo01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_ref01"}}],"index$":1}]}, 'Photo')
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
  
