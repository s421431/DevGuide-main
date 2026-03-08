"use strict";
exports.id = 8;
exports.ids = [8];
exports.modules = {

/***/ 432
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SSOOIDC: () => (/* binding */ SSOOIDC)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319);
/* harmony import */ var _commands_CreateTokenCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(433);
/* harmony import */ var _SSOOIDCClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(418);



const commands = {
    CreateTokenCommand: _commands_CreateTokenCommand__WEBPACK_IMPORTED_MODULE_1__.CreateTokenCommand,
};
class SSOOIDC extends _SSOOIDCClient__WEBPACK_IMPORTED_MODULE_2__.SSOOIDCClient {
}
(0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.createAggregatedClient)(commands, SSOOIDC);


/***/ },

/***/ 418
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SSOOIDCClient: () => (/* binding */ SSOOIDCClient),
/* harmony export */   __Client: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__.Client)
/* harmony export */ });
/* harmony import */ var _aws_sdk_middleware_host_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);
/* harmony import */ var _aws_sdk_middleware_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _aws_sdk_middleware_recursion_detection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(71);
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(75);
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(76);
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(81);
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83);
/* harmony import */ var _smithy_middleware_content_length__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(89);
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(90);
/* harmony import */ var _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(118);
/* harmony import */ var _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(128);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(136);
/* harmony import */ var _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(419);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(420);
/* harmony import */ var _runtimeConfig__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(421);
/* harmony import */ var _runtimeExtensions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(430);
















class SSOOIDCClient extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__.Client {
    config;
    constructor(...[configuration]) {
        const _config_0 = (0,_runtimeConfig__WEBPACK_IMPORTED_MODULE_17__.getRuntimeConfig)(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0,_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_16__.resolveClientEndpointParameters)(_config_0);
        const _config_2 = (0,_aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_3__.resolveUserAgentConfig)(_config_1);
        const _config_3 = (0,_smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_12__.resolveRetryConfig)(_config_2);
        const _config_4 = (0,_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_5__.resolveRegionConfig)(_config_3);
        const _config_5 = (0,_aws_sdk_middleware_host_header__WEBPACK_IMPORTED_MODULE_0__.resolveHostHeaderConfig)(_config_4);
        const _config_6 = (0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_11__.resolveEndpointConfig)(_config_5);
        const _config_7 = (0,_auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__.resolveHttpAuthSchemeConfig)(_config_6);
        const _config_8 = (0,_runtimeExtensions__WEBPACK_IMPORTED_MODULE_18__.resolveRuntimeExtensions)(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use((0,_smithy_core_schema__WEBPACK_IMPORTED_MODULE_9__.getSchemaSerdePlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_user_agent__WEBPACK_IMPORTED_MODULE_4__.getUserAgentPlugin)(this.config));
        this.middlewareStack.use((0,_smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_13__.getRetryPlugin)(this.config));
        this.middlewareStack.use((0,_smithy_middleware_content_length__WEBPACK_IMPORTED_MODULE_10__.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_host_header__WEBPACK_IMPORTED_MODULE_0__.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_logger__WEBPACK_IMPORTED_MODULE_1__.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0,_aws_sdk_middleware_recursion_detection__WEBPACK_IMPORTED_MODULE_2__.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0,_smithy_core__WEBPACK_IMPORTED_MODULE_7__.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
            httpAuthSchemeParametersProvider: _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__.defaultSSOOIDCHttpAuthSchemeParametersProvider,
            identityProviderConfigProvider: async (config) => new _smithy_core__WEBPACK_IMPORTED_MODULE_6__.DefaultIdentityProviderConfig({
                "aws.auth#sigv4": config.credentials,
            }),
        }));
        this.middlewareStack.use((0,_smithy_core__WEBPACK_IMPORTED_MODULE_8__.getHttpSigningPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}


/***/ },

/***/ 431
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHttpAuthExtensionConfiguration: () => (/* binding */ getHttpAuthExtensionConfiguration),
/* harmony export */   resolveHttpAuthRuntimeConfig: () => (/* binding */ resolveHttpAuthRuntimeConfig)
/* harmony export */ });
const getHttpAuthExtensionConfiguration = (runtimeConfig) => {
    const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
    let _credentials = runtimeConfig.credentials;
    return {
        setHttpAuthScheme(httpAuthScheme) {
            const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
            if (index === -1) {
                _httpAuthSchemes.push(httpAuthScheme);
            }
            else {
                _httpAuthSchemes.splice(index, 1, httpAuthScheme);
            }
        },
        httpAuthSchemes() {
            return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
            _httpAuthSchemeProvider = httpAuthSchemeProvider;
        },
        httpAuthSchemeProvider() {
            return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
            _credentials = credentials;
        },
        credentials() {
            return _credentials;
        },
    };
};
const resolveHttpAuthRuntimeConfig = (config) => {
    return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials(),
    };
};


/***/ },

/***/ 419
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultSSOOIDCHttpAuthSchemeParametersProvider: () => (/* binding */ defaultSSOOIDCHttpAuthSchemeParametersProvider),
/* harmony export */   defaultSSOOIDCHttpAuthSchemeProvider: () => (/* binding */ defaultSSOOIDCHttpAuthSchemeProvider),
/* harmony export */   resolveHttpAuthSchemeConfig: () => (/* binding */ resolveHttpAuthSchemeConfig)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(139);
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91);


const defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
        operation: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__.getSmithyContext)(context).operation,
        region: (await (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(config.region)()) ||
            (() => {
                throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
            })(),
    };
};
function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
            name: "sso-oauth",
            region: authParameters.region,
        },
        propertiesExtractor: (config, context) => ({
            signingProperties: {
                config,
                context,
            },
        }),
    };
}
function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
        schemeId: "smithy.api#noAuth",
    };
}
const defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        case "CreateToken": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        default: {
            options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
    }
    return options;
};
const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__.resolveAwsSdkSigV4Config)(config);
    return Object.assign(config_0, {
        authSchemePreference: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(config.authSchemePreference ?? []),
    });
};


/***/ },

/***/ 433
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command),
/* harmony export */   CreateTokenCommand: () => (/* binding */ CreateTokenCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(321);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(330);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(420);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(427);





class CreateTokenCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__.commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("AWSSSOOIDCService", "CreateToken", {})
    .n("SSOOIDCClient", "CreateTokenCommand")
    .sc(_schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateToken$)
    .build() {
}


/***/ },

/***/ 434
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _CreateTokenCommand__WEBPACK_IMPORTED_MODULE_0__.$Command),
/* harmony export */   CreateTokenCommand: () => (/* reexport safe */ _CreateTokenCommand__WEBPACK_IMPORTED_MODULE_0__.CreateTokenCommand)
/* harmony export */ });
/* harmony import */ var _CreateTokenCommand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(433);



/***/ },

/***/ 420
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   commonParams: () => (/* binding */ commonParams),
/* harmony export */   resolveClientEndpointParameters: () => (/* binding */ resolveClientEndpointParameters)
/* harmony export */ });
const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "sso-oauth",
    });
};
const commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};


/***/ },

/***/ 425
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultEndpointResolver: () => (/* binding */ defaultEndpointResolver)
/* harmony export */ });
/* harmony import */ var _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(305);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var _ruleset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(426);



const cache = new _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"],
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0,_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_3__.resolveEndpoint)(_ruleset__WEBPACK_IMPORTED_MODULE_4__.ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    }));
};
_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_2__.customEndpointFunctions.aws = _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.awsEndpointFunctions;


/***/ },

/***/ 426
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ruleSet: () => (/* binding */ ruleSet)
/* harmony export */ });
const u = "required", v = "fn", w = "argv", x = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "getAttr", i = { [u]: false, type: "string" }, j = { [u]: true, default: false, type: "boolean" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] }, p = { [x]: g }, q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] }, r = [l], s = [m], t = [{ [x]: "Region" }];
const _data = {
    version: "1.0",
    parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i },
    rules: [
        {
            conditions: [{ [v]: b, [w]: [k] }],
            rules: [
                { conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d },
                { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d },
                { endpoint: { url: k, properties: n, headers: n }, type: e },
            ],
            type: f,
        },
        {
            conditions: [{ [v]: b, [w]: t }],
            rules: [
                {
                    conditions: [{ [v]: "aws.partition", [w]: t, assign: g }],
                    rules: [
                        {
                            conditions: [l, m],
                            rules: [
                                {
                                    conditions: [{ [v]: c, [w]: [a, o] }, q],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: n,
                                                headers: n,
                                            },
                                            type: e,
                                        },
                                    ],
                                    type: f,
                                },
                                { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d },
                            ],
                            type: f,
                        },
                        {
                            conditions: r,
                            rules: [
                                {
                                    conditions: [{ [v]: c, [w]: [o, a] }],
                                    rules: [
                                        {
                                            conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }],
                                            endpoint: { url: "https://oidc.{Region}.amazonaws.com", properties: n, headers: n },
                                            type: e,
                                        },
                                        {
                                            endpoint: {
                                                url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                properties: n,
                                                headers: n,
                                            },
                                            type: e,
                                        },
                                    ],
                                    type: f,
                                },
                                { error: "FIPS is enabled but this partition does not support FIPS", type: d },
                            ],
                            type: f,
                        },
                        {
                            conditions: s,
                            rules: [
                                {
                                    conditions: [q],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: n,
                                                headers: n,
                                            },
                                            type: e,
                                        },
                                    ],
                                    type: f,
                                },
                                { error: "DualStack is enabled but this partition does not support DualStack", type: d },
                            ],
                            type: f,
                        },
                        {
                            endpoint: { url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n },
                            type: e,
                        },
                    ],
                    type: f,
                },
            ],
            type: f,
        },
        { error: "Invalid Configuration: Missing Region", type: d },
    ],
};
const ruleSet = _data;


/***/ },

/***/ 417
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.$Command),
/* harmony export */   AccessDeniedException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.AccessDeniedException),
/* harmony export */   AccessDeniedException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AccessDeniedException$),
/* harmony export */   AccessDeniedExceptionReason: () => (/* reexport safe */ _models_enums__WEBPACK_IMPORTED_MODULE_4__.AccessDeniedExceptionReason),
/* harmony export */   AuthorizationPendingException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.AuthorizationPendingException),
/* harmony export */   AuthorizationPendingException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AuthorizationPendingException$),
/* harmony export */   CreateToken$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateToken$),
/* harmony export */   CreateTokenCommand: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.CreateTokenCommand),
/* harmony export */   CreateTokenRequest$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateTokenRequest$),
/* harmony export */   CreateTokenResponse$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateTokenResponse$),
/* harmony export */   ExpiredTokenException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.ExpiredTokenException),
/* harmony export */   ExpiredTokenException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.ExpiredTokenException$),
/* harmony export */   InternalServerException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.InternalServerException),
/* harmony export */   InternalServerException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InternalServerException$),
/* harmony export */   InvalidClientException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.InvalidClientException),
/* harmony export */   InvalidClientException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InvalidClientException$),
/* harmony export */   InvalidGrantException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.InvalidGrantException),
/* harmony export */   InvalidGrantException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InvalidGrantException$),
/* harmony export */   InvalidRequestException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.InvalidRequestException),
/* harmony export */   InvalidRequestException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InvalidRequestException$),
/* harmony export */   InvalidRequestExceptionReason: () => (/* reexport safe */ _models_enums__WEBPACK_IMPORTED_MODULE_4__.InvalidRequestExceptionReason),
/* harmony export */   InvalidScopeException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.InvalidScopeException),
/* harmony export */   InvalidScopeException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InvalidScopeException$),
/* harmony export */   SSOOIDC: () => (/* reexport safe */ _SSOOIDC__WEBPACK_IMPORTED_MODULE_1__.SSOOIDC),
/* harmony export */   SSOOIDCClient: () => (/* reexport safe */ _SSOOIDCClient__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCClient),
/* harmony export */   SSOOIDCServiceException: () => (/* reexport safe */ _models_SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_6__.SSOOIDCServiceException),
/* harmony export */   SSOOIDCServiceException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.SSOOIDCServiceException$),
/* harmony export */   SlowDownException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.SlowDownException),
/* harmony export */   SlowDownException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.SlowDownException$),
/* harmony export */   UnauthorizedClientException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.UnauthorizedClientException),
/* harmony export */   UnauthorizedClientException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.UnauthorizedClientException$),
/* harmony export */   UnsupportedGrantTypeException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.UnsupportedGrantTypeException),
/* harmony export */   UnsupportedGrantTypeException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.UnsupportedGrantTypeException$),
/* harmony export */   __Client: () => (/* reexport safe */ _SSOOIDCClient__WEBPACK_IMPORTED_MODULE_0__.__Client),
/* harmony export */   errorTypeRegistries: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.errorTypeRegistries)
/* harmony export */ });
/* harmony import */ var _SSOOIDCClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(418);
/* harmony import */ var _SSOOIDC__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(432);
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(434);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(427);
/* harmony import */ var _models_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(435);
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(428);
/* harmony import */ var _models_SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(429);










/***/ },

/***/ 429
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SSOOIDCServiceException: () => (/* binding */ SSOOIDCServiceException),
/* harmony export */   __ServiceException: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);


class SSOOIDCServiceException extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SSOOIDCServiceException.prototype);
    }
}


/***/ },

/***/ 435
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessDeniedExceptionReason: () => (/* binding */ AccessDeniedExceptionReason),
/* harmony export */   InvalidRequestExceptionReason: () => (/* binding */ InvalidRequestExceptionReason)
/* harmony export */ });
const AccessDeniedExceptionReason = {
    KMS_ACCESS_DENIED: "KMS_AccessDeniedException",
};
const InvalidRequestExceptionReason = {
    KMS_DISABLED_KEY: "KMS_DisabledException",
    KMS_INVALID_KEY_USAGE: "KMS_InvalidKeyUsageException",
    KMS_INVALID_STATE: "KMS_InvalidStateException",
    KMS_KEY_NOT_FOUND: "KMS_NotFoundException",
};


/***/ },

/***/ 428
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessDeniedException: () => (/* binding */ AccessDeniedException),
/* harmony export */   AuthorizationPendingException: () => (/* binding */ AuthorizationPendingException),
/* harmony export */   ExpiredTokenException: () => (/* binding */ ExpiredTokenException),
/* harmony export */   InternalServerException: () => (/* binding */ InternalServerException),
/* harmony export */   InvalidClientException: () => (/* binding */ InvalidClientException),
/* harmony export */   InvalidGrantException: () => (/* binding */ InvalidGrantException),
/* harmony export */   InvalidRequestException: () => (/* binding */ InvalidRequestException),
/* harmony export */   InvalidScopeException: () => (/* binding */ InvalidScopeException),
/* harmony export */   SlowDownException: () => (/* binding */ SlowDownException),
/* harmony export */   UnauthorizedClientException: () => (/* binding */ UnauthorizedClientException),
/* harmony export */   UnsupportedGrantTypeException: () => (/* binding */ UnsupportedGrantTypeException)
/* harmony export */ });
/* harmony import */ var _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(429);

class AccessDeniedException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    reason;
    error_description;
    constructor(opts) {
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessDeniedException.prototype);
        this.error = opts.error;
        this.reason = opts.reason;
        this.error_description = opts.error_description;
    }
}
class AuthorizationPendingException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "AuthorizationPendingException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "AuthorizationPendingException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AuthorizationPendingException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class ExpiredTokenException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "ExpiredTokenException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InternalServerException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "InternalServerException";
    $fault = "server";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InternalServerException",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, InternalServerException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidClientException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "InvalidClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidClientException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidClientException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidGrantException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "InvalidGrantException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidGrantException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidGrantException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class InvalidRequestException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "InvalidRequestException";
    $fault = "client";
    error;
    reason;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidRequestException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidRequestException.prototype);
        this.error = opts.error;
        this.reason = opts.reason;
        this.error_description = opts.error_description;
    }
}
class InvalidScopeException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "InvalidScopeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "InvalidScopeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidScopeException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class SlowDownException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "SlowDownException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "SlowDownException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, SlowDownException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class UnauthorizedClientException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "UnauthorizedClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "UnauthorizedClientException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnauthorizedClientException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}
class UnsupportedGrantTypeException extends _SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_0__.SSOOIDCServiceException {
    name = "UnsupportedGrantTypeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
        super({
            name: "UnsupportedGrantTypeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, UnsupportedGrantTypeException.prototype);
        this.error = opts.error;
        this.error_description = opts.error_description;
    }
}


/***/ },

/***/ 421
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeConfig: () => (/* binding */ getRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(422);
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(164);
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(170);
/* harmony import */ var _aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(218);
/* harmony import */ var _aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(227);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(228);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(229);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(232);
/* harmony import */ var _smithy_hash_node__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(244);
/* harmony import */ var _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(118);
/* harmony import */ var _smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(93);
/* harmony import */ var _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(407);
/* harmony import */ var _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(253);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(255);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(256);
/* harmony import */ var _smithy_util_body_length_node__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(257);
/* harmony import */ var _smithy_util_defaults_mode_node__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(258);
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(120);
/* harmony import */ var _runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(423);













const getRuntimeConfig = (config) => {
    (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0,_smithy_util_defaults_mode_node__WEBPACK_IMPORTED_MODULE_16__.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_13__.loadConfigsForDefaultMode);
    const clientSharedValues = (0,_runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_18__.getRuntimeConfig)(config);
    (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_1__.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
        profile: config?.profile,
        logger: clientSharedValues.logger,
    };
    return {
        ...clientSharedValues,
        ...config,
        runtime: "node",
        defaultsMode,
        authSchemePreference: config?.authSchemePreference ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)(_aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? _smithy_util_body_length_node__WEBPACK_IMPORTED_MODULE_15__.calculateBodyLength,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ??
            (0,_aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_3__.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: _package_json__WEBPACK_IMPORTED_MODULE_0__.version }),
        maxAttempts: config?.maxAttempts ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)(_smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_9__.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
        region: config?.region ??
            (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_5__.NODE_REGION_CONFIG_OPTIONS, { ..._smithy_config_resolver__WEBPACK_IMPORTED_MODULE_5__.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
        requestHandler: _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_11__.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ??
            (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)({
                ..._smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_9__.NODE_RETRY_MODE_CONFIG_OPTIONS,
                default: async () => (await defaultConfigProvider()).retryMode || _smithy_util_retry__WEBPACK_IMPORTED_MODULE_17__.DEFAULT_RETRY_MODE,
            }, config),
        sha256: config?.sha256 ?? _smithy_hash_node__WEBPACK_IMPORTED_MODULE_8__.Hash.bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_12__.streamCollector,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_7__.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_10__.loadConfig)(_aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_4__.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig),
    };
};


/***/ },

/***/ 423
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeConfig: () => (/* binding */ getRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165);
/* harmony import */ var _aws_sdk_core_protocols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(262);
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(424);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(129);
/* harmony import */ var _smithy_url_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(272);
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(273);
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(145);
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(274);
/* harmony import */ var _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(419);
/* harmony import */ var _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(425);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(427);










const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2019-06-10",
        base64Decoder: config?.base64Decoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_5__.fromBase64,
        base64Encoder: config?.base64Encoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_10__.defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_9__.defaultSSOOIDCHttpAuthSchemeProvider,
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
                signer: new _aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__.AwsSdkSigV4Signer(),
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                signer: new _smithy_core__WEBPACK_IMPORTED_MODULE_2__.NoAuthSigner(),
            },
        ],
        logger: config?.logger ?? new _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_3__.NoOpLogger(),
        protocol: config?.protocol ?? _aws_sdk_core_protocols__WEBPACK_IMPORTED_MODULE_1__.AwsRestJsonProtocol,
        protocolSettings: config?.protocolSettings ?? {
            defaultNamespace: "com.amazonaws.ssooidc",
            errorTypeRegistries: _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_11__.errorTypeRegistries,
            version: "2019-06-10",
            serviceTarget: "AWSSSOOIDCService",
        },
        serviceId: config?.serviceId ?? "SSO OIDC",
        urlParser: config?.urlParser ?? _smithy_url_parser__WEBPACK_IMPORTED_MODULE_4__.parseUrl,
        utf8Decoder: config?.utf8Decoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_7__.fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_8__.toUtf8,
    };
};


/***/ },

/***/ 430
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRuntimeExtensions: () => (/* binding */ resolveRuntimeExtensions)
/* harmony export */ });
/* harmony import */ var _aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311);
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(312);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(313);
/* harmony import */ var _auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(431);




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.getAwsRegionExtensionConfiguration)(runtimeConfig), (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.getDefaultExtensionConfiguration)(runtimeConfig), (0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.getHttpHandlerExtensionConfiguration)(runtimeConfig), (0,_auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__.getHttpAuthExtensionConfiguration)(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.resolveDefaultRuntimeConfig)(extensionConfiguration), (0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0,_auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
};


/***/ },

/***/ 427
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessDeniedException$: () => (/* binding */ AccessDeniedException$),
/* harmony export */   AuthorizationPendingException$: () => (/* binding */ AuthorizationPendingException$),
/* harmony export */   CreateToken$: () => (/* binding */ CreateToken$),
/* harmony export */   CreateTokenRequest$: () => (/* binding */ CreateTokenRequest$),
/* harmony export */   CreateTokenResponse$: () => (/* binding */ CreateTokenResponse$),
/* harmony export */   ExpiredTokenException$: () => (/* binding */ ExpiredTokenException$),
/* harmony export */   InternalServerException$: () => (/* binding */ InternalServerException$),
/* harmony export */   InvalidClientException$: () => (/* binding */ InvalidClientException$),
/* harmony export */   InvalidGrantException$: () => (/* binding */ InvalidGrantException$),
/* harmony export */   InvalidRequestException$: () => (/* binding */ InvalidRequestException$),
/* harmony export */   InvalidScopeException$: () => (/* binding */ InvalidScopeException$),
/* harmony export */   SSOOIDCServiceException$: () => (/* binding */ SSOOIDCServiceException$),
/* harmony export */   SlowDownException$: () => (/* binding */ SlowDownException$),
/* harmony export */   UnauthorizedClientException$: () => (/* binding */ UnauthorizedClientException$),
/* harmony export */   UnsupportedGrantTypeException$: () => (/* binding */ UnsupportedGrantTypeException$),
/* harmony export */   errorTypeRegistries: () => (/* binding */ errorTypeRegistries)
/* harmony export */ });
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(280);
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(428);
/* harmony import */ var _models_SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(429);
const _ADE = "AccessDeniedException";
const _APE = "AuthorizationPendingException";
const _AT = "AccessToken";
const _CS = "ClientSecret";
const _CT = "CreateToken";
const _CTR = "CreateTokenRequest";
const _CTRr = "CreateTokenResponse";
const _CV = "CodeVerifier";
const _ETE = "ExpiredTokenException";
const _ICE = "InvalidClientException";
const _IGE = "InvalidGrantException";
const _IRE = "InvalidRequestException";
const _ISE = "InternalServerException";
const _ISEn = "InvalidScopeException";
const _IT = "IdToken";
const _RT = "RefreshToken";
const _SDE = "SlowDownException";
const _UCE = "UnauthorizedClientException";
const _UGTE = "UnsupportedGrantTypeException";
const _aT = "accessToken";
const _c = "client";
const _cI = "clientId";
const _cS = "clientSecret";
const _cV = "codeVerifier";
const _co = "code";
const _dC = "deviceCode";
const _e = "error";
const _eI = "expiresIn";
const _ed = "error_description";
const _gT = "grantType";
const _h = "http";
const _hE = "httpError";
const _iT = "idToken";
const _r = "reason";
const _rT = "refreshToken";
const _rU = "redirectUri";
const _s = "smithy.ts.sdk.synthetic.com.amazonaws.ssooidc";
const _sc = "scope";
const _se = "server";
const _tT = "tokenType";
const n0 = "com.amazonaws.ssooidc";



const _s_registry = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.TypeRegistry.for(_s);
var SSOOIDCServiceException$ = [-3, _s, "SSOOIDCServiceException", 0, [], []];
_s_registry.registerError(SSOOIDCServiceException$, _models_SSOOIDCServiceException__WEBPACK_IMPORTED_MODULE_2__.SSOOIDCServiceException);
const n0_registry = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.TypeRegistry.for(n0);
var AccessDeniedException$ = [
    -3,
    n0,
    _ADE,
    { [_e]: _c, [_hE]: 400 },
    [_e, _r, _ed],
    [0, 0, 0],
];
n0_registry.registerError(AccessDeniedException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.AccessDeniedException);
var AuthorizationPendingException$ = [
    -3,
    n0,
    _APE,
    { [_e]: _c, [_hE]: 400 },
    [_e, _ed],
    [0, 0],
];
n0_registry.registerError(AuthorizationPendingException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.AuthorizationPendingException);
var ExpiredTokenException$ = [-3, n0, _ETE, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
n0_registry.registerError(ExpiredTokenException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.ExpiredTokenException);
var InternalServerException$ = [-3, n0, _ISE, { [_e]: _se, [_hE]: 500 }, [_e, _ed], [0, 0]];
n0_registry.registerError(InternalServerException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InternalServerException);
var InvalidClientException$ = [-3, n0, _ICE, { [_e]: _c, [_hE]: 401 }, [_e, _ed], [0, 0]];
n0_registry.registerError(InvalidClientException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InvalidClientException);
var InvalidGrantException$ = [-3, n0, _IGE, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
n0_registry.registerError(InvalidGrantException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InvalidGrantException);
var InvalidRequestException$ = [
    -3,
    n0,
    _IRE,
    { [_e]: _c, [_hE]: 400 },
    [_e, _r, _ed],
    [0, 0, 0],
];
n0_registry.registerError(InvalidRequestException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InvalidRequestException);
var InvalidScopeException$ = [-3, n0, _ISEn, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
n0_registry.registerError(InvalidScopeException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InvalidScopeException);
var SlowDownException$ = [-3, n0, _SDE, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
n0_registry.registerError(SlowDownException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.SlowDownException);
var UnauthorizedClientException$ = [
    -3,
    n0,
    _UCE,
    { [_e]: _c, [_hE]: 400 },
    [_e, _ed],
    [0, 0],
];
n0_registry.registerError(UnauthorizedClientException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.UnauthorizedClientException);
var UnsupportedGrantTypeException$ = [
    -3,
    n0,
    _UGTE,
    { [_e]: _c, [_hE]: 400 },
    [_e, _ed],
    [0, 0],
];
n0_registry.registerError(UnsupportedGrantTypeException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.UnsupportedGrantTypeException);
const errorTypeRegistries = [_s_registry, n0_registry];
var AccessToken = [0, n0, _AT, 8, 0];
var ClientSecret = [0, n0, _CS, 8, 0];
var CodeVerifier = [0, n0, _CV, 8, 0];
var IdToken = [0, n0, _IT, 8, 0];
var RefreshToken = [0, n0, _RT, 8, 0];
var CreateTokenRequest$ = [
    3,
    n0,
    _CTR,
    0,
    [_cI, _cS, _gT, _dC, _co, _rT, _sc, _rU, _cV],
    [0, [() => ClientSecret, 0], 0, 0, 0, [() => RefreshToken, 0], 64 | 0, 0, [() => CodeVerifier, 0]],
    3,
];
var CreateTokenResponse$ = [
    3,
    n0,
    _CTRr,
    0,
    [_aT, _tT, _eI, _rT, _iT],
    [[() => AccessToken, 0], 0, 1, [() => RefreshToken, 0], [() => IdToken, 0]],
];
var Scopes = 64 | 0;
var CreateToken$ = [
    9,
    n0,
    _CT,
    { [_h]: ["POST", "/token", 200] },
    () => CreateTokenRequest$,
    () => CreateTokenResponse$,
];


/***/ },

/***/ 424
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NoAuthSigner: () => (/* binding */ NoAuthSigner)
/* harmony export */ });
class NoAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
        return httpRequest;
    }
}


/***/ },

/***/ 422
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@aws-sdk/nested-clients","version":"3.996.3","description":"Nested clients for AWS SDK packages.","main":"./dist-cjs/index.js","module":"./dist-es/index.js","types":"./dist-types/index.d.ts","scripts":{"build":"yarn lint && concurrently \'yarn:build:types\' \'yarn:build:es\' && yarn build:cjs","build:cjs":"node ../../scripts/compilation/inline nested-clients","build:es":"tsc -p tsconfig.es.json","build:include:deps":"yarn g:turbo run build -F=\\"$npm_package_name\\"","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo","lint":"node ../../scripts/validation/submodules-linter.js --pkg nested-clients","test":"yarn g:vitest run","test:watch":"yarn g:vitest watch"},"engines":{"node":">=20.0.0"},"sideEffects":false,"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","dependencies":{"@aws-crypto/sha256-browser":"5.2.0","@aws-crypto/sha256-js":"5.2.0","@aws-sdk/core":"^3.973.15","@aws-sdk/middleware-host-header":"^3.972.6","@aws-sdk/middleware-logger":"^3.972.6","@aws-sdk/middleware-recursion-detection":"^3.972.6","@aws-sdk/middleware-user-agent":"^3.972.15","@aws-sdk/region-config-resolver":"^3.972.6","@aws-sdk/types":"^3.973.4","@aws-sdk/util-endpoints":"^3.996.3","@aws-sdk/util-user-agent-browser":"^3.972.6","@aws-sdk/util-user-agent-node":"^3.973.0","@smithy/config-resolver":"^4.4.9","@smithy/core":"^3.23.6","@smithy/fetch-http-handler":"^5.3.11","@smithy/hash-node":"^4.2.10","@smithy/invalid-dependency":"^4.2.10","@smithy/middleware-content-length":"^4.2.10","@smithy/middleware-endpoint":"^4.4.20","@smithy/middleware-retry":"^4.4.37","@smithy/middleware-serde":"^4.2.11","@smithy/middleware-stack":"^4.2.10","@smithy/node-config-provider":"^4.3.10","@smithy/node-http-handler":"^4.4.12","@smithy/protocol-http":"^5.3.10","@smithy/smithy-client":"^4.12.0","@smithy/types":"^4.13.0","@smithy/url-parser":"^4.2.10","@smithy/util-base64":"^4.3.1","@smithy/util-body-length-browser":"^4.2.1","@smithy/util-body-length-node":"^4.2.2","@smithy/util-defaults-mode-browser":"^4.3.36","@smithy/util-defaults-mode-node":"^4.2.39","@smithy/util-endpoints":"^3.3.1","@smithy/util-middleware":"^4.2.10","@smithy/util-retry":"^4.2.10","@smithy/util-utf8":"^4.2.1","tslib":"^2.6.2"},"devDependencies":{"concurrently":"7.0.0","downlevel-dts":"0.10.1","premove":"4.0.0","typescript":"~5.8.3"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["./cognito-identity.d.ts","./cognito-identity.js","./signin.d.ts","./signin.js","./sso-oidc.d.ts","./sso-oidc.js","./sso.d.ts","./sso.js","./sts.d.ts","./sts.js","dist-*/**"],"browser":{"./dist-es/submodules/signin/runtimeConfig":"./dist-es/submodules/signin/runtimeConfig.browser","./dist-es/submodules/sso-oidc/runtimeConfig":"./dist-es/submodules/sso-oidc/runtimeConfig.browser","./dist-es/submodules/sts/runtimeConfig":"./dist-es/submodules/sts/runtimeConfig.browser"},"react-native":{},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"packages/nested-clients"},"exports":{"./package.json":"./package.json","./sso-oidc":{"types":"./dist-types/submodules/sso-oidc/index.d.ts","module":"./dist-es/submodules/sso-oidc/index.js","node":"./dist-cjs/submodules/sso-oidc/index.js","import":"./dist-es/submodules/sso-oidc/index.js","require":"./dist-cjs/submodules/sso-oidc/index.js"},"./sts":{"types":"./dist-types/submodules/sts/index.d.ts","module":"./dist-es/submodules/sts/index.js","node":"./dist-cjs/submodules/sts/index.js","import":"./dist-es/submodules/sts/index.js","require":"./dist-cjs/submodules/sts/index.js"},"./signin":{"types":"./dist-types/submodules/signin/index.d.ts","module":"./dist-es/submodules/signin/index.js","node":"./dist-cjs/submodules/signin/index.js","import":"./dist-es/submodules/signin/index.js","require":"./dist-cjs/submodules/signin/index.js"},"./cognito-identity":{"types":"./dist-types/submodules/cognito-identity/index.d.ts","module":"./dist-es/submodules/cognito-identity/index.js","node":"./dist-cjs/submodules/cognito-identity/index.js","import":"./dist-es/submodules/cognito-identity/index.js","require":"./dist-cjs/submodules/cognito-identity/index.js"},"./sso":{"types":"./dist-types/submodules/sso/index.d.ts","module":"./dist-es/submodules/sso/index.js","node":"./dist-cjs/submodules/sso/index.js","import":"./dist-es/submodules/sso/index.js","require":"./dist-cjs/submodules/sso/index.js"}}}');

/***/ }

};
;
//# sourceMappingURL=8.extension.js.map