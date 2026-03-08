"use strict";
exports.id = 4;
exports.ids = [4];
exports.modules = {

/***/ 386
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromTokenFile: () => (/* binding */ fromTokenFile)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(381);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(217);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fromWebToken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(387);





const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
const fromTokenFile = (init = {}) => async (awsIdentityProperties) => {
    init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
    const webIdentityTokenFile = init?.webIdentityTokenFile ?? process.env[ENV_TOKEN_FILE];
    const roleArn = init?.roleArn ?? process.env[ENV_ROLE_ARN];
    const roleSessionName = init?.roleSessionName ?? process.env[ENV_ROLE_SESSION_NAME];
    if (!webIdentityTokenFile || !roleArn) {
        throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__.CredentialsProviderError("Web identity configuration not specified", {
            logger: init.logger,
        });
    }
    const credentials = await (0,_fromWebToken__WEBPACK_IMPORTED_MODULE_4__.fromWebToken)({
        ...init,
        webIdentityToken: _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__.externalDataInterceptor?.getTokenRecord?.()[webIdentityTokenFile] ??
            (0,node_fs__WEBPACK_IMPORTED_MODULE_3__.readFileSync)(webIdentityTokenFile, { encoding: "ascii" }),
        roleArn,
        roleSessionName,
    })(awsIdentityProperties);
    if (webIdentityTokenFile === process.env[ENV_TOKEN_FILE]) {
        (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
    }
    return credentials;
};


/***/ },

/***/ 387
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromWebToken: () => (/* binding */ fromWebToken)
/* harmony export */ });
const fromWebToken = (init) => async (awsIdentityProperties) => {
    init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
    const { roleArn, roleSessionName, webIdentityToken, providerId, policyArns, policy, durationSeconds } = init;
    let { roleAssumerWithWebIdentity } = init;
    if (!roleAssumerWithWebIdentity) {
        const { getDefaultRoleAssumerWithWebIdentity } = await Promise.all(/* import() */[__webpack_require__.e(7), __webpack_require__.e(10)]).then(__webpack_require__.bind(__webpack_require__, 452));
        roleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity({
            ...init.clientConfig,
            credentialProviderLogger: init.logger,
            parentClientConfig: {
                ...awsIdentityProperties?.callerClientConfig,
                ...init.parentClientConfig,
            },
        }, init.clientPlugins);
    }
    return roleAssumerWithWebIdentity({
        RoleArn: roleArn,
        RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
        WebIdentityToken: webIdentityToken,
        ProviderId: providerId,
        PolicyArns: policyArns,
        Policy: policy,
        DurationSeconds: durationSeconds,
    });
};


/***/ },

/***/ 385
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromTokenFile: () => (/* reexport safe */ _fromTokenFile__WEBPACK_IMPORTED_MODULE_0__.fromTokenFile),
/* harmony export */   fromWebToken: () => (/* reexport safe */ _fromWebToken__WEBPACK_IMPORTED_MODULE_1__.fromWebToken)
/* harmony export */ });
/* harmony import */ var _fromTokenFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(386);
/* harmony import */ var _fromWebToken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(387);




/***/ },

/***/ 381
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   externalDataInterceptor: () => (/* binding */ externalDataInterceptor)
/* harmony export */ });
/* harmony import */ var _getSSOTokenFromFile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(204);
/* harmony import */ var _readFile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(112);


const externalDataInterceptor = {
    getFileRecord() {
        return _readFile__WEBPACK_IMPORTED_MODULE_1__.fileIntercept;
    },
    interceptFile(path, contents) {
        _readFile__WEBPACK_IMPORTED_MODULE_1__.fileIntercept[path] = Promise.resolve(contents);
    },
    getTokenRecord() {
        return _getSSOTokenFromFile__WEBPACK_IMPORTED_MODULE_0__.tokenIntercept;
    },
    interceptToken(id, contents) {
        _getSSOTokenFromFile__WEBPACK_IMPORTED_MODULE_0__.tokenIntercept[id] = contents;
    },
};


/***/ }

};
;
//# sourceMappingURL=4.extension.js.map