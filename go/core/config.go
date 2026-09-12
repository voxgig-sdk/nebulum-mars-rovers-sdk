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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "date",
						"name": "earth_date",
						"short": "Earth date when the photo was taken",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the photo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "uri",
						"name": "img_src",
						"short": "URL to the image file",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rover",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sol",
						"short": "Martian sol (day) when the photo was taken",
						"type": "`$INTEGER`",
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
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2015-06-03",
											"kind": "query",
											"name": "earth_date",
											"orig": "earth_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 3718,
											"kind": "query",
											"name": "sol",
											"orig": "sol",
											"type": "`$INTEGER`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"earth_date",
										"sol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.photos`",
								},
								"parts": []any{
									"rovers",
									"curiosity",
									"photos",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "2025-11-06",
											"kind": "query",
											"name": "earth_date",
											"orig": "earth_date",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1676,
											"kind": "query",
											"name": "sol",
											"orig": "sol",
											"type": "`$INTEGER`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"earth_date",
										"sol",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.photos`",
								},
								"parts": []any{
									"rovers",
									"perseverance",
									"photos",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 878,
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"photos",
									"{id}",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
