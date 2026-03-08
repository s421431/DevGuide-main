"use strict";
exports.id = 11;
exports.ids = [11];
exports.modules = {

/***/ 502
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Signin: () => (/* binding */ Signin)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319);
/* harmony import */ var _commands_CreateOAuth2TokenCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(503);
/* harmony import */ var _SigninClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(490);



const commands = {
    CreateOAuth2TokenCommand: _commands_CreateOAuth2TokenCommand__WEBPACK_IMPORTED_MODULE_1__.CreateOAuth2TokenCommand,
};
class Signin extends _SigninClient__WEBPACK_IMPORTED_MODULE_2__.SigninClient {
}
(0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.createAggregatedClient)(commands, Signin);


/***/ },

/***/ 490
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninClient: () => (/* binding */ SigninClient),
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
/* harmony import */ var _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(491);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(492);
/* harmony import */ var _runtimeConfig__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(493);
/* harmony import */ var _runtimeExtensions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(500);
















class SigninClient extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__.Client {
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
            httpAuthSchemeParametersProvider: _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__.defaultSigninHttpAuthSchemeParametersProvider,
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

/***/ 501
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

/***/ 491
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultSigninHttpAuthSchemeParametersProvider: () => (/* binding */ defaultSigninHttpAuthSchemeParametersProvider),
/* harmony export */   defaultSigninHttpAuthSchemeProvider: () => (/* binding */ defaultSigninHttpAuthSchemeProvider),
/* harmony export */   resolveHttpAuthSchemeConfig: () => (/* binding */ resolveHttpAuthSchemeConfig)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(139);
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91);


const defaultSigninHttpAuthSchemeParametersProvider = async (config, context, input) => {
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
            name: "signin",
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
const defaultSigninHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        case "CreateOAuth2Token": {
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

/***/ 503
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command),
/* harmony export */   CreateOAuth2TokenCommand: () => (/* binding */ CreateOAuth2TokenCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(321);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(330);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(492);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(497);





class CreateOAuth2TokenCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__.commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("Signin", "CreateOAuth2Token", {})
    .n("SigninClient", "CreateOAuth2TokenCommand")
    .sc(_schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateOAuth2Token$)
    .build() {
}


/***/ },

/***/ 504
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _CreateOAuth2TokenCommand__WEBPACK_IMPORTED_MODULE_0__.$Command),
/* harmony export */   CreateOAuth2TokenCommand: () => (/* reexport safe */ _CreateOAuth2TokenCommand__WEBPACK_IMPORTED_MODULE_0__.CreateOAuth2TokenCommand)
/* harmony export */ });
/* harmony import */ var _CreateOAuth2TokenCommand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(503);



/***/ },

/***/ 492
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
        defaultSigningName: "signin",
    });
};
const commonParams = {
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};


/***/ },

/***/ 495
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultEndpointResolver: () => (/* binding */ defaultEndpointResolver)
/* harmony export */ });
/* harmony import */ var _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(305);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var _ruleset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(496);



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

/***/ 496
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ruleSet: () => (/* binding */ ruleSet)
/* harmony export */ });
const u = "required", v = "fn", w = "argv", x = "ref";
const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "stringEquals", i = { [u]: true, default: false, type: "boolean" }, j = { [u]: false, type: "string" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: "getAttr", [w]: [{ [x]: g }, "name"] }, p = { [v]: c, [w]: [{ [x]: "UseFIPS" }, false] }, q = { [v]: c, [w]: [{ [x]: "UseDualStack" }, false] }, r = { [v]: "getAttr", [w]: [{ [x]: g }, "supportsFIPS"] }, s = { [v]: c, [w]: [true, { [v]: "getAttr", [w]: [{ [x]: g }, "supportsDualStack"] }] }, t = [{ [x]: "Region" }];
const _data = {
    version: "1.0",
    parameters: { UseDualStack: i, UseFIPS: i, Endpoint: j, Region: j },
    rules: [
        {
            conditions: [{ [v]: b, [w]: [k] }],
            rules: [
                { conditions: [l], error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d },
                {
                    rules: [
                        {
                            conditions: [m],
                            error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                            type: d,
                        },
                        { endpoint: { url: k, properties: n, headers: n }, type: e },
                    ],
                    type: f,
                },
            ],
            type: f,
        },
        {
            rules: [
                {
                    conditions: [{ [v]: b, [w]: t }],
                    rules: [
                        {
                            conditions: [{ [v]: "aws.partition", [w]: t, assign: g }],
                            rules: [
                                {
                                    conditions: [{ [v]: h, [w]: [o, "aws"] }, p, q],
                                    endpoint: { url: "https://{Region}.signin.aws.amazon.com", properties: n, headers: n },
                                    type: e,
                                },
                                {
                                    conditions: [{ [v]: h, [w]: [o, "aws-cn"] }, p, q],
                                    endpoint: { url: "https://{Region}.signin.amazonaws.cn", properties: n, headers: n },
                                    type: e,
                                },
                                {
                                    conditions: [{ [v]: h, [w]: [o, "aws-us-gov"] }, p, q],
                                    endpoint: { url: "https://{Region}.signin.amazonaws-us-gov.com", properties: n, headers: n },
                                    type: e,
                                },
                                {
                                    conditions: [l, m],
                                    rules: [
                                        {
                                            conditions: [{ [v]: c, [w]: [a, r] }, s],
                                            rules: [
                                                {
                                                    endpoint: {
                                                        url: "https://signin-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                        properties: n,
                                                        headers: n,
                                                    },
                                                    type: e,
                                                },
                                            ],
                                            type: f,
                                        },
                                        {
                                            error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                                            type: d,
                                        },
                                    ],
                                    type: f,
                                },
                                {
                                    conditions: [l, q],
                                    rules: [
                                        {
                                            conditions: [{ [v]: c, [w]: [r, a] }],
                                            rules: [
                                                {
                                                    endpoint: {
                                                        url: "https://signin-fips.{Region}.{PartitionResult#dnsSuffix}",
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
                                    conditions: [p, m],
                                    rules: [
                                        {
                                            conditions: [s],
                                            rules: [
                                                {
                                                    endpoint: {
                                                        url: "https://signin.{Region}.{PartitionResult#dualStackDnsSuffix}",
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
                                    endpoint: { url: "https://signin.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n },
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
            type: f,
        },
    ],
};
const ruleSet = _data;


/***/ },

/***/ 489
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.$Command),
/* harmony export */   AccessDeniedException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.AccessDeniedException),
/* harmony export */   AccessDeniedException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AccessDeniedException$),
/* harmony export */   AccessToken$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AccessToken$),
/* harmony export */   CreateOAuth2Token$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateOAuth2Token$),
/* harmony export */   CreateOAuth2TokenCommand: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.CreateOAuth2TokenCommand),
/* harmony export */   CreateOAuth2TokenRequest$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateOAuth2TokenRequest$),
/* harmony export */   CreateOAuth2TokenRequestBody$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateOAuth2TokenRequestBody$),
/* harmony export */   CreateOAuth2TokenResponse$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateOAuth2TokenResponse$),
/* harmony export */   CreateOAuth2TokenResponseBody$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.CreateOAuth2TokenResponseBody$),
/* harmony export */   InternalServerException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.InternalServerException),
/* harmony export */   InternalServerException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InternalServerException$),
/* harmony export */   OAuth2ErrorCode: () => (/* reexport safe */ _models_enums__WEBPACK_IMPORTED_MODULE_4__.OAuth2ErrorCode),
/* harmony export */   Signin: () => (/* reexport safe */ _Signin__WEBPACK_IMPORTED_MODULE_1__.Signin),
/* harmony export */   SigninClient: () => (/* reexport safe */ _SigninClient__WEBPACK_IMPORTED_MODULE_0__.SigninClient),
/* harmony export */   SigninServiceException: () => (/* reexport safe */ _models_SigninServiceException__WEBPACK_IMPORTED_MODULE_6__.SigninServiceException),
/* harmony export */   SigninServiceException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.SigninServiceException$),
/* harmony export */   TooManyRequestsError: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.TooManyRequestsError),
/* harmony export */   TooManyRequestsError$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.TooManyRequestsError$),
/* harmony export */   ValidationException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_5__.ValidationException),
/* harmony export */   ValidationException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.ValidationException$),
/* harmony export */   __Client: () => (/* reexport safe */ _SigninClient__WEBPACK_IMPORTED_MODULE_0__.__Client),
/* harmony export */   errorTypeRegistries: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.errorTypeRegistries)
/* harmony export */ });
/* harmony import */ var _SigninClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);
/* harmony import */ var _Signin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(502);
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(504);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(497);
/* harmony import */ var _models_enums__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(505);
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(498);
/* harmony import */ var _models_SigninServiceException__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(499);










/***/ },

/***/ 499
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SigninServiceException: () => (/* binding */ SigninServiceException),
/* harmony export */   __ServiceException: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);


class SigninServiceException extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SigninServiceException.prototype);
    }
}


/***/ },

/***/ 505
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OAuth2ErrorCode: () => (/* binding */ OAuth2ErrorCode)
/* harmony export */ });
const OAuth2ErrorCode = {
    AUTHCODE_EXPIRED: "AUTHCODE_EXPIRED",
    INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
    INVALID_REQUEST: "INVALID_REQUEST",
    SERVER_ERROR: "server_error",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    USER_CREDENTIALS_CHANGED: "USER_CREDENTIALS_CHANGED",
};


/***/ },

/***/ 498
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessDeniedException: () => (/* binding */ AccessDeniedException),
/* harmony export */   InternalServerException: () => (/* binding */ InternalServerException),
/* harmony export */   TooManyRequestsError: () => (/* binding */ TooManyRequestsError),
/* harmony export */   ValidationException: () => (/* binding */ ValidationException)
/* harmony export */ });
/* harmony import */ var _SigninServiceException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(499);

class AccessDeniedException extends _SigninServiceException__WEBPACK_IMPORTED_MODULE_0__.SigninServiceException {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    constructor(opts) {
        super({
            name: "AccessDeniedException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, AccessDeniedException.prototype);
        this.error = opts.error;
    }
}
class InternalServerException extends _SigninServiceException__WEBPACK_IMPORTED_MODULE_0__.SigninServiceException {
    name = "InternalServerException";
    $fault = "server";
    error;
    constructor(opts) {
        super({
            name: "InternalServerException",
            $fault: "server",
            ...opts,
        });
        Object.setPrototypeOf(this, InternalServerException.prototype);
        this.error = opts.error;
    }
}
class TooManyRequestsError extends _SigninServiceException__WEBPACK_IMPORTED_MODULE_0__.SigninServiceException {
    name = "TooManyRequestsError";
    $fault = "client";
    error;
    constructor(opts) {
        super({
            name: "TooManyRequestsError",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, TooManyRequestsError.prototype);
        this.error = opts.error;
    }
}
class ValidationException extends _SigninServiceException__WEBPACK_IMPORTED_MODULE_0__.SigninServiceException {
    name = "ValidationException";
    $fault = "client";
    error;
    constructor(opts) {
        super({
            name: "ValidationException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ValidationException.prototype);
        this.error = opts.error;
    }
}


/***/ },

/***/ 493
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
/* harmony import */ var _runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(494);













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

/***/ 494
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
/* harmony import */ var _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(491);
/* harmony import */ var _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(495);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(497);










const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2023-01-01",
        base64Decoder: config?.base64Decoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_5__.fromBase64,
        base64Encoder: config?.base64Encoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_10__.defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_9__.defaultSigninHttpAuthSchemeProvider,
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
            defaultNamespace: "com.amazonaws.signin",
            errorTypeRegistries: _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_11__.errorTypeRegistries,
            version: "2023-01-01",
            serviceTarget: "Signin",
        },
        serviceId: config?.serviceId ?? "Signin",
        urlParser: config?.urlParser ?? _smithy_url_parser__WEBPACK_IMPORTED_MODULE_4__.parseUrl,
        utf8Decoder: config?.utf8Decoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_7__.fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_8__.toUtf8,
    };
};


/***/ },

/***/ 500
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRuntimeExtensions: () => (/* binding */ resolveRuntimeExtensions)
/* harmony export */ });
/* harmony import */ var _aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311);
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(312);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(313);
/* harmony import */ var _auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(501);




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.getAwsRegionExtensionConfiguration)(runtimeConfig), (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.getDefaultExtensionConfiguration)(runtimeConfig), (0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.getHttpHandlerExtensionConfiguration)(runtimeConfig), (0,_auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__.getHttpAuthExtensionConfiguration)(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.resolveDefaultRuntimeConfig)(extensionConfiguration), (0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0,_auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
};


/***/ },

/***/ 497
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccessDeniedException$: () => (/* binding */ AccessDeniedException$),
/* harmony export */   AccessToken$: () => (/* binding */ AccessToken$),
/* harmony export */   CreateOAuth2Token$: () => (/* binding */ CreateOAuth2Token$),
/* harmony export */   CreateOAuth2TokenRequest$: () => (/* binding */ CreateOAuth2TokenRequest$),
/* harmony export */   CreateOAuth2TokenRequestBody$: () => (/* binding */ CreateOAuth2TokenRequestBody$),
/* harmony export */   CreateOAuth2TokenResponse$: () => (/* binding */ CreateOAuth2TokenResponse$),
/* harmony export */   CreateOAuth2TokenResponseBody$: () => (/* binding */ CreateOAuth2TokenResponseBody$),
/* harmony export */   InternalServerException$: () => (/* binding */ InternalServerException$),
/* harmony export */   SigninServiceException$: () => (/* binding */ SigninServiceException$),
/* harmony export */   TooManyRequestsError$: () => (/* binding */ TooManyRequestsError$),
/* harmony export */   ValidationException$: () => (/* binding */ ValidationException$),
/* harmony export */   errorTypeRegistries: () => (/* binding */ errorTypeRegistries)
/* harmony export */ });
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(280);
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(498);
/* harmony import */ var _models_SigninServiceException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(499);
const _ADE = "AccessDeniedException";
const _AT = "AccessToken";
const _COAT = "CreateOAuth2Token";
const _COATR = "CreateOAuth2TokenRequest";
const _COATRB = "CreateOAuth2TokenRequestBody";
const _COATRBr = "CreateOAuth2TokenResponseBody";
const _COATRr = "CreateOAuth2TokenResponse";
const _ISE = "InternalServerException";
const _RT = "RefreshToken";
const _TMRE = "TooManyRequestsError";
const _VE = "ValidationException";
const _aKI = "accessKeyId";
const _aT = "accessToken";
const _c = "client";
const _cI = "clientId";
const _cV = "codeVerifier";
const _co = "code";
const _e = "error";
const _eI = "expiresIn";
const _gT = "grantType";
const _h = "http";
const _hE = "httpError";
const _iT = "idToken";
const _jN = "jsonName";
const _m = "message";
const _rT = "refreshToken";
const _rU = "redirectUri";
const _s = "smithy.ts.sdk.synthetic.com.amazonaws.signin";
const _sAK = "secretAccessKey";
const _sT = "sessionToken";
const _se = "server";
const _tI = "tokenInput";
const _tO = "tokenOutput";
const _tT = "tokenType";
const n0 = "com.amazonaws.signin";



const _s_registry = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.TypeRegistry.for(_s);
var SigninServiceException$ = [-3, _s, "SigninServiceException", 0, [], []];
_s_registry.registerError(SigninServiceException$, _models_SigninServiceException__WEBPACK_IMPORTED_MODULE_2__.SigninServiceException);
const n0_registry = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.TypeRegistry.for(n0);
var AccessDeniedException$ = [-3, n0, _ADE, { [_e]: _c }, [_e, _m], [0, 0], 2];
n0_registry.registerError(AccessDeniedException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.AccessDeniedException);
var InternalServerException$ = [-3, n0, _ISE, { [_e]: _se, [_hE]: 500 }, [_e, _m], [0, 0], 2];
n0_registry.registerError(InternalServerException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InternalServerException);
var TooManyRequestsError$ = [-3, n0, _TMRE, { [_e]: _c, [_hE]: 429 }, [_e, _m], [0, 0], 2];
n0_registry.registerError(TooManyRequestsError$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.TooManyRequestsError);
var ValidationException$ = [-3, n0, _VE, { [_e]: _c, [_hE]: 400 }, [_e, _m], [0, 0], 2];
n0_registry.registerError(ValidationException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.ValidationException);
const errorTypeRegistries = [_s_registry, n0_registry];
var RefreshToken = [0, n0, _RT, 8, 0];
var AccessToken$ = [
    3,
    n0,
    _AT,
    8,
    [_aKI, _sAK, _sT],
    [
        [0, { [_jN]: _aKI }],
        [0, { [_jN]: _sAK }],
        [0, { [_jN]: _sT }],
    ],
    3,
];
var CreateOAuth2TokenRequest$ = [
    3,
    n0,
    _COATR,
    0,
    [_tI],
    [[() => CreateOAuth2TokenRequestBody$, 16]],
    1,
];
var CreateOAuth2TokenRequestBody$ = [
    3,
    n0,
    _COATRB,
    0,
    [_cI, _gT, _co, _rU, _cV, _rT],
    [
        [0, { [_jN]: _cI }],
        [0, { [_jN]: _gT }],
        0,
        [0, { [_jN]: _rU }],
        [0, { [_jN]: _cV }],
        [() => RefreshToken, { [_jN]: _rT }],
    ],
    2,
];
var CreateOAuth2TokenResponse$ = [
    3,
    n0,
    _COATRr,
    0,
    [_tO],
    [[() => CreateOAuth2TokenResponseBody$, 16]],
    1,
];
var CreateOAuth2TokenResponseBody$ = [
    3,
    n0,
    _COATRBr,
    0,
    [_aT, _tT, _eI, _rT, _iT],
    [
        [() => AccessToken$, { [_jN]: _aT }],
        [0, { [_jN]: _tT }],
        [1, { [_jN]: _eI }],
        [() => RefreshToken, { [_jN]: _rT }],
        [0, { [_jN]: _iT }],
    ],
    4,
];
var CreateOAuth2Token$ = [
    9,
    n0,
    _COAT,
    { [_h]: ["POST", "/v1/token", 200] },
    () => CreateOAuth2TokenRequest$,
    () => CreateOAuth2TokenResponse$,
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
//# sourceMappingURL=11.extension.js.map