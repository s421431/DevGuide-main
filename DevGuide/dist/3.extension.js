"use strict";
exports.id = 3;
exports.ids = [3];
exports.modules = {

/***/ 379
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromProcess: () => (/* binding */ fromProcess)
/* harmony export */ });
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(209);
/* harmony import */ var _resolveProcessCredentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(380);


const fromProcess = (init = {}) => async ({ callerClientConfig } = {}) => {
    init.logger?.debug("@aws-sdk/credential-provider-process - fromProcess");
    const profiles = await (0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_1__.parseKnownFiles)(init);
    return (0,_resolveProcessCredentials__WEBPACK_IMPORTED_MODULE_2__.resolveProcessCredentials)((0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_0__.getProfileName)({
        profile: init.profile ?? callerClientConfig?.profile,
    }), profiles, init.logger);
};


/***/ },

/***/ 384
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValidatedProcessCredentials: () => (/* binding */ getValidatedProcessCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);

const getValidatedProcessCredentials = (profileName, data, profiles) => {
    if (data.Version !== 1) {
        throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
    }
    if (data.AccessKeyId === undefined || data.SecretAccessKey === undefined) {
        throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
    }
    if (data.Expiration) {
        const currentTime = new Date();
        const expireTime = new Date(data.Expiration);
        if (expireTime < currentTime) {
            throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
        }
    }
    let accountId = data.AccountId;
    if (!accountId && profiles?.[profileName]?.aws_account_id) {
        accountId = profiles[profileName].aws_account_id;
    }
    const credentials = {
        accessKeyId: data.AccessKeyId,
        secretAccessKey: data.SecretAccessKey,
        ...(data.SessionToken && { sessionToken: data.SessionToken }),
        ...(data.Expiration && { expiration: new Date(data.Expiration) }),
        ...(data.CredentialScope && { credentialScope: data.CredentialScope }),
        ...(accountId && { accountId }),
    };
    (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_PROCESS", "w");
    return credentials;
};


/***/ },

/***/ 378
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromProcess: () => (/* reexport safe */ _fromProcess__WEBPACK_IMPORTED_MODULE_0__.fromProcess)
/* harmony export */ });
/* harmony import */ var _fromProcess__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(379);



/***/ },

/***/ 380
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveProcessCredentials: () => (/* binding */ resolveProcessCredentials)
/* harmony export */ });
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(381);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(382);
/* harmony import */ var node_child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(383);
/* harmony import */ var node_util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_util__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _getValidatedProcessCredentials__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(384);





const resolveProcessCredentials = async (profileName, profiles, logger) => {
    const profile = profiles[profileName];
    if (profiles[profileName]) {
        const credentialProcess = profile["credential_process"];
        if (credentialProcess !== undefined) {
            const execPromise = (0,node_util__WEBPACK_IMPORTED_MODULE_3__.promisify)(_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_1__.externalDataInterceptor?.getTokenRecord?.().exec ?? node_child_process__WEBPACK_IMPORTED_MODULE_2__.exec);
            try {
                const { stdout } = await execPromise(credentialProcess);
                let data;
                try {
                    data = JSON.parse(stdout.trim());
                }
                catch {
                    throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
                }
                return (0,_getValidatedProcessCredentials__WEBPACK_IMPORTED_MODULE_4__.getValidatedProcessCredentials)(profileName, data, profiles);
            }
            catch (error) {
                throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(error.message, { logger });
            }
        }
        else {
            throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Profile ${profileName} did not contain credential_process.`, { logger });
        }
    }
    else {
        throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Profile ${profileName} could not be found in shared credentials file.`, {
            logger,
        });
    }
};


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
//# sourceMappingURL=3.extension.js.map