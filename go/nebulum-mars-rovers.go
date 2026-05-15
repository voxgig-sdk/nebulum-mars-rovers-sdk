package voxgignebulummarsroverssdk

import (
	"github.com/voxgig-sdk/nebulum-mars-rovers-sdk/core"
	"github.com/voxgig-sdk/nebulum-mars-rovers-sdk/entity"
	"github.com/voxgig-sdk/nebulum-mars-rovers-sdk/feature"
	_ "github.com/voxgig-sdk/nebulum-mars-rovers-sdk/utility"
)

// Type aliases preserve external API.
type NebulumMarsRoversSDK = core.NebulumMarsRoversSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type NebulumMarsRoversEntity = core.NebulumMarsRoversEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type NebulumMarsRoversError = core.NebulumMarsRoversError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPhotoEntityFunc = func(client *core.NebulumMarsRoversSDK, entopts map[string]any) core.NebulumMarsRoversEntity {
		return entity.NewPhotoEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewNebulumMarsRoversSDK = core.NewNebulumMarsRoversSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
