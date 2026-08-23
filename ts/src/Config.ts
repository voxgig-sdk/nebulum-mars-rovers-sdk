
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'NebulumMarsRovers',
        slug: "nebulum-mars-rovers",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://rovers.nebulum.one/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      photo: {
      },

    }
  }


  entity = {
    "photo": {
      "fields": [
        {
          "name": "camera",
          "type": "`$OBJECT`"
        },
        {
          "name": "earth_date",
          "short": "Earth date when the photo was taken",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the photo",
          "type": "`$INTEGER`"
        },
        {
          "name": "img_src",
          "short": "URL to the image file",
          "type": "`$STRING`"
        },
        {
          "name": "rover",
          "type": "`$OBJECT`"
        },
        {
          "name": "sol",
          "short": "Martian sol (day) when the photo was taken",
          "type": "`$INTEGER`"
        }
      ],
      "name": "photo",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "2015-06-03",
                    "kind": "query",
                    "name": "earth_date",
                    "orig": "earth_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 3718,
                    "kind": "query",
                    "name": "sol",
                    "orig": "sol",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/rovers/curiosity/photos",
              "parts": [
                "rovers",
                "curiosity",
                "photos"
              ],
              "select": {
                "exist": [
                  "earth_date",
                  "sol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.photos`"
              }
            },
            {
              "args": {
                "query": [
                  {
                    "example": "2025-11-06",
                    "kind": "query",
                    "name": "earth_date",
                    "orig": "earth_date",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 1676,
                    "kind": "query",
                    "name": "sol",
                    "orig": "sol",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/rovers/perseverance/photos",
              "parts": [
                "rovers",
                "perseverance",
                "photos"
              ],
              "select": {
                "exist": [
                  "earth_date",
                  "sol"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.photos`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 878,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/photos/{id}",
              "parts": [
                "photos",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

