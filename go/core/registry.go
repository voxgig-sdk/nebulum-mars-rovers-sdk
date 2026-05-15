package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPhotoEntityFunc func(client *NebulumMarsRoversSDK, entopts map[string]any) NebulumMarsRoversEntity

