# NebulumMarsRovers SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "format": "date",
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
            "format": "uri",
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "rovers",
                  },
                  {
                    "lit": "curiosity",
                  },
                  {
                    "lit": "photos",
                  },
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
                "parts": [
                  "rovers",
                  "curiosity",
                  "photos",
                ],
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
                "segments": [
                  {
                    "lit": "rovers",
                  },
                  {
                    "lit": "perseverance",
                  },
                  {
                    "lit": "photos",
                  },
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
                "parts": [
                  "rovers",
                  "perseverance",
                  "photos",
                ],
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
                "segments": [
                  {
                    "lit": "photos",
                  },
                  {
                    "var": "id",
                  },
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
                "parts": [
                  "photos",
                  "{id}",
                ],
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
