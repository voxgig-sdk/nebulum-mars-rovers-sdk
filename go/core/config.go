package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "NebulumMarsRovers",
			"slug": "nebulum-mars-rovers",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://rovers.nebulum.one/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"photo": map[string]any{},
			},
		},
		"entity": map[string]any{
			"photo": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "camera",
						"title": "Camera",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "earth_date",
						"title": "Earth Date",
						"type": "`$STRING`",
						"short": "Earth date when the photo was taken",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Unique identifier for the photo",
					},
					map[string]any{
						"name": "img_src",
						"title": "Img Src",
						"type": "`$STRING`",
						"short": "URL to the image file",
						"format": "uri",
					},
					map[string]any{
						"name": "rover",
						"title": "Rover",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sol",
						"title": "Sol",
						"type": "`$INTEGER`",
						"short": "Martian sol (day) when the photo was taken",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "photo",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rovers/curiosity/photos",
								"segments": []any{
									map[string]any{
										"lit": "rovers",
									},
									map[string]any{
										"lit": "curiosity",
									},
									map[string]any{
										"lit": "photos",
									},
								},
								"parts": []any{
									"rovers",
									"curiosity",
									"photos",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.photos`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "earth_date",
											"orig": "earth_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2015-06-03",
											"field": true,
										},
										map[string]any{
											"name": "sol",
											"orig": "sol",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 3718,
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/rovers/perseverance/photos",
								"segments": []any{
									map[string]any{
										"lit": "rovers",
									},
									map[string]any{
										"lit": "perseverance",
									},
									map[string]any{
										"lit": "photos",
									},
								},
								"parts": []any{
									"rovers",
									"perseverance",
									"photos",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.photos`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "earth_date",
											"orig": "earth_date",
											"type": "`$STRING`",
											"kind": "query",
											"example": "2025-11-06",
											"field": true,
										},
										map[string]any{
											"name": "sol",
											"orig": "sol",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1676,
											"field": true,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/photos/{id}",
								"segments": []any{
									map[string]any{
										"lit": "photos",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"photos",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
											"example": 878,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
