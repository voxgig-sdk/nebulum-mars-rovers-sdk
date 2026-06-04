# NebulumMarsRovers SDK configuration


def make_config():
    return {
        "main": {
            "name": "NebulumMarsRovers",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://rovers.nebulum.one/api/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "photo": {},
            },
        },
        "entity": {
      "photo": {
        "fields": [
          {
            "name": "camera",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "earth_date",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "img_src",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "rover",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "sol",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "photo",
        "op": {
          "list": {
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
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 3718,
                      "kind": "query",
                      "name": "sol",
                      "orig": "sol",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/rovers/curiosity/photos",
                "parts": [
                  "rovers",
                  "curiosity",
                  "photos",
                ],
                "select": {
                  "exist": [
                    "earth_date",
                    "sol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "2025-11-06",
                      "kind": "query",
                      "name": "earth_date",
                      "orig": "earth_date",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": 1676,
                      "kind": "query",
                      "name": "sol",
                      "orig": "sol",
                      "reqd": False,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/rovers/perseverance/photos",
                "parts": [
                  "rovers",
                  "perseverance",
                  "photos",
                ],
                "select": {
                  "exist": [
                    "earth_date",
                    "sol",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 1,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/photos/{id}",
                "parts": [
                  "photos",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
