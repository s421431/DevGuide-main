"use strict";
exports.id = 2;
exports.ids = [2];
exports.modules = {

/***/ 366
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromIni: () => (/* binding */ fromIni)
/* harmony export */ });
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(209);
/* harmony import */ var _resolveProfileData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(367);


const fromIni = (init = {}) => async ({ callerClientConfig } = {}) => {
    init.logger?.debug("@aws-sdk/credential-provider-ini - fromIni");
    const profiles = await (0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_1__.parseKnownFiles)(init);
    return (0,_resolveProfileData__WEBPACK_IMPORTED_MODULE_2__.resolveProfileData)((0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_0__.getProfileName)({
        profile: init.profile ?? callerClientConfig?.profile,
    }), profiles, init, callerClientConfig);
};


/***/ },

/***/ 365
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromIni: () => (/* reexport safe */ _fromIni__WEBPACK_IMPORTED_MODULE_0__.fromIni)
/* harmony export */ });
/* harmony import */ var _fromIni__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(366);



/***/ },

/***/ 368
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAssumeRoleProfile: () => (/* binding */ isAssumeRoleProfile),
/* harmony export */   resolveAssumeRoleCredentials: () => (/* binding */ resolveAssumeRoleCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(101);
/* harmony import */ var _resolveCredentialSource__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(369);




const isAssumeRoleProfile = (arg, { profile = "default", logger } = {}) => {
    return (Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.role_arn === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1 &&
        (isAssumeRoleWithSourceProfile(arg, { profile, logger }) || isCredentialSourceProfile(arg, { profile, logger })));
};
const isAssumeRoleWithSourceProfile = (arg, { profile, logger }) => {
    const withSourceProfile = typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
    if (withSourceProfile) {
        logger?.debug?.(`    ${profile} isAssumeRoleWithSourceProfile source_profile=${arg.source_profile}`);
    }
    return withSourceProfile;
};
const isCredentialSourceProfile = (arg, { profile, logger }) => {
    const withProviderProfile = typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
    if (withProviderProfile) {
        logger?.debug?.(`    ${profile} isCredentialSourceProfile credential_source=${arg.credential_source}`);
    }
    return withProviderProfile;
};
const resolveAssumeRoleCredentials = async (profileName, profiles, options, callerClientConfig, visitedProfiles = {}, resolveProfileData) => {
    options.logger?.debug("@aws-sdk/credential-provider-ini - resolveAssumeRoleCredentials (STS)");
    const profileData = profiles[profileName];
    const { source_profile, region } = profileData;
    if (!options.roleAssumer) {
        const { getDefaultRoleAssumer } = await Promise.all(/* import() */[__webpack_require__.e(7), __webpack_require__.e(10)]).then(__webpack_require__.bind(__webpack_require__, 452));
        options.roleAssumer = getDefaultRoleAssumer({
            ...options.clientConfig,
            credentialProviderLogger: options.logger,
            parentClientConfig: {
                ...callerClientConfig,
                ...options?.parentClientConfig,
                region: region ?? options?.parentClientConfig?.region ?? callerClientConfig?.region,
            },
        }, options.clientPlugins);
    }
    if (source_profile && source_profile in visitedProfiles) {
        throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__.CredentialsProviderError(`Detected a cycle attempting to resolve credentials for profile` +
            ` ${(0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__.getProfileName)(options)}. Profiles visited: ` +
            Object.keys(visitedProfiles).join(", "), { logger: options.logger });
    }
    options.logger?.debug(`@aws-sdk/credential-provider-ini - finding credential resolver using ${source_profile ? `source_profile=[${source_profile}]` : `profile=[${profileName}]`}`);
    const sourceCredsProvider = source_profile
        ? resolveProfileData(source_profile, profiles, options, callerClientConfig, {
            ...visitedProfiles,
            [source_profile]: true,
        }, isCredentialSourceWithoutRoleArn(profiles[source_profile] ?? {}))
        : (await (0,_resolveCredentialSource__WEBPACK_IMPORTED_MODULE_3__.resolveCredentialSource)(profileData.credential_source, profileName, options.logger)(options))();
    if (isCredentialSourceWithoutRoleArn(profileData)) {
        return sourceCredsProvider.then((creds) => (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
    }
    else {
        const params = {
            RoleArn: profileData.role_arn,
            RoleSessionName: profileData.role_session_name || `aws-sdk-js-${Date.now()}`,
            ExternalId: profileData.external_id,
            DurationSeconds: parseInt(profileData.duration_seconds || "3600", 10),
        };
        const { mfa_serial } = profileData;
        if (mfa_serial) {
            if (!options.mfaCodeProvider) {
                throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__.CredentialsProviderError(`Profile ${profileName} requires multi-factor authentication, but no MFA code callback was provided.`, { logger: options.logger, tryNextLink: false });
            }
            params.SerialNumber = mfa_serial;
            params.TokenCode = await options.mfaCodeProvider(mfa_serial);
        }
        const sourceCreds = await sourceCredsProvider;
        return options.roleAssumer(sourceCreds, params).then((creds) => (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_SOURCE_PROFILE", "o"));
    }
};
const isCredentialSourceWithoutRoleArn = (section) => {
    return !section.role_arn && !!section.credential_source;
};


/***/ },

/***/ 369
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveCredentialSource: () => (/* binding */ resolveCredentialSource)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98);
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94);


const resolveCredentialSource = (credentialSource, profileName, logger) => {
    const sourceProvidersMap = {
        EcsContainer: async (options) => {
            const { fromHttp } = await Promise.all(/* import() */[__webpack_require__.e(7), __webpack_require__.e(6)]).then(__webpack_require__.bind(__webpack_require__, 405));
            const { fromContainerMetadata } = await __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(__webpack_require__, 388));
            logger?.debug("@aws-sdk/credential-provider-ini - credential_source is EcsContainer");
            return async () => (0,_smithy_property_provider__WEBPACK_IMPORTED_MODULE_2__.chain)(fromHttp(options ?? {}), fromContainerMetadata(options))().then(setNamedProvider);
        },
        Ec2InstanceMetadata: async (options) => {
            logger?.debug("@aws-sdk/credential-provider-ini - credential_source is Ec2InstanceMetadata");
            const { fromInstanceMetadata } = await __webpack_require__.e(/* import() */ 5).then(__webpack_require__.bind(__webpack_require__, 388));
            return async () => fromInstanceMetadata(options)().then(setNamedProvider);
        },
        Environment: async (options) => {
            logger?.debug("@aws-sdk/credential-provider-ini - credential_source is Environment");
            const { fromEnv } = await __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(__webpack_require__, 488));
            return async () => fromEnv(options)().then(setNamedProvider);
        },
    };
    if (credentialSource in sourceProvidersMap) {
        return sourceProvidersMap[credentialSource];
    }
    else {
        throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__.CredentialsProviderError(`Unsupported credential source in profile ${profileName}. Got ${credentialSource}, ` +
            `expected EcsContainer or Ec2InstanceMetadata or Environment.`, { logger });
    }
};
const setNamedProvider = (creds) => (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_NAMED_PROVIDER", "p");


/***/ },

/***/ 370
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isLoginProfile: () => (/* binding */ isLoginProfile),
/* harmony export */   resolveLoginCredentials: () => (/* binding */ resolveLoginCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);
/* harmony import */ var _aws_sdk_credential_provider_login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(371);


const isLoginProfile = (data) => {
    return Boolean(data && data.login_session);
};
const resolveLoginCredentials = async (profileName, options, callerClientConfig) => {
    const credentials = await (0,_aws_sdk_credential_provider_login__WEBPACK_IMPORTED_MODULE_1__.fromLoginCredentials)({
        ...options,
        profile: profileName,
    })({ callerClientConfig });
    return (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_PROFILE_LOGIN", "AC");
};


/***/ },

/***/ 374
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isProcessProfile: () => (/* binding */ isProcessProfile),
/* harmony export */   resolveProcessCredentials: () => (/* binding */ resolveProcessCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);

const isProcessProfile = (arg) => Boolean(arg) && typeof arg === "object" && typeof arg.credential_process === "string";
const resolveProcessCredentials = async (options, profile) => __webpack_require__.e(/* import() */ 3).then(__webpack_require__.bind(__webpack_require__, 378)).then(({ fromProcess }) => fromProcess({
    ...options,
    profile,
})().then((creds) => (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_PROCESS", "v")));


/***/ },

/***/ 367
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveProfileData: () => (/* binding */ resolveProfileData)
/* harmony export */ });
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony import */ var _resolveAssumeRoleCredentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(368);
/* harmony import */ var _resolveLoginCredentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(370);
/* harmony import */ var _resolveProcessCredentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(374);
/* harmony import */ var _resolveSsoCredentials__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(375);
/* harmony import */ var _resolveStaticCredentials__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(376);
/* harmony import */ var _resolveWebIdentityCredentials__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(377);







const resolveProfileData = async (profileName, profiles, options, callerClientConfig, visitedProfiles = {}, isAssumeRoleRecursiveCall = false) => {
    const data = profiles[profileName];
    if (Object.keys(visitedProfiles).length > 0 && (0,_resolveStaticCredentials__WEBPACK_IMPORTED_MODULE_5__.isStaticCredsProfile)(data)) {
        return (0,_resolveStaticCredentials__WEBPACK_IMPORTED_MODULE_5__.resolveStaticCredentials)(data, options);
    }
    if (isAssumeRoleRecursiveCall || (0,_resolveAssumeRoleCredentials__WEBPACK_IMPORTED_MODULE_1__.isAssumeRoleProfile)(data, { profile: profileName, logger: options.logger })) {
        return (0,_resolveAssumeRoleCredentials__WEBPACK_IMPORTED_MODULE_1__.resolveAssumeRoleCredentials)(profileName, profiles, options, callerClientConfig, visitedProfiles, resolveProfileData);
    }
    if ((0,_resolveStaticCredentials__WEBPACK_IMPORTED_MODULE_5__.isStaticCredsProfile)(data)) {
        return (0,_resolveStaticCredentials__WEBPACK_IMPORTED_MODULE_5__.resolveStaticCredentials)(data, options);
    }
    if ((0,_resolveWebIdentityCredentials__WEBPACK_IMPORTED_MODULE_6__.isWebIdentityProfile)(data)) {
        return (0,_resolveWebIdentityCredentials__WEBPACK_IMPORTED_MODULE_6__.resolveWebIdentityCredentials)(data, options, callerClientConfig);
    }
    if ((0,_resolveProcessCredentials__WEBPACK_IMPORTED_MODULE_3__.isProcessProfile)(data)) {
        return (0,_resolveProcessCredentials__WEBPACK_IMPORTED_MODULE_3__.resolveProcessCredentials)(options, profileName);
    }
    if ((0,_resolveSsoCredentials__WEBPACK_IMPORTED_MODULE_4__.isSsoProfile)(data)) {
        return await (0,_resolveSsoCredentials__WEBPACK_IMPORTED_MODULE_4__.resolveSsoCredentials)(profileName, data, options, callerClientConfig);
    }
    if ((0,_resolveLoginCredentials__WEBPACK_IMPORTED_MODULE_2__.isLoginProfile)(data)) {
        return (0,_resolveLoginCredentials__WEBPACK_IMPORTED_MODULE_2__.resolveLoginCredentials)(profileName, options, callerClientConfig);
    }
    throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Could not resolve credentials using profile: [${profileName}] in configuration/credentials file(s).`, { logger: options.logger });
};


/***/ },

/***/ 375
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSsoProfile: () => (/* binding */ isSsoProfile),
/* harmony export */   resolveSsoCredentials: () => (/* binding */ resolveSsoCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);

const resolveSsoCredentials = async (profile, profileData, options = {}, callerClientConfig) => {
    const { fromSSO } = await __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(__webpack_require__, 353));
    return fromSSO({
        profile,
        logger: options.logger,
        parentClientConfig: options.parentClientConfig,
        clientConfig: options.clientConfig,
    })({
        callerClientConfig,
    }).then((creds) => {
        if (profileData.sso_session) {
            return (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_SSO", "r");
        }
        else {
            return (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_SSO_LEGACY", "t");
        }
    });
};
const isSsoProfile = (arg) => arg &&
    (typeof arg.sso_start_url === "string" ||
        typeof arg.sso_account_id === "string" ||
        typeof arg.sso_session === "string" ||
        typeof arg.sso_region === "string" ||
        typeof arg.sso_role_name === "string");


/***/ },

/***/ 376
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isStaticCredsProfile: () => (/* binding */ isStaticCredsProfile),
/* harmony export */   resolveStaticCredentials: () => (/* binding */ resolveStaticCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);

const isStaticCredsProfile = (arg) => Boolean(arg) &&
    typeof arg === "object" &&
    typeof arg.aws_access_key_id === "string" &&
    typeof arg.aws_secret_access_key === "string" &&
    ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1 &&
    ["undefined", "string"].indexOf(typeof arg.aws_account_id) > -1;
const resolveStaticCredentials = async (profile, options) => {
    options?.logger?.debug("@aws-sdk/credential-provider-ini - resolveStaticCredentials");
    const credentials = {
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
        sessionToken: profile.aws_session_token,
        ...(profile.aws_credential_scope && { credentialScope: profile.aws_credential_scope }),
        ...(profile.aws_account_id && { accountId: profile.aws_account_id }),
    };
    return (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_PROFILE", "n");
};


/***/ },

/***/ 377
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isWebIdentityProfile: () => (/* binding */ isWebIdentityProfile),
/* harmony export */   resolveWebIdentityCredentials: () => (/* binding */ resolveWebIdentityCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);

const isWebIdentityProfile = (arg) => Boolean(arg) &&
    typeof arg === "object" &&
    typeof arg.web_identity_token_file === "string" &&
    typeof arg.role_arn === "string" &&
    ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1;
const resolveWebIdentityCredentials = async (profile, options, callerClientConfig) => __webpack_require__.e(/* import() */ 4).then(__webpack_require__.bind(__webpack_require__, 385)).then(({ fromTokenFile }) => fromTokenFile({
    webIdentityTokenFile: profile.web_identity_token_file,
    roleArn: profile.role_arn,
    roleSessionName: profile.role_session_name,
    roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity,
    logger: options.logger,
    parentClientConfig: options.parentClientConfig,
})({
    callerClientConfig,
}).then((creds) => (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(creds, "CREDENTIALS_PROFILE_STS_WEB_ID_TOKEN", "q")));


/***/ },

/***/ 372
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginCredentialsFetcher: () => (/* binding */ LoginCredentialsFetcher)
/* harmony export */ });
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(112);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(373);
/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(217);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(219);
/* harmony import */ var node_os__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(node_os__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(224);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_6__);







class LoginCredentialsFetcher {
    profileData;
    init;
    callerClientConfig;
    static REFRESH_THRESHOLD = 5 * 60 * 1000;
    constructor(profileData, init, callerClientConfig) {
        this.profileData = profileData;
        this.init = init;
        this.callerClientConfig = callerClientConfig;
    }
    async loadCredentials() {
        const token = await this.loadToken();
        if (!token) {
            throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Failed to load a token for session ${this.loginSession}, please re-authenticate using aws login`, { tryNextLink: false, logger: this.logger });
        }
        const accessToken = token.accessToken;
        const now = Date.now();
        const expiryTime = new Date(accessToken.expiresAt).getTime();
        const timeUntilExpiry = expiryTime - now;
        if (timeUntilExpiry <= LoginCredentialsFetcher.REFRESH_THRESHOLD) {
            return this.refresh(token);
        }
        return {
            accessKeyId: accessToken.accessKeyId,
            secretAccessKey: accessToken.secretAccessKey,
            sessionToken: accessToken.sessionToken,
            accountId: accessToken.accountId,
            expiration: new Date(accessToken.expiresAt),
        };
    }
    get logger() {
        return this.init?.logger;
    }
    get loginSession() {
        return this.profileData.login_session;
    }
    async refresh(token) {
        const { SigninClient, CreateOAuth2TokenCommand } = await Promise.all(/* import() */[__webpack_require__.e(7), __webpack_require__.e(11)]).then(__webpack_require__.bind(__webpack_require__, 489));
        const { logger, userAgentAppId } = this.callerClientConfig ?? {};
        const isH2 = (requestHandler) => {
            return requestHandler?.metadata?.handlerProtocol === "h2";
        };
        const requestHandler = isH2(this.callerClientConfig?.requestHandler)
            ? undefined
            : this.callerClientConfig?.requestHandler;
        const region = this.profileData.region ?? (await this.callerClientConfig?.region?.()) ?? process.env.AWS_REGION;
        const client = new SigninClient({
            credentials: {
                accessKeyId: "",
                secretAccessKey: "",
            },
            region,
            requestHandler,
            logger,
            userAgentAppId,
            ...this.init?.clientConfig,
        });
        this.createDPoPInterceptor(client.middlewareStack);
        const commandInput = {
            tokenInput: {
                clientId: token.clientId,
                refreshToken: token.refreshToken,
                grantType: "refresh_token",
            },
        };
        try {
            const response = await client.send(new CreateOAuth2TokenCommand(commandInput));
            const { accessKeyId, secretAccessKey, sessionToken } = response.tokenOutput?.accessToken ?? {};
            const { refreshToken, expiresIn } = response.tokenOutput ?? {};
            if (!accessKeyId || !secretAccessKey || !sessionToken || !refreshToken) {
                throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError("Token refresh response missing required fields", {
                    logger: this.logger,
                    tryNextLink: false,
                });
            }
            const expiresInMs = (expiresIn ?? 900) * 1000;
            const expiration = new Date(Date.now() + expiresInMs);
            const updatedToken = {
                ...token,
                accessToken: {
                    ...token.accessToken,
                    accessKeyId: accessKeyId,
                    secretAccessKey: secretAccessKey,
                    sessionToken: sessionToken,
                    expiresAt: expiration.toISOString(),
                },
                refreshToken: refreshToken,
            };
            await this.saveToken(updatedToken);
            const newAccessToken = updatedToken.accessToken;
            return {
                accessKeyId: newAccessToken.accessKeyId,
                secretAccessKey: newAccessToken.secretAccessKey,
                sessionToken: newAccessToken.sessionToken,
                accountId: newAccessToken.accountId,
                expiration,
            };
        }
        catch (error) {
            if (error.name === "AccessDeniedException") {
                const errorType = error.error;
                let message;
                switch (errorType) {
                    case "TOKEN_EXPIRED":
                        message = "Your session has expired. Please reauthenticate.";
                        break;
                    case "USER_CREDENTIALS_CHANGED":
                        message =
                            "Unable to refresh credentials because of a change in your password. Please reauthenticate with your new password.";
                        break;
                    case "INSUFFICIENT_PERMISSIONS":
                        message =
                            "Unable to refresh credentials due to insufficient permissions. You may be missing permission for the 'CreateOAuth2Token' action.";
                        break;
                    default:
                        message = `Failed to refresh token: ${String(error)}. Please re-authenticate using \`aws login\``;
                }
                throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(message, { logger: this.logger, tryNextLink: false });
            }
            throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Failed to refresh token: ${String(error)}. Please re-authenticate using aws login`, { logger: this.logger });
        }
    }
    async loadToken() {
        const tokenFilePath = this.getTokenFilePath();
        try {
            let tokenData;
            try {
                tokenData = await (0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__.readFile)(tokenFilePath, { ignoreCache: this.init?.ignoreCache });
            }
            catch {
                tokenData = await node_fs__WEBPACK_IMPORTED_MODULE_4__.promises.readFile(tokenFilePath, "utf8");
            }
            const token = JSON.parse(tokenData);
            const missingFields = ["accessToken", "clientId", "refreshToken", "dpopKey"].filter((k) => !token[k]);
            if (!token.accessToken?.accountId) {
                missingFields.push("accountId");
            }
            if (missingFields.length > 0) {
                throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Token validation failed, missing fields: ${missingFields.join(", ")}`, {
                    logger: this.logger,
                    tryNextLink: false,
                });
            }
            return token;
        }
        catch (error) {
            throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Failed to load token from ${tokenFilePath}: ${String(error)}`, {
                logger: this.logger,
                tryNextLink: false,
            });
        }
    }
    async saveToken(token) {
        const tokenFilePath = this.getTokenFilePath();
        const directory = (0,node_path__WEBPACK_IMPORTED_MODULE_6__.dirname)(tokenFilePath);
        try {
            await node_fs__WEBPACK_IMPORTED_MODULE_4__.promises.mkdir(directory, { recursive: true });
        }
        catch (error) {
        }
        await node_fs__WEBPACK_IMPORTED_MODULE_4__.promises.writeFile(tokenFilePath, JSON.stringify(token, null, 2), "utf8");
    }
    getTokenFilePath() {
        const directory = process.env.AWS_LOGIN_CACHE_DIRECTORY ?? (0,node_path__WEBPACK_IMPORTED_MODULE_6__.join)((0,node_os__WEBPACK_IMPORTED_MODULE_5__.homedir)(), ".aws", "login", "cache");
        const loginSessionBytes = Buffer.from(this.loginSession, "utf8");
        const loginSessionSha256 = (0,node_crypto__WEBPACK_IMPORTED_MODULE_3__.createHash)("sha256").update(loginSessionBytes).digest("hex");
        return (0,node_path__WEBPACK_IMPORTED_MODULE_6__.join)(directory, `${loginSessionSha256}.json`);
    }
    derToRawSignature(derSignature) {
        let offset = 2;
        if (derSignature[offset] !== 0x02) {
            throw new Error("Invalid DER signature");
        }
        offset++;
        const rLength = derSignature[offset++];
        let r = derSignature.subarray(offset, offset + rLength);
        offset += rLength;
        if (derSignature[offset] !== 0x02) {
            throw new Error("Invalid DER signature");
        }
        offset++;
        const sLength = derSignature[offset++];
        let s = derSignature.subarray(offset, offset + sLength);
        r = r[0] === 0x00 ? r.subarray(1) : r;
        s = s[0] === 0x00 ? s.subarray(1) : s;
        const rPadded = Buffer.concat([Buffer.alloc(32 - r.length), r]);
        const sPadded = Buffer.concat([Buffer.alloc(32 - s.length), s]);
        return Buffer.concat([rPadded, sPadded]);
    }
    createDPoPInterceptor(middlewareStack) {
        middlewareStack.add((next) => async (args) => {
            if (_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.HttpRequest.isInstance(args.request)) {
                const request = args.request;
                const actualEndpoint = `${request.protocol}//${request.hostname}${request.port ? `:${request.port}` : ""}${request.path}`;
                const dpop = await this.generateDpop(request.method, actualEndpoint);
                request.headers = {
                    ...request.headers,
                    DPoP: dpop,
                };
            }
            return next(args);
        }, {
            step: "finalizeRequest",
            name: "dpopInterceptor",
            override: true,
        });
    }
    async generateDpop(method = "POST", endpoint) {
        const token = await this.loadToken();
        try {
            const privateKey = (0,node_crypto__WEBPACK_IMPORTED_MODULE_3__.createPrivateKey)({
                key: token.dpopKey,
                format: "pem",
                type: "sec1",
            });
            const publicKey = (0,node_crypto__WEBPACK_IMPORTED_MODULE_3__.createPublicKey)(privateKey);
            const publicDer = publicKey.export({ format: "der", type: "spki" });
            let pointStart = -1;
            for (let i = 0; i < publicDer.length; i++) {
                if (publicDer[i] === 0x04) {
                    pointStart = i;
                    break;
                }
            }
            const x = publicDer.slice(pointStart + 1, pointStart + 33);
            const y = publicDer.slice(pointStart + 33, pointStart + 65);
            const header = {
                alg: "ES256",
                typ: "dpop+jwt",
                jwk: {
                    kty: "EC",
                    crv: "P-256",
                    x: x.toString("base64url"),
                    y: y.toString("base64url"),
                },
            };
            const payload = {
                jti: crypto.randomUUID(),
                htm: method,
                htu: endpoint,
                iat: Math.floor(Date.now() / 1000),
            };
            const headerB64 = Buffer.from(JSON.stringify(header)).toString("base64url");
            const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
            const message = `${headerB64}.${payloadB64}`;
            const asn1Signature = (0,node_crypto__WEBPACK_IMPORTED_MODULE_3__.sign)("sha256", Buffer.from(message), privateKey);
            const rawSignature = this.derToRawSignature(asn1Signature);
            const signatureB64 = rawSignature.toString("base64url");
            return `${message}.${signatureB64}`;
        }
        catch (error) {
            throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_0__.CredentialsProviderError(`Failed to generate Dpop proof: ${error instanceof Error ? error.message : String(error)}`, { logger: this.logger, tryNextLink: false });
        }
    }
}


/***/ },

/***/ 371
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromLoginCredentials: () => (/* binding */ fromLoginCredentials)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);
/* harmony import */ var _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(98);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(101);
/* harmony import */ var _smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(209);
/* harmony import */ var _LoginCredentialsFetcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(372);




const fromLoginCredentials = (init) => async ({ callerClientConfig } = {}) => {
    init?.logger?.debug?.("@aws-sdk/credential-providers - fromLoginCredentials");
    const profiles = await (0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_3__.parseKnownFiles)(init || {});
    const profileName = (0,_smithy_shared_ini_file_loader__WEBPACK_IMPORTED_MODULE_2__.getProfileName)({
        profile: init?.profile ?? callerClientConfig?.profile,
    });
    const profile = profiles[profileName];
    if (!profile?.login_session) {
        throw new _smithy_property_provider__WEBPACK_IMPORTED_MODULE_1__.CredentialsProviderError(`Profile ${profileName} does not contain login_session.`, {
            tryNextLink: true,
            logger: init?.logger,
        });
    }
    const fetcher = new _LoginCredentialsFetcher__WEBPACK_IMPORTED_MODULE_4__.LoginCredentialsFetcher(profile, init, callerClientConfig);
    const credentials = await fetcher.loadCredentials();
    return (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_LOGIN", "AD");
};


/***/ }

};
;
//# sourceMappingURL=2.extension.js.map