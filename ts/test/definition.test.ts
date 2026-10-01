import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "photo",
    "accessor": "Photo",
    "op": "load",
    "method": "GET",
    "path": "/photos/{id}",
    "args": [
      {
        "name": "id",
        "wire": "id",
        "value": 878
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "id": 878,
      "sol": 1000,
      "camera": {
        "full_name": "x",
        "id": 1,
        "name": "x",
        "rover_id": 1
      },
      "img_src": "x",
      "earth_date": "2026-01-01",
      "rover": {
        "id": 1,
        "landing_date": "2026-01-01",
        "launch_date": "2026-01-01",
        "name": "Curiosity",
        "status": "x"
      }
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
