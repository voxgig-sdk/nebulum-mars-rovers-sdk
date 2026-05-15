# NebulumMarsRovers SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NebulumMarsRoversUtility.registrar = ->(u) {
  u.clean = NebulumMarsRoversUtilities::Clean
  u.done = NebulumMarsRoversUtilities::Done
  u.make_error = NebulumMarsRoversUtilities::MakeError
  u.feature_add = NebulumMarsRoversUtilities::FeatureAdd
  u.feature_hook = NebulumMarsRoversUtilities::FeatureHook
  u.feature_init = NebulumMarsRoversUtilities::FeatureInit
  u.fetcher = NebulumMarsRoversUtilities::Fetcher
  u.make_fetch_def = NebulumMarsRoversUtilities::MakeFetchDef
  u.make_context = NebulumMarsRoversUtilities::MakeContext
  u.make_options = NebulumMarsRoversUtilities::MakeOptions
  u.make_request = NebulumMarsRoversUtilities::MakeRequest
  u.make_response = NebulumMarsRoversUtilities::MakeResponse
  u.make_result = NebulumMarsRoversUtilities::MakeResult
  u.make_point = NebulumMarsRoversUtilities::MakePoint
  u.make_spec = NebulumMarsRoversUtilities::MakeSpec
  u.make_url = NebulumMarsRoversUtilities::MakeUrl
  u.param = NebulumMarsRoversUtilities::Param
  u.prepare_auth = NebulumMarsRoversUtilities::PrepareAuth
  u.prepare_body = NebulumMarsRoversUtilities::PrepareBody
  u.prepare_headers = NebulumMarsRoversUtilities::PrepareHeaders
  u.prepare_method = NebulumMarsRoversUtilities::PrepareMethod
  u.prepare_params = NebulumMarsRoversUtilities::PrepareParams
  u.prepare_path = NebulumMarsRoversUtilities::PreparePath
  u.prepare_query = NebulumMarsRoversUtilities::PrepareQuery
  u.result_basic = NebulumMarsRoversUtilities::ResultBasic
  u.result_body = NebulumMarsRoversUtilities::ResultBody
  u.result_headers = NebulumMarsRoversUtilities::ResultHeaders
  u.transform_request = NebulumMarsRoversUtilities::TransformRequest
  u.transform_response = NebulumMarsRoversUtilities::TransformResponse
}
