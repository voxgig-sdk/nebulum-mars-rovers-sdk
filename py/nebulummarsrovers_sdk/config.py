# NebulumMarsRovers SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "NebulumMarsRovers",
            "slug": "nebulum-mars-rovers",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "earth_date",
            "short": "Earth date when the photo was taken",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the photo",
            "type": "`$INTEGER`",
          },
          {
            "name": "img_src",
            "short": "URL to the image file",
            "type": "`$STRING`",
          },
          {
            "name": "rover",
            "type": "`$OBJECT`",
          },
          {
            "name": "sol",
            "short": "Martian sol (day) when the photo was taken",
            "type": "`$INTEGER`",
          },
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
                      "type": "`$STRING`",
                    },
                    {
                      "example": 3718,
                      "kind": "query",
                      "name": "sol",
                      "orig": "sol",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.photos`",
                },
              },
              {
                "args": {
                  "query": [
                    {
                      "example": "2025-11-06",
                      "kind": "query",
                      "name": "earth_date",
                      "orig": "earth_date",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 1676,
                      "kind": "query",
                      "name": "sol",
                      "orig": "sol",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.photos`",
                },
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
