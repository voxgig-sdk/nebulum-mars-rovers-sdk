"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'NebulumMarsRovers',
        slug: "nebulum-mars-rovers",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://rovers.nebulum.one/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            photo: {},
        }
    };
    entity = {
        "photo": {
            "fields": [
                {
                    "name": "camera",
                    "type": "`$OBJECT`"
                },
                {
                    "format": "date",
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
                    "format": "uri",
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
            "id": {
                "field": "id",
                "name": "id"
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
                            "segments": [
                                {
                                    "lit": "rovers"
                                },
                                {
                                    "lit": "curiosity"
                                },
                                {
                                    "lit": "photos"
                                }
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
                            },
                            "parts": [
                                "rovers",
                                "curiosity",
                                "photos"
                            ]
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
                            "segments": [
                                {
                                    "lit": "rovers"
                                },
                                {
                                    "lit": "perseverance"
                                },
                                {
                                    "lit": "photos"
                                }
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
                            },
                            "parts": [
                                "rovers",
                                "perseverance",
                                "photos"
                            ]
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
                            "segments": [
                                {
                                    "lit": "photos"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "photos",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map