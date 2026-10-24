"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
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
                    "title": "Camera",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "earth_date",
                    "title": "Earth Date",
                    "type": "`$STRING`",
                    "short": "Earth date when the photo was taken",
                    "format": "date"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "short": "Unique identifier for the photo"
                },
                {
                    "name": "img_src",
                    "title": "Img Src",
                    "type": "`$STRING`",
                    "short": "URL to the image file",
                    "format": "uri"
                },
                {
                    "name": "rover",
                    "title": "Rover",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "sol",
                    "title": "Sol",
                    "type": "`$INTEGER`",
                    "short": "Martian sol (day) when the photo was taken"
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
                            "parts": [
                                "rovers",
                                "curiosity",
                                "photos"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.photos`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "earth_date",
                                        "orig": "earth_date",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2015-06-03",
                                        "field": true
                                    },
                                    {
                                        "name": "sol",
                                        "orig": "sol",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 3718,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
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
                            "parts": [
                                "rovers",
                                "perseverance",
                                "photos"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.photos`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "earth_date",
                                        "orig": "earth_date",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "2025-11-06",
                                        "field": true
                                    },
                                    {
                                        "name": "sol",
                                        "orig": "sol",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1676,
                                        "field": true
                                    }
                                ]
                            },
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "photos",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 878
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
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