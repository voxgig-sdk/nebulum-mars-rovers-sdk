<?php
declare(strict_types=1);

// NebulumMarsRovers SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

NebulumMarsRoversUtility::setRegistrar(function (NebulumMarsRoversUtility $u): void {
    $u->clean = [NebulumMarsRoversClean::class, 'call'];
    $u->done = [NebulumMarsRoversDone::class, 'call'];
    $u->make_error = [NebulumMarsRoversMakeError::class, 'call'];
    $u->feature_add = [NebulumMarsRoversFeatureAdd::class, 'call'];
    $u->feature_hook = [NebulumMarsRoversFeatureHook::class, 'call'];
    $u->feature_init = [NebulumMarsRoversFeatureInit::class, 'call'];
    $u->fetcher = [NebulumMarsRoversFetcher::class, 'call'];
    $u->make_fetch_def = [NebulumMarsRoversMakeFetchDef::class, 'call'];
    $u->make_context = [NebulumMarsRoversMakeContext::class, 'call'];
    $u->make_options = [NebulumMarsRoversMakeOptions::class, 'call'];
    $u->make_request = [NebulumMarsRoversMakeRequest::class, 'call'];
    $u->make_response = [NebulumMarsRoversMakeResponse::class, 'call'];
    $u->make_result = [NebulumMarsRoversMakeResult::class, 'call'];
    $u->make_point = [NebulumMarsRoversMakePoint::class, 'call'];
    $u->make_spec = [NebulumMarsRoversMakeSpec::class, 'call'];
    $u->make_url = [NebulumMarsRoversMakeUrl::class, 'call'];
    $u->param = [NebulumMarsRoversParam::class, 'call'];
    $u->prepare_auth = [NebulumMarsRoversPrepareAuth::class, 'call'];
    $u->prepare_body = [NebulumMarsRoversPrepareBody::class, 'call'];
    $u->prepare_headers = [NebulumMarsRoversPrepareHeaders::class, 'call'];
    $u->prepare_method = [NebulumMarsRoversPrepareMethod::class, 'call'];
    $u->prepare_params = [NebulumMarsRoversPrepareParams::class, 'call'];
    $u->prepare_path = [NebulumMarsRoversPreparePath::class, 'call'];
    $u->prepare_query = [NebulumMarsRoversPrepareQuery::class, 'call'];
    $u->result_basic = [NebulumMarsRoversResultBasic::class, 'call'];
    $u->result_body = [NebulumMarsRoversResultBody::class, 'call'];
    $u->result_headers = [NebulumMarsRoversResultHeaders::class, 'call'];
    $u->transform_request = [NebulumMarsRoversTransformRequest::class, 'call'];
    $u->transform_response = [NebulumMarsRoversTransformResponse::class, 'call'];
});
