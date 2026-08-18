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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"name": "earth_date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "img_src",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rover",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sol",
						"type": "`$INTEGER`",
					},
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
								"parts": []any{
									"rovers",
									"curiosity",
									"photos",
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
								"parts": []any{
									"rovers",
									"perseverance",
									"photos",
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
								"parts": []any{
									"photos",
									"{id}",
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
