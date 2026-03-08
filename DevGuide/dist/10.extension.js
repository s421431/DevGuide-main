"use strict";
exports.id = 10;
exports.ids = [10];
exports.modules = {

/***/ 458
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AwsQueryProtocol: () => (/* binding */ AwsQueryProtocol)
/* harmony export */ });
/* harmony import */ var _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(276);
/* harmony import */ var _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(459);
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(265);
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(264);
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(280);
/* harmony import */ var _ProtocolLib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(293);
/* harmony import */ var _xml_XmlShapeDeserializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(460);
/* harmony import */ var _QueryShapeSerializer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(473);





class AwsQueryProtocol extends _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_1__.RpcProtocol {
    options;
    serializer;
    deserializer;
    mixin = new _ProtocolLib__WEBPACK_IMPORTED_MODULE_5__.ProtocolLib();
    constructor(options) {
        super({
            defaultNamespace: options.defaultNamespace,
        });
        this.options = options;
        const settings = {
            timestampFormat: {
                useTrait: true,
                default: 5,
            },
            httpBindings: false,
            xmlNamespace: options.xmlNamespace,
            serviceNamespace: options.defaultNamespace,
            serializeEmptyLists: true,
        };
        this.serializer = new _QueryShapeSerializer__WEBPACK_IMPORTED_MODULE_7__.QueryShapeSerializer(settings);
        this.deserializer = new _xml_XmlShapeDeserializer__WEBPACK_IMPORTED_MODULE_6__.XmlShapeDeserializer(settings);
    }
    getShapeId() {
        return "aws.protocols#awsQuery";
    }
    setSerdeContext(serdeContext) {
        this.serializer.setSerdeContext(serdeContext);
        this.deserializer.setSerdeContext(serdeContext);
    }
    getPayloadCodec() {
        throw new Error("AWSQuery protocol has no payload codec.");
    }
    async serializeRequest(operationSchema, input, context) {
        const request = await super.serializeRequest(operationSchema, input, context);
        if (!request.path.endsWith("/")) {
            request.path += "/";
        }
        Object.assign(request.headers, {
            "content-type": `application/x-www-form-urlencoded`,
        });
        if ((0,_smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__.deref)(operationSchema.input) === "unit" || !request.body) {
            request.body = "";
        }
        const action = operationSchema.name.split("#")[1] ?? operationSchema.name;
        request.body = `Action=${action}&Version=${this.options.version}` + request.body;
        if (request.body.endsWith("&")) {
            request.body = request.body.slice(-1);
        }
        return request;
    }
    async deserializeResponse(operationSchema, context, response) {
        const deserializer = this.deserializer;
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_3__.NormalizedSchema.of(operationSchema.output);
        const dataObject = {};
        if (response.statusCode >= 300) {
            const bytes = await (0,_smithy_core_protocols__WEBPACK_IMPORTED_MODULE_0__.collectBody)(response.body, context);
            if (bytes.byteLength > 0) {
                Object.assign(dataObject, await deserializer.read(15, bytes));
            }
            await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        }
        for (const header in response.headers) {
            const value = response.headers[header];
            delete response.headers[header];
            response.headers[header.toLowerCase()] = value;
        }
        const shortName = operationSchema.name.split("#")[1] ?? operationSchema.name;
        const awsQueryResultKey = ns.isStructSchema() && this.useNestedResult() ? shortName + "Result" : undefined;
        const bytes = await (0,_smithy_core_protocols__WEBPACK_IMPORTED_MODULE_0__.collectBody)(response.body, context);
        if (bytes.byteLength > 0) {
            Object.assign(dataObject, await deserializer.read(ns, bytes, awsQueryResultKey));
        }
        const output = {
            $metadata: this.deserializeMetadata(response),
            ...dataObject,
        };
        return output;
    }
    useNestedResult() {
        return true;
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
        const errorIdentifier = this.loadQueryErrorCode(response, dataObject) ?? "Unknown";
        const errorData = this.loadQueryError(dataObject) ?? {};
        const message = this.loadQueryErrorMessage(dataObject);
        errorData.message = message;
        errorData.Error = {
            Type: errorData.Type,
            Code: errorData.Code,
            Message: message,
        };
        const { errorSchema, errorMetadata } = await this.mixin.getErrorSchemaOrThrowBaseException(errorIdentifier, this.options.defaultNamespace, response, errorData, metadata, this.mixin.findQueryCompatibleError);
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_3__.NormalizedSchema.of(errorSchema);
        const ErrorCtor = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_4__.TypeRegistry.for(errorSchema[1]).getErrorCtor(errorSchema) ?? Error;
        const exception = new ErrorCtor(message);
        const output = {
            Type: errorData.Error.Type,
            Code: errorData.Error.Code,
            Error: errorData.Error,
        };
        for (const [name, member] of ns.structIterator()) {
            const target = member.getMergedTraits().xmlName ?? name;
            const value = errorData[target] ?? dataObject[target];
            output[name] = this.deserializer.readSchema(member, value);
        }
        throw this.mixin.decorateServiceException(Object.assign(exception, errorMetadata, {
            $fault: ns.getMergedTraits().error,
            message,
        }, output), dataObject);
    }
    loadQueryErrorCode(output, data) {
        const code = (data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error)?.Code;
        if (code !== undefined) {
            return code;
        }
        if (output.statusCode == 404) {
            return "NotFound";
        }
    }
    loadQueryError(data) {
        return data.Errors?.[0]?.Error ?? data.Errors?.Error ?? data.Error;
    }
    loadQueryErrorMessage(data) {
        const errorData = this.loadQueryError(data);
        return errorData?.message ?? errorData?.Message ?? data.message ?? data.Message ?? "Unknown";
    }
    getDefaultContentType() {
        return "application/x-www-form-urlencoded";
    }
}


/***/ },

/***/ 473
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryShapeSerializer: () => (/* binding */ QueryShapeSerializer)
/* harmony export */ });
/* harmony import */ var _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(278);
/* harmony import */ var _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(287);
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(264);
/* harmony import */ var _smithy_core_serde__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(130);
/* harmony import */ var _smithy_core_serde__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(286);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(290);
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(273);
/* harmony import */ var _ConfigurableSerdeContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(296);






class QueryShapeSerializer extends _ConfigurableSerdeContext__WEBPACK_IMPORTED_MODULE_7__.SerdeContextConfig {
    settings;
    buffer;
    constructor(settings) {
        super();
        this.settings = settings;
    }
    write(schema, value, prefix = "") {
        if (this.buffer === undefined) {
            this.buffer = "";
        }
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__.NormalizedSchema.of(schema);
        if (prefix && !prefix.endsWith(".")) {
            prefix += ".";
        }
        if (ns.isBlobSchema()) {
            if (typeof value === "string" || value instanceof Uint8Array) {
                this.writeKey(prefix);
                this.writeValue((this.serdeContext?.base64Encoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__.toBase64)(value));
            }
        }
        else if (ns.isBooleanSchema() || ns.isNumericSchema() || ns.isStringSchema()) {
            if (value != null) {
                this.writeKey(prefix);
                this.writeValue(String(value));
            }
            else if (ns.isIdempotencyToken()) {
                this.writeKey(prefix);
                this.writeValue((0,_smithy_core_serde__WEBPACK_IMPORTED_MODULE_3__.v4)());
            }
        }
        else if (ns.isBigIntegerSchema()) {
            if (value != null) {
                this.writeKey(prefix);
                this.writeValue(String(value));
            }
        }
        else if (ns.isBigDecimalSchema()) {
            if (value != null) {
                this.writeKey(prefix);
                this.writeValue(value instanceof _smithy_core_serde__WEBPACK_IMPORTED_MODULE_4__.NumericValue ? value.string : String(value));
            }
        }
        else if (ns.isTimestampSchema()) {
            if (value instanceof Date) {
                this.writeKey(prefix);
                const format = (0,_smithy_core_protocols__WEBPACK_IMPORTED_MODULE_1__.determineTimestampFormat)(ns, this.settings);
                switch (format) {
                    case 5:
                        this.writeValue(value.toISOString().replace(".000Z", "Z"));
                        break;
                    case 6:
                        this.writeValue((0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_5__.dateToUtcString)(value));
                        break;
                    case 7:
                        this.writeValue(String(value.getTime() / 1000));
                        break;
                }
            }
        }
        else if (ns.isDocumentSchema()) {
            if (Array.isArray(value)) {
                this.write(64 | 15, value, prefix);
            }
            else if (value instanceof Date) {
                this.write(4, value, prefix);
            }
            else if (value instanceof Uint8Array) {
                this.write(21, value, prefix);
            }
            else if (value && typeof value === "object") {
                this.write(128 | 15, value, prefix);
            }
            else {
                this.writeKey(prefix);
                this.writeValue(String(value));
            }
        }
        else if (ns.isListSchema()) {
            if (Array.isArray(value)) {
                if (value.length === 0) {
                    if (this.settings.serializeEmptyLists) {
                        this.writeKey(prefix);
                        this.writeValue("");
                    }
                }
                else {
                    const member = ns.getValueSchema();
                    const flat = this.settings.flattenLists || ns.getMergedTraits().xmlFlattened;
                    let i = 1;
                    for (const item of value) {
                        if (item == null) {
                            continue;
                        }
                        const traits = member.getMergedTraits();
                        const suffix = this.getKey("member", traits.xmlName, traits.ec2QueryName);
                        const key = flat ? `${prefix}${i}` : `${prefix}${suffix}.${i}`;
                        this.write(member, item, key);
                        ++i;
                    }
                }
            }
        }
        else if (ns.isMapSchema()) {
            if (value && typeof value === "object") {
                const keySchema = ns.getKeySchema();
                const memberSchema = ns.getValueSchema();
                const flat = ns.getMergedTraits().xmlFlattened;
                let i = 1;
                for (const [k, v] of Object.entries(value)) {
                    if (v == null) {
                        continue;
                    }
                    const keyTraits = keySchema.getMergedTraits();
                    const keySuffix = this.getKey("key", keyTraits.xmlName, keyTraits.ec2QueryName);
                    const key = flat ? `${prefix}${i}.${keySuffix}` : `${prefix}entry.${i}.${keySuffix}`;
                    const valTraits = memberSchema.getMergedTraits();
                    const valueSuffix = this.getKey("value", valTraits.xmlName, valTraits.ec2QueryName);
                    const valueKey = flat ? `${prefix}${i}.${valueSuffix}` : `${prefix}entry.${i}.${valueSuffix}`;
                    this.write(keySchema, k, key);
                    this.write(memberSchema, v, valueKey);
                    ++i;
                }
            }
        }
        else if (ns.isStructSchema()) {
            if (value && typeof value === "object") {
                let didWriteMember = false;
                for (const [memberName, member] of ns.structIterator()) {
                    if (value[memberName] == null && !member.isIdempotencyToken()) {
                        continue;
                    }
                    const traits = member.getMergedTraits();
                    const suffix = this.getKey(memberName, traits.xmlName, traits.ec2QueryName, "struct");
                    const key = `${prefix}${suffix}`;
                    this.write(member, value[memberName], key);
                    didWriteMember = true;
                }
                if (!didWriteMember && ns.isUnionSchema()) {
                    const { $unknown } = value;
                    if (Array.isArray($unknown)) {
                        const [k, v] = $unknown;
                        const key = `${prefix}${k}`;
                        this.write(15, v, key);
                    }
                }
            }
        }
        else if (ns.isUnitSchema()) {
        }
        else {
            throw new Error(`@aws-sdk/core/protocols - QuerySerializer unrecognized schema type ${ns.getName(true)}`);
        }
    }
    flush() {
        if (this.buffer === undefined) {
            throw new Error("@aws-sdk/core/protocols - QuerySerializer cannot flush with nothing written to buffer.");
        }
        const str = this.buffer;
        delete this.buffer;
        return str;
    }
    getKey(memberName, xmlName, ec2QueryName, keySource) {
        const { ec2, capitalizeKeys } = this.settings;
        if (ec2 && ec2QueryName) {
            return ec2QueryName;
        }
        const key = xmlName ?? memberName;
        if (capitalizeKeys && keySource === "struct") {
            return key[0].toUpperCase() + key.slice(1);
        }
        return key;
    }
    writeKey(key) {
        if (key.endsWith(".")) {
            key = key.slice(0, key.length - 1);
        }
        this.buffer += `&${(0,_smithy_core_protocols__WEBPACK_IMPORTED_MODULE_0__.extendedEncodeURIComponent)(key)}=`;
    }
    writeValue(value) {
        this.buffer += (0,_smithy_core_protocols__WEBPACK_IMPORTED_MODULE_0__.extendedEncodeURIComponent)(value);
    }
}


/***/ },

/***/ 460
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XmlShapeDeserializer: () => (/* binding */ XmlShapeDeserializer)
/* harmony export */ });
/* harmony import */ var _aws_sdk_xml_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(461);
/* harmony import */ var _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(283);
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(264);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(472);
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(274);
/* harmony import */ var _ConfigurableSerdeContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(296);
/* harmony import */ var _UnionSerde__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(298);







class XmlShapeDeserializer extends _ConfigurableSerdeContext__WEBPACK_IMPORTED_MODULE_5__.SerdeContextConfig {
    settings;
    stringDeserializer;
    constructor(settings) {
        super();
        this.settings = settings;
        this.stringDeserializer = new _smithy_core_protocols__WEBPACK_IMPORTED_MODULE_1__.FromStringShapeDeserializer(settings);
    }
    setSerdeContext(serdeContext) {
        this.serdeContext = serdeContext;
        this.stringDeserializer.setSerdeContext(serdeContext);
    }
    read(schema, bytes, key) {
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__.NormalizedSchema.of(schema);
        const memberSchemas = ns.getMemberSchemas();
        const isEventPayload = ns.isStructSchema() &&
            ns.isMemberSchema() &&
            !!Object.values(memberSchemas).find((memberNs) => {
                return !!memberNs.getMemberTraits().eventPayload;
            });
        if (isEventPayload) {
            const output = {};
            const memberName = Object.keys(memberSchemas)[0];
            const eventMemberSchema = memberSchemas[memberName];
            if (eventMemberSchema.isBlobSchema()) {
                output[memberName] = bytes;
            }
            else {
                output[memberName] = this.read(memberSchemas[memberName], bytes);
            }
            return output;
        }
        const xmlString = (this.serdeContext?.utf8Encoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_4__.toUtf8)(bytes);
        const parsedObject = this.parseXml(xmlString);
        return this.readSchema(schema, key ? parsedObject[key] : parsedObject);
    }
    readSchema(_schema, value) {
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_2__.NormalizedSchema.of(_schema);
        if (ns.isUnitSchema()) {
            return;
        }
        const traits = ns.getMergedTraits();
        if (ns.isListSchema() && !Array.isArray(value)) {
            return this.readSchema(ns, [value]);
        }
        if (value == null) {
            return value;
        }
        if (typeof value === "object") {
            const sparse = !!traits.sparse;
            const flat = !!traits.xmlFlattened;
            if (ns.isListSchema()) {
                const listValue = ns.getValueSchema();
                const buffer = [];
                const sourceKey = listValue.getMergedTraits().xmlName ?? "member";
                const source = flat ? value : (value[0] ?? value)[sourceKey];
                const sourceArray = Array.isArray(source) ? source : [source];
                for (const v of sourceArray) {
                    if (v != null || sparse) {
                        buffer.push(this.readSchema(listValue, v));
                    }
                }
                return buffer;
            }
            const buffer = {};
            if (ns.isMapSchema()) {
                const keyNs = ns.getKeySchema();
                const memberNs = ns.getValueSchema();
                let entries;
                if (flat) {
                    entries = Array.isArray(value) ? value : [value];
                }
                else {
                    entries = Array.isArray(value.entry) ? value.entry : [value.entry];
                }
                const keyProperty = keyNs.getMergedTraits().xmlName ?? "key";
                const valueProperty = memberNs.getMergedTraits().xmlName ?? "value";
                for (const entry of entries) {
                    const key = entry[keyProperty];
                    const value = entry[valueProperty];
                    if (value != null || sparse) {
                        buffer[key] = this.readSchema(memberNs, value);
                    }
                }
                return buffer;
            }
            if (ns.isStructSchema()) {
                const union = ns.isUnionSchema();
                let unionSerde;
                if (union) {
                    unionSerde = new _UnionSerde__WEBPACK_IMPORTED_MODULE_6__.UnionSerde(value, buffer);
                }
                for (const [memberName, memberSchema] of ns.structIterator()) {
                    const memberTraits = memberSchema.getMergedTraits();
                    const xmlObjectKey = !memberTraits.httpPayload
                        ? memberSchema.getMemberTraits().xmlName ?? memberName
                        : memberTraits.xmlName ?? memberSchema.getName();
                    if (union) {
                        unionSerde.mark(xmlObjectKey);
                    }
                    if (value[xmlObjectKey] != null) {
                        buffer[memberName] = this.readSchema(memberSchema, value[xmlObjectKey]);
                    }
                }
                if (union) {
                    unionSerde.writeUnknown();
                }
                return buffer;
            }
            if (ns.isDocumentSchema()) {
                return value;
            }
            throw new Error(`@aws-sdk/core/protocols - xml deserializer unhandled schema type for ${ns.getName(true)}`);
        }
        if (ns.isListSchema()) {
            return [];
        }
        if (ns.isMapSchema() || ns.isStructSchema()) {
            return {};
        }
        return this.stringDeserializer.read(ns, value);
    }
    parseXml(xml) {
        if (xml.length) {
            let parsedObj;
            try {
                parsedObj = (0,_aws_sdk_xml_builder__WEBPACK_IMPORTED_MODULE_0__.parseXML)(xml);
            }
            catch (e) {
                if (e && typeof e === "object") {
                    Object.defineProperty(e, "$responseBodyText", {
                        value: xml,
                    });
                }
                throw e;
            }
            const textNodeName = "#text";
            const key = Object.keys(parsedObj)[0];
            const parsedObjToReturn = parsedObj[key];
            if (parsedObjToReturn[textNodeName]) {
                parsedObjToReturn[key] = parsedObjToReturn[textNodeName];
                delete parsedObjToReturn[textNodeName];
            }
            return (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_3__.getValueFromTextNode)(parsedObjToReturn);
        }
        return {};
    }
}


/***/ },

/***/ 481
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STS: () => (/* binding */ STS)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319);
/* harmony import */ var _commands_AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(482);
/* harmony import */ var _commands_AssumeRoleWithWebIdentityCommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(483);
/* harmony import */ var _STSClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(453);




const commands = {
    AssumeRoleCommand: _commands_AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_1__.AssumeRoleCommand,
    AssumeRoleWithWebIdentityCommand: _commands_AssumeRoleWithWebIdentityCommand__WEBPACK_IMPORTED_MODULE_2__.AssumeRoleWithWebIdentityCommand,
};
class STS extends _STSClient__WEBPACK_IMPORTED_MODULE_3__.STSClient {
}
(0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.createAggregatedClient)(commands, STS);


/***/ },

/***/ 453
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STSClient: () => (/* binding */ STSClient),
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
/* harmony import */ var _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(454);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(455);
/* harmony import */ var _runtimeConfig__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(456);
/* harmony import */ var _runtimeExtensions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(479);
















class STSClient extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_14__.Client {
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
            httpAuthSchemeParametersProvider: _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_15__.defaultSTSHttpAuthSchemeParametersProvider,
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

/***/ 480
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

/***/ 454
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultSTSHttpAuthSchemeParametersProvider: () => (/* binding */ defaultSTSHttpAuthSchemeParametersProvider),
/* harmony export */   defaultSTSHttpAuthSchemeProvider: () => (/* binding */ defaultSTSHttpAuthSchemeProvider),
/* harmony export */   resolveHttpAuthSchemeConfig: () => (/* binding */ resolveHttpAuthSchemeConfig),
/* harmony export */   resolveStsAuthConfig: () => (/* binding */ resolveStsAuthConfig)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(139);
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(78);
/* harmony import */ var _smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(91);
/* harmony import */ var _STSClient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(453);



const defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
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
            name: "sts",
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
const defaultSTSHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
        case "AssumeRoleWithWebIdentity": {
            options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
            break;
        }
        default: {
            options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
    }
    return options;
};
const resolveStsAuthConfig = (input) => Object.assign(input, {
    stsClientCtor: _STSClient__WEBPACK_IMPORTED_MODULE_3__.STSClient,
});
const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = resolveStsAuthConfig(config);
    const config_1 = (0,_aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__.resolveAwsSdkSigV4Config)(config_0);
    return Object.assign(config_1, {
        authSchemePreference: (0,_smithy_util_middleware__WEBPACK_IMPORTED_MODULE_2__.normalizeProvider)(config.authSchemePreference ?? []),
    });
};


/***/ },

/***/ 482
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command),
/* harmony export */   AssumeRoleCommand: () => (/* binding */ AssumeRoleCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(321);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(330);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(455);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(476);





class AssumeRoleCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__.commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("AWSSecurityTokenServiceV20110615", "AssumeRole", {})
    .n("STSClient", "AssumeRoleCommand")
    .sc(_schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRole$)
    .build() {
}


/***/ },

/***/ 483
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command),
/* harmony export */   AssumeRoleWithWebIdentityCommand: () => (/* binding */ AssumeRoleWithWebIdentityCommand)
/* harmony export */ });
/* harmony import */ var _smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(321);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(330);
/* harmony import */ var _endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(455);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(476);





class AssumeRoleWithWebIdentityCommand extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_1__.Command
    .classBuilder()
    .ep(_endpoint_EndpointParameters__WEBPACK_IMPORTED_MODULE_2__.commonParams)
    .m(function (Command, cs, config, o) {
    return [(0,_smithy_middleware_endpoint__WEBPACK_IMPORTED_MODULE_0__.getEndpointPlugin)(config, Command.getEndpointParameterInstructions())];
})
    .s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {})
    .n("STSClient", "AssumeRoleWithWebIdentityCommand")
    .sc(_schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleWithWebIdentity$)
    .build() {
}


/***/ },

/***/ 484
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_0__.$Command),
/* harmony export */   AssumeRoleCommand: () => (/* reexport safe */ _AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_0__.AssumeRoleCommand),
/* harmony export */   AssumeRoleWithWebIdentityCommand: () => (/* reexport safe */ _AssumeRoleWithWebIdentityCommand__WEBPACK_IMPORTED_MODULE_1__.AssumeRoleWithWebIdentityCommand)
/* harmony export */ });
/* harmony import */ var _AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(482);
/* harmony import */ var _AssumeRoleWithWebIdentityCommand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(483);




/***/ },

/***/ 485
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decorateDefaultCredentialProvider: () => (/* binding */ decorateDefaultCredentialProvider),
/* harmony export */   getDefaultRoleAssumer: () => (/* binding */ getDefaultRoleAssumer),
/* harmony export */   getDefaultRoleAssumerWithWebIdentity: () => (/* binding */ getDefaultRoleAssumerWithWebIdentity)
/* harmony export */ });
/* harmony import */ var _defaultStsRoleAssumers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(486);
/* harmony import */ var _STSClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(453);


const getCustomizableStsClientCtor = (baseCtor, customizations) => {
    if (!customizations)
        return baseCtor;
    else
        return class CustomizableSTSClient extends baseCtor {
            constructor(config) {
                super(config);
                for (const customization of customizations) {
                    this.middlewareStack.use(customization);
                }
            }
        };
};
const getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => (0,_defaultStsRoleAssumers__WEBPACK_IMPORTED_MODULE_0__.getDefaultRoleAssumer)(stsOptions, getCustomizableStsClientCtor(_STSClient__WEBPACK_IMPORTED_MODULE_1__.STSClient, stsPlugins));
const getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => (0,_defaultStsRoleAssumers__WEBPACK_IMPORTED_MODULE_0__.getDefaultRoleAssumerWithWebIdentity)(stsOptions, getCustomizableStsClientCtor(_STSClient__WEBPACK_IMPORTED_MODULE_1__.STSClient, stsPlugins));
const decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: getDefaultRoleAssumer(input),
    roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input),
    ...input,
});


/***/ },

/***/ 486
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decorateDefaultCredentialProvider: () => (/* binding */ decorateDefaultCredentialProvider),
/* harmony export */   getDefaultRoleAssumer: () => (/* binding */ getDefaultRoleAssumer),
/* harmony export */   getDefaultRoleAssumerWithWebIdentity: () => (/* binding */ getDefaultRoleAssumerWithWebIdentity)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(140);
/* harmony import */ var _aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(487);
/* harmony import */ var _commands_AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(482);
/* harmony import */ var _commands_AssumeRoleWithWebIdentityCommand__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(483);




const getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
    if (typeof assumedRoleUser?.Arn === "string") {
        const arnComponents = assumedRoleUser.Arn.split(":");
        if (arnComponents.length > 4 && arnComponents[4] !== "") {
            return arnComponents[4];
        }
    }
    return undefined;
};
const resolveRegion = async (_region, _parentRegion, credentialProviderLogger, loaderConfig = {}) => {
    const region = typeof _region === "function" ? await _region() : _region;
    const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
    let stsDefaultRegion = "";
    const resolvedRegion = region ?? parentRegion ?? (stsDefaultRegion = await (0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_1__.stsRegionDefaultResolver)(loaderConfig)());
    credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (credential provider clientConfig)`, `${parentRegion} (contextual client)`, `${stsDefaultRegion} (STS default: AWS_REGION, profile region, or us-east-1)`);
    return resolvedRegion;
};
const getDefaultRoleAssumer = (stsOptions, STSClient) => {
    let stsClient;
    let closureSourceCreds;
    return async (sourceCreds, params) => {
        closureSourceCreds = sourceCreds;
        if (!stsClient) {
            const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId, } = stsOptions;
            const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
                logger,
                profile,
            });
            const isCompatibleRequestHandler = !isH2(requestHandler);
            stsClient = new STSClient({
                ...stsOptions,
                userAgentAppId,
                profile,
                credentialDefaultProvider: () => async () => closureSourceCreds,
                region: resolvedRegion,
                requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
                logger: logger,
            });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new _commands_AssumeRoleCommand__WEBPACK_IMPORTED_MODULE_2__.AssumeRoleCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            ...(Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope }),
            ...(accountId && { accountId }),
        };
        (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
        return credentials;
    };
};
const getDefaultRoleAssumerWithWebIdentity = (stsOptions, STSClient) => {
    let stsClient;
    return async (params) => {
        if (!stsClient) {
            const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId, } = stsOptions;
            const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
                logger,
                profile,
            });
            const isCompatibleRequestHandler = !isH2(requestHandler);
            stsClient = new STSClient({
                ...stsOptions,
                userAgentAppId,
                profile,
                region: resolvedRegion,
                requestHandler: isCompatibleRequestHandler ? requestHandler : undefined,
                logger: logger,
            });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new _commands_AssumeRoleWithWebIdentityCommand__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleWithWebIdentityCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
            throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken,
            expiration: Credentials.Expiration,
            ...(Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope }),
            ...(accountId && { accountId }),
        };
        if (accountId) {
            (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "RESOLVED_ACCOUNT_ID", "T");
        }
        (0,_aws_sdk_core_client__WEBPACK_IMPORTED_MODULE_0__.setCredentialFeature)(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
        return credentials;
    };
};
const decorateDefaultCredentialProvider = (provider) => (input) => provider({
    roleAssumer: getDefaultRoleAssumer(input, input.stsClientCtor),
    roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input, input.stsClientCtor),
    ...input,
});
const isH2 = (requestHandler) => {
    return requestHandler?.metadata?.handlerProtocol === "h2";
};


/***/ },

/***/ 455
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
        useGlobalEndpoint: options.useGlobalEndpoint ?? false,
        defaultSigningName: "sts",
    });
};
const commonParams = {
    UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" },
};


/***/ },

/***/ 474
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultEndpointResolver: () => (/* binding */ defaultEndpointResolver)
/* harmony export */ });
/* harmony import */ var _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(305);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var _ruleset__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(475);



const cache = new _smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_1__.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"],
});
const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0,_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_3__.resolveEndpoint)(_ruleset__WEBPACK_IMPORTED_MODULE_4__.ruleSet, {
        endpointParams: endpointParams,
        logger: context.logger,
    }));
};
_smithy_util_endpoints__WEBPACK_IMPORTED_MODULE_2__.customEndpointFunctions.aws = _aws_sdk_util_endpoints__WEBPACK_IMPORTED_MODULE_0__.awsEndpointFunctions;


/***/ },

/***/ 475
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ruleSet: () => (/* binding */ ruleSet)
/* harmony export */ });
const F = "required", G = "type", H = "fn", I = "argv", J = "ref";
const a = false, b = true, c = "booleanEquals", d = "stringEquals", e = "sigv4", f = "sts", g = "us-east-1", h = "endpoint", i = "https://sts.{Region}.{PartitionResult#dnsSuffix}", j = "tree", k = "error", l = "getAttr", m = { [F]: false, [G]: "string" }, n = { [F]: true, default: false, [G]: "boolean" }, o = { [J]: "Endpoint" }, p = { [H]: "isSet", [I]: [{ [J]: "Region" }] }, q = { [J]: "Region" }, r = { [H]: "aws.partition", [I]: [q], assign: "PartitionResult" }, s = { [J]: "UseFIPS" }, t = { [J]: "UseDualStack" }, u = {
    url: "https://sts.amazonaws.com",
    properties: { authSchemes: [{ name: e, signingName: f, signingRegion: g }] },
    headers: {},
}, v = {}, w = { conditions: [{ [H]: d, [I]: [q, "aws-global"] }], [h]: u, [G]: h }, x = { [H]: c, [I]: [s, true] }, y = { [H]: c, [I]: [t, true] }, z = { [H]: l, [I]: [{ [J]: "PartitionResult" }, "supportsFIPS"] }, A = { [J]: "PartitionResult" }, B = { [H]: c, [I]: [true, { [H]: l, [I]: [A, "supportsDualStack"] }] }, C = [{ [H]: "isSet", [I]: [o] }], D = [x], E = [y];
const _data = {
    version: "1.0",
    parameters: { Region: m, UseDualStack: n, UseFIPS: n, Endpoint: m, UseGlobalEndpoint: n },
    rules: [
        {
            conditions: [
                { [H]: c, [I]: [{ [J]: "UseGlobalEndpoint" }, b] },
                { [H]: "not", [I]: C },
                p,
                r,
                { [H]: c, [I]: [s, a] },
                { [H]: c, [I]: [t, a] },
            ],
            rules: [
                { conditions: [{ [H]: d, [I]: [q, "ap-northeast-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "ap-south-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "ap-southeast-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "ap-southeast-2"] }], endpoint: u, [G]: h },
                w,
                { conditions: [{ [H]: d, [I]: [q, "ca-central-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "eu-central-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "eu-north-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "eu-west-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "eu-west-2"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "eu-west-3"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "sa-east-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, g] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "us-east-2"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "us-west-1"] }], endpoint: u, [G]: h },
                { conditions: [{ [H]: d, [I]: [q, "us-west-2"] }], endpoint: u, [G]: h },
                {
                    endpoint: {
                        url: i,
                        properties: { authSchemes: [{ name: e, signingName: f, signingRegion: "{Region}" }] },
                        headers: v,
                    },
                    [G]: h,
                },
            ],
            [G]: j,
        },
        {
            conditions: C,
            rules: [
                { conditions: D, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [G]: k },
                { conditions: E, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [G]: k },
                { endpoint: { url: o, properties: v, headers: v }, [G]: h },
            ],
            [G]: j,
        },
        {
            conditions: [p],
            rules: [
                {
                    conditions: [r],
                    rules: [
                        {
                            conditions: [x, y],
                            rules: [
                                {
                                    conditions: [{ [H]: c, [I]: [b, z] }, B],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: v,
                                                headers: v,
                                            },
                                            [G]: h,
                                        },
                                    ],
                                    [G]: j,
                                },
                                { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [G]: k },
                            ],
                            [G]: j,
                        },
                        {
                            conditions: D,
                            rules: [
                                {
                                    conditions: [{ [H]: c, [I]: [z, b] }],
                                    rules: [
                                        {
                                            conditions: [{ [H]: d, [I]: [{ [H]: l, [I]: [A, "name"] }, "aws-us-gov"] }],
                                            endpoint: { url: "https://sts.{Region}.amazonaws.com", properties: v, headers: v },
                                            [G]: h,
                                        },
                                        {
                                            endpoint: {
                                                url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                                                properties: v,
                                                headers: v,
                                            },
                                            [G]: h,
                                        },
                                    ],
                                    [G]: j,
                                },
                                { error: "FIPS is enabled but this partition does not support FIPS", [G]: k },
                            ],
                            [G]: j,
                        },
                        {
                            conditions: E,
                            rules: [
                                {
                                    conditions: [B],
                                    rules: [
                                        {
                                            endpoint: {
                                                url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                                                properties: v,
                                                headers: v,
                                            },
                                            [G]: h,
                                        },
                                    ],
                                    [G]: j,
                                },
                                { error: "DualStack is enabled but this partition does not support DualStack", [G]: k },
                            ],
                            [G]: j,
                        },
                        w,
                        { endpoint: { url: i, properties: v, headers: v }, [G]: h },
                    ],
                    [G]: j,
                },
            ],
            [G]: j,
        },
        { error: "Invalid Configuration: Missing Region", [G]: k },
    ],
};
const ruleSet = _data;


/***/ },

/***/ 452
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $Command: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.$Command),
/* harmony export */   AssumeRole$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRole$),
/* harmony export */   AssumeRoleCommand: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.AssumeRoleCommand),
/* harmony export */   AssumeRoleRequest$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleRequest$),
/* harmony export */   AssumeRoleResponse$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleResponse$),
/* harmony export */   AssumeRoleWithWebIdentity$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleWithWebIdentity$),
/* harmony export */   AssumeRoleWithWebIdentityCommand: () => (/* reexport safe */ _commands__WEBPACK_IMPORTED_MODULE_2__.AssumeRoleWithWebIdentityCommand),
/* harmony export */   AssumeRoleWithWebIdentityRequest$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleWithWebIdentityRequest$),
/* harmony export */   AssumeRoleWithWebIdentityResponse$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumeRoleWithWebIdentityResponse$),
/* harmony export */   AssumedRoleUser$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.AssumedRoleUser$),
/* harmony export */   Credentials$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.Credentials$),
/* harmony export */   ExpiredTokenException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.ExpiredTokenException),
/* harmony export */   ExpiredTokenException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.ExpiredTokenException$),
/* harmony export */   IDPCommunicationErrorException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.IDPCommunicationErrorException),
/* harmony export */   IDPCommunicationErrorException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.IDPCommunicationErrorException$),
/* harmony export */   IDPRejectedClaimException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.IDPRejectedClaimException),
/* harmony export */   IDPRejectedClaimException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.IDPRejectedClaimException$),
/* harmony export */   InvalidIdentityTokenException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.InvalidIdentityTokenException),
/* harmony export */   InvalidIdentityTokenException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.InvalidIdentityTokenException$),
/* harmony export */   MalformedPolicyDocumentException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.MalformedPolicyDocumentException),
/* harmony export */   MalformedPolicyDocumentException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.MalformedPolicyDocumentException$),
/* harmony export */   PackedPolicyTooLargeException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.PackedPolicyTooLargeException),
/* harmony export */   PackedPolicyTooLargeException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.PackedPolicyTooLargeException$),
/* harmony export */   PolicyDescriptorType$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.PolicyDescriptorType$),
/* harmony export */   ProvidedContext$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.ProvidedContext$),
/* harmony export */   RegionDisabledException: () => (/* reexport safe */ _models_errors__WEBPACK_IMPORTED_MODULE_4__.RegionDisabledException),
/* harmony export */   RegionDisabledException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.RegionDisabledException$),
/* harmony export */   STS: () => (/* reexport safe */ _STS__WEBPACK_IMPORTED_MODULE_1__.STS),
/* harmony export */   STSClient: () => (/* reexport safe */ _STSClient__WEBPACK_IMPORTED_MODULE_0__.STSClient),
/* harmony export */   STSServiceException: () => (/* reexport safe */ _models_STSServiceException__WEBPACK_IMPORTED_MODULE_6__.STSServiceException),
/* harmony export */   STSServiceException$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.STSServiceException$),
/* harmony export */   Tag$: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.Tag$),
/* harmony export */   __Client: () => (/* reexport safe */ _STSClient__WEBPACK_IMPORTED_MODULE_0__.__Client),
/* harmony export */   decorateDefaultCredentialProvider: () => (/* reexport safe */ _defaultRoleAssumers__WEBPACK_IMPORTED_MODULE_5__.decorateDefaultCredentialProvider),
/* harmony export */   errorTypeRegistries: () => (/* reexport safe */ _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__.errorTypeRegistries),
/* harmony export */   getDefaultRoleAssumer: () => (/* reexport safe */ _defaultRoleAssumers__WEBPACK_IMPORTED_MODULE_5__.getDefaultRoleAssumer),
/* harmony export */   getDefaultRoleAssumerWithWebIdentity: () => (/* reexport safe */ _defaultRoleAssumers__WEBPACK_IMPORTED_MODULE_5__.getDefaultRoleAssumerWithWebIdentity)
/* harmony export */ });
/* harmony import */ var _STSClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(453);
/* harmony import */ var _STS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(481);
/* harmony import */ var _commands__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(484);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(476);
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(477);
/* harmony import */ var _defaultRoleAssumers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(485);
/* harmony import */ var _models_STSServiceException__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(478);










/***/ },

/***/ 478
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STSServiceException: () => (/* binding */ STSServiceException),
/* harmony export */   __ServiceException: () => (/* reexport safe */ _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException)
/* harmony export */ });
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(294);


class STSServiceException extends _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_0__.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, STSServiceException.prototype);
    }
}


/***/ },

/***/ 477
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExpiredTokenException: () => (/* binding */ ExpiredTokenException),
/* harmony export */   IDPCommunicationErrorException: () => (/* binding */ IDPCommunicationErrorException),
/* harmony export */   IDPRejectedClaimException: () => (/* binding */ IDPRejectedClaimException),
/* harmony export */   InvalidIdentityTokenException: () => (/* binding */ InvalidIdentityTokenException),
/* harmony export */   MalformedPolicyDocumentException: () => (/* binding */ MalformedPolicyDocumentException),
/* harmony export */   PackedPolicyTooLargeException: () => (/* binding */ PackedPolicyTooLargeException),
/* harmony export */   RegionDisabledException: () => (/* binding */ RegionDisabledException)
/* harmony export */ });
/* harmony import */ var _STSServiceException__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(478);

class ExpiredTokenException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "ExpiredTokenException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "ExpiredTokenException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, ExpiredTokenException.prototype);
    }
}
class MalformedPolicyDocumentException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "MalformedPolicyDocumentException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "MalformedPolicyDocumentException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
    }
}
class PackedPolicyTooLargeException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "PackedPolicyTooLargeException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "PackedPolicyTooLargeException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
    }
}
class RegionDisabledException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "RegionDisabledException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "RegionDisabledException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, RegionDisabledException.prototype);
    }
}
class IDPRejectedClaimException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "IDPRejectedClaimException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "IDPRejectedClaimException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
    }
}
class InvalidIdentityTokenException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "InvalidIdentityTokenException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "InvalidIdentityTokenException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
    }
}
class IDPCommunicationErrorException extends _STSServiceException__WEBPACK_IMPORTED_MODULE_0__.STSServiceException {
    name = "IDPCommunicationErrorException";
    $fault = "client";
    constructor(opts) {
        super({
            name: "IDPCommunicationErrorException",
            $fault: "client",
            ...opts,
        });
        Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
    }
}


/***/ },

/***/ 456
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeConfig: () => (/* binding */ getRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(422);
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(164);
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(165);
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(170);
/* harmony import */ var _aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(218);
/* harmony import */ var _aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(227);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(228);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(229);
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(232);
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(424);
/* harmony import */ var _smithy_hash_node__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(244);
/* harmony import */ var _smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(118);
/* harmony import */ var _smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(93);
/* harmony import */ var _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(407);
/* harmony import */ var _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(253);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(255);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(256);
/* harmony import */ var _smithy_util_body_length_node__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(257);
/* harmony import */ var _smithy_util_defaults_mode_node__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(258);
/* harmony import */ var _smithy_util_retry__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(120);
/* harmony import */ var _runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(457);














const getRuntimeConfig = (config) => {
    (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_16__.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0,_smithy_util_defaults_mode_node__WEBPACK_IMPORTED_MODULE_18__.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_15__.loadConfigsForDefaultMode);
    const clientSharedValues = (0,_runtimeConfig_shared__WEBPACK_IMPORTED_MODULE_20__.getRuntimeConfig)(config);
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
        authSchemePreference: config?.authSchemePreference ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)(_aws_sdk_core__WEBPACK_IMPORTED_MODULE_3__.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
        bodyLengthChecker: config?.bodyLengthChecker ?? _smithy_util_body_length_node__WEBPACK_IMPORTED_MODULE_17__.calculateBodyLength,
        defaultUserAgentProvider: config?.defaultUserAgentProvider ??
            (0,_aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_4__.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: _package_json__WEBPACK_IMPORTED_MODULE_0__.version }),
        httpAuthSchemes: config?.httpAuthSchemes ?? [
            {
                schemeId: "aws.auth#sigv4",
                identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") ||
                    (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
                signer: new _aws_sdk_core__WEBPACK_IMPORTED_MODULE_2__.AwsSdkSigV4Signer(),
            },
            {
                schemeId: "smithy.api#noAuth",
                identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
                signer: new _smithy_core__WEBPACK_IMPORTED_MODULE_9__.NoAuthSigner(),
            },
        ],
        maxAttempts: config?.maxAttempts ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)(_smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_11__.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
        region: config?.region ??
            (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__.NODE_REGION_CONFIG_OPTIONS, { ..._smithy_config_resolver__WEBPACK_IMPORTED_MODULE_6__.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
        requestHandler: _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_13__.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
        retryMode: config?.retryMode ??
            (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)({
                ..._smithy_middleware_retry__WEBPACK_IMPORTED_MODULE_11__.NODE_RETRY_MODE_CONFIG_OPTIONS,
                default: async () => (await defaultConfigProvider()).retryMode || _smithy_util_retry__WEBPACK_IMPORTED_MODULE_19__.DEFAULT_RETRY_MODE,
            }, config),
        sha256: config?.sha256 ?? _smithy_hash_node__WEBPACK_IMPORTED_MODULE_10__.Hash.bind(null, "sha256"),
        streamCollector: config?.streamCollector ?? _smithy_node_http_handler__WEBPACK_IMPORTED_MODULE_14__.streamCollector,
        useDualstackEndpoint: config?.useDualstackEndpoint ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_7__.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        useFipsEndpoint: config?.useFipsEndpoint ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)(_smithy_config_resolver__WEBPACK_IMPORTED_MODULE_8__.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
        userAgentAppId: config?.userAgentAppId ?? (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_12__.loadConfig)(_aws_sdk_util_user_agent_node__WEBPACK_IMPORTED_MODULE_5__.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig),
    };
};


/***/ },

/***/ 457
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRuntimeConfig: () => (/* binding */ getRuntimeConfig)
/* harmony export */ });
/* harmony import */ var _aws_sdk_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(165);
/* harmony import */ var _aws_sdk_core_protocols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(458);
/* harmony import */ var _smithy_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(424);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(129);
/* harmony import */ var _smithy_url_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(28);
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(272);
/* harmony import */ var _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(273);
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(145);
/* harmony import */ var _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(274);
/* harmony import */ var _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(454);
/* harmony import */ var _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(474);
/* harmony import */ var _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(476);










const getRuntimeConfig = (config) => {
    return {
        apiVersion: "2011-06-15",
        base64Decoder: config?.base64Decoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_5__.fromBase64,
        base64Encoder: config?.base64Encoder ?? _smithy_util_base64__WEBPACK_IMPORTED_MODULE_6__.toBase64,
        disableHostPrefix: config?.disableHostPrefix ?? false,
        endpointProvider: config?.endpointProvider ?? _endpoint_endpointResolver__WEBPACK_IMPORTED_MODULE_10__.defaultEndpointResolver,
        extensions: config?.extensions ?? [],
        httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? _auth_httpAuthSchemeProvider__WEBPACK_IMPORTED_MODULE_9__.defaultSTSHttpAuthSchemeProvider,
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
        protocol: config?.protocol ?? _aws_sdk_core_protocols__WEBPACK_IMPORTED_MODULE_1__.AwsQueryProtocol,
        protocolSettings: config?.protocolSettings ?? {
            defaultNamespace: "com.amazonaws.sts",
            errorTypeRegistries: _schemas_schemas_0__WEBPACK_IMPORTED_MODULE_11__.errorTypeRegistries,
            xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
            version: "2011-06-15",
            serviceTarget: "AWSSecurityTokenServiceV20110615",
        },
        serviceId: config?.serviceId ?? "STS",
        urlParser: config?.urlParser ?? _smithy_url_parser__WEBPACK_IMPORTED_MODULE_4__.parseUrl,
        utf8Decoder: config?.utf8Decoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_7__.fromUtf8,
        utf8Encoder: config?.utf8Encoder ?? _smithy_util_utf8__WEBPACK_IMPORTED_MODULE_8__.toUtf8,
    };
};


/***/ },

/***/ 479
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveRuntimeExtensions: () => (/* binding */ resolveRuntimeExtensions)
/* harmony export */ });
/* harmony import */ var _aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(311);
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(312);
/* harmony import */ var _smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(313);
/* harmony import */ var _auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(480);




const resolveRuntimeExtensions = (runtimeConfig, extensions) => {
    const extensionConfiguration = Object.assign((0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.getAwsRegionExtensionConfiguration)(runtimeConfig), (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.getDefaultExtensionConfiguration)(runtimeConfig), (0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.getHttpHandlerExtensionConfiguration)(runtimeConfig), (0,_auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__.getHttpAuthExtensionConfiguration)(runtimeConfig));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig, (0,_aws_sdk_region_config_resolver__WEBPACK_IMPORTED_MODULE_0__.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0,_smithy_smithy_client__WEBPACK_IMPORTED_MODULE_2__.resolveDefaultRuntimeConfig)(extensionConfiguration), (0,_smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0,_auth_httpAuthExtensionConfiguration__WEBPACK_IMPORTED_MODULE_3__.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
};


/***/ },

/***/ 476
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AssumeRole$: () => (/* binding */ AssumeRole$),
/* harmony export */   AssumeRoleRequest$: () => (/* binding */ AssumeRoleRequest$),
/* harmony export */   AssumeRoleResponse$: () => (/* binding */ AssumeRoleResponse$),
/* harmony export */   AssumeRoleWithWebIdentity$: () => (/* binding */ AssumeRoleWithWebIdentity$),
/* harmony export */   AssumeRoleWithWebIdentityRequest$: () => (/* binding */ AssumeRoleWithWebIdentityRequest$),
/* harmony export */   AssumeRoleWithWebIdentityResponse$: () => (/* binding */ AssumeRoleWithWebIdentityResponse$),
/* harmony export */   AssumedRoleUser$: () => (/* binding */ AssumedRoleUser$),
/* harmony export */   Credentials$: () => (/* binding */ Credentials$),
/* harmony export */   ExpiredTokenException$: () => (/* binding */ ExpiredTokenException$),
/* harmony export */   IDPCommunicationErrorException$: () => (/* binding */ IDPCommunicationErrorException$),
/* harmony export */   IDPRejectedClaimException$: () => (/* binding */ IDPRejectedClaimException$),
/* harmony export */   InvalidIdentityTokenException$: () => (/* binding */ InvalidIdentityTokenException$),
/* harmony export */   MalformedPolicyDocumentException$: () => (/* binding */ MalformedPolicyDocumentException$),
/* harmony export */   PackedPolicyTooLargeException$: () => (/* binding */ PackedPolicyTooLargeException$),
/* harmony export */   PolicyDescriptorType$: () => (/* binding */ PolicyDescriptorType$),
/* harmony export */   ProvidedContext$: () => (/* binding */ ProvidedContext$),
/* harmony export */   RegionDisabledException$: () => (/* binding */ RegionDisabledException$),
/* harmony export */   STSServiceException$: () => (/* binding */ STSServiceException$),
/* harmony export */   Tag$: () => (/* binding */ Tag$),
/* harmony export */   errorTypeRegistries: () => (/* binding */ errorTypeRegistries)
/* harmony export */ });
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(280);
/* harmony import */ var _models_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(477);
/* harmony import */ var _models_STSServiceException__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(478);
const _A = "Arn";
const _AKI = "AccessKeyId";
const _AR = "AssumeRole";
const _ARI = "AssumedRoleId";
const _ARR = "AssumeRoleRequest";
const _ARRs = "AssumeRoleResponse";
const _ARU = "AssumedRoleUser";
const _ARWWI = "AssumeRoleWithWebIdentity";
const _ARWWIR = "AssumeRoleWithWebIdentityRequest";
const _ARWWIRs = "AssumeRoleWithWebIdentityResponse";
const _Au = "Audience";
const _C = "Credentials";
const _CA = "ContextAssertion";
const _DS = "DurationSeconds";
const _E = "Expiration";
const _EI = "ExternalId";
const _ETE = "ExpiredTokenException";
const _IDPCEE = "IDPCommunicationErrorException";
const _IDPRCE = "IDPRejectedClaimException";
const _IITE = "InvalidIdentityTokenException";
const _K = "Key";
const _MPDE = "MalformedPolicyDocumentException";
const _P = "Policy";
const _PA = "PolicyArns";
const _PAr = "ProviderArn";
const _PC = "ProvidedContexts";
const _PCLT = "ProvidedContextsListType";
const _PCr = "ProvidedContext";
const _PDT = "PolicyDescriptorType";
const _PI = "ProviderId";
const _PPS = "PackedPolicySize";
const _PPTLE = "PackedPolicyTooLargeException";
const _Pr = "Provider";
const _RA = "RoleArn";
const _RDE = "RegionDisabledException";
const _RSN = "RoleSessionName";
const _SAK = "SecretAccessKey";
const _SFWIT = "SubjectFromWebIdentityToken";
const _SI = "SourceIdentity";
const _SN = "SerialNumber";
const _ST = "SessionToken";
const _T = "Tags";
const _TC = "TokenCode";
const _TTK = "TransitiveTagKeys";
const _Ta = "Tag";
const _V = "Value";
const _WIT = "WebIdentityToken";
const _a = "arn";
const _aKST = "accessKeySecretType";
const _aQE = "awsQueryError";
const _c = "client";
const _cTT = "clientTokenType";
const _e = "error";
const _hE = "httpError";
const _m = "message";
const _pDLT = "policyDescriptorListType";
const _s = "smithy.ts.sdk.synthetic.com.amazonaws.sts";
const _tLT = "tagListType";
const n0 = "com.amazonaws.sts";



const _s_registry = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.TypeRegistry.for(_s);
var STSServiceException$ = [-3, _s, "STSServiceException", 0, [], []];
_s_registry.registerError(STSServiceException$, _models_STSServiceException__WEBPACK_IMPORTED_MODULE_2__.STSServiceException);
const n0_registry = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.TypeRegistry.for(n0);
var ExpiredTokenException$ = [
    -3,
    n0,
    _ETE,
    { [_aQE]: [`ExpiredTokenException`, 400], [_e]: _c, [_hE]: 400 },
    [_m],
    [0],
];
n0_registry.registerError(ExpiredTokenException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.ExpiredTokenException);
var IDPCommunicationErrorException$ = [
    -3,
    n0,
    _IDPCEE,
    { [_aQE]: [`IDPCommunicationError`, 400], [_e]: _c, [_hE]: 400 },
    [_m],
    [0],
];
n0_registry.registerError(IDPCommunicationErrorException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.IDPCommunicationErrorException);
var IDPRejectedClaimException$ = [
    -3,
    n0,
    _IDPRCE,
    { [_aQE]: [`IDPRejectedClaim`, 403], [_e]: _c, [_hE]: 403 },
    [_m],
    [0],
];
n0_registry.registerError(IDPRejectedClaimException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.IDPRejectedClaimException);
var InvalidIdentityTokenException$ = [
    -3,
    n0,
    _IITE,
    { [_aQE]: [`InvalidIdentityToken`, 400], [_e]: _c, [_hE]: 400 },
    [_m],
    [0],
];
n0_registry.registerError(InvalidIdentityTokenException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.InvalidIdentityTokenException);
var MalformedPolicyDocumentException$ = [
    -3,
    n0,
    _MPDE,
    { [_aQE]: [`MalformedPolicyDocument`, 400], [_e]: _c, [_hE]: 400 },
    [_m],
    [0],
];
n0_registry.registerError(MalformedPolicyDocumentException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.MalformedPolicyDocumentException);
var PackedPolicyTooLargeException$ = [
    -3,
    n0,
    _PPTLE,
    { [_aQE]: [`PackedPolicyTooLarge`, 400], [_e]: _c, [_hE]: 400 },
    [_m],
    [0],
];
n0_registry.registerError(PackedPolicyTooLargeException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.PackedPolicyTooLargeException);
var RegionDisabledException$ = [
    -3,
    n0,
    _RDE,
    { [_aQE]: [`RegionDisabledException`, 403], [_e]: _c, [_hE]: 403 },
    [_m],
    [0],
];
n0_registry.registerError(RegionDisabledException$, _models_errors__WEBPACK_IMPORTED_MODULE_1__.RegionDisabledException);
const errorTypeRegistries = [_s_registry, n0_registry];
var accessKeySecretType = [0, n0, _aKST, 8, 0];
var clientTokenType = [0, n0, _cTT, 8, 0];
var AssumedRoleUser$ = [3, n0, _ARU, 0, [_ARI, _A], [0, 0], 2];
var AssumeRoleRequest$ = [
    3,
    n0,
    _ARR,
    0,
    [_RA, _RSN, _PA, _P, _DS, _T, _TTK, _EI, _SN, _TC, _SI, _PC],
    [0, 0, () => policyDescriptorListType, 0, 1, () => tagListType, 64 | 0, 0, 0, 0, 0, () => ProvidedContextsListType],
    2,
];
var AssumeRoleResponse$ = [
    3,
    n0,
    _ARRs,
    0,
    [_C, _ARU, _PPS, _SI],
    [[() => Credentials$, 0], () => AssumedRoleUser$, 1, 0],
];
var AssumeRoleWithWebIdentityRequest$ = [
    3,
    n0,
    _ARWWIR,
    0,
    [_RA, _RSN, _WIT, _PI, _PA, _P, _DS],
    [0, 0, [() => clientTokenType, 0], 0, () => policyDescriptorListType, 0, 1],
    3,
];
var AssumeRoleWithWebIdentityResponse$ = [
    3,
    n0,
    _ARWWIRs,
    0,
    [_C, _SFWIT, _ARU, _PPS, _Pr, _Au, _SI],
    [[() => Credentials$, 0], 0, () => AssumedRoleUser$, 1, 0, 0, 0],
];
var Credentials$ = [
    3,
    n0,
    _C,
    0,
    [_AKI, _SAK, _ST, _E],
    [0, [() => accessKeySecretType, 0], 0, 4],
    4,
];
var PolicyDescriptorType$ = [3, n0, _PDT, 0, [_a], [0]];
var ProvidedContext$ = [3, n0, _PCr, 0, [_PAr, _CA], [0, 0]];
var Tag$ = [3, n0, _Ta, 0, [_K, _V], [0, 0], 2];
var policyDescriptorListType = [1, n0, _pDLT, 0, () => PolicyDescriptorType$];
var ProvidedContextsListType = [1, n0, _PCLT, 0, () => ProvidedContext$];
var tagKeyListType = 64 | 0;
var tagListType = [1, n0, _tLT, 0, () => Tag$];
var AssumeRole$ = [9, n0, _AR, 0, () => AssumeRoleRequest$, () => AssumeRoleResponse$];
var AssumeRoleWithWebIdentity$ = [
    9,
    n0,
    _ARWWI,
    0,
    () => AssumeRoleWithWebIdentityRequest$,
    () => AssumeRoleWithWebIdentityResponse$,
];


/***/ },

/***/ 487
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stsRegionDefaultResolver: () => (/* binding */ stsRegionDefaultResolver),
/* harmony export */   warning: () => (/* binding */ warning)
/* harmony export */ });
/* harmony import */ var _smithy_config_resolver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(228);
/* harmony import */ var _smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93);


function stsRegionDefaultResolver(loaderConfig = {}) {
    return (0,_smithy_node_config_provider__WEBPACK_IMPORTED_MODULE_1__.loadConfig)({
        ..._smithy_config_resolver__WEBPACK_IMPORTED_MODULE_0__.NODE_REGION_CONFIG_OPTIONS,
        async default() {
            if (!warning.silence) {
                console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly.");
            }
            return "us-east-1";
        },
    }, { ..._smithy_config_resolver__WEBPACK_IMPORTED_MODULE_0__.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig });
}
const warning = {
    silence: false,
};


/***/ },

/***/ 461
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseXML: () => (/* binding */ parseXML)
/* harmony export */ });
/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(462);

const parser = new fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__["default"]({
    attributeNamePrefix: "",
    htmlEntities: true,
    ignoreAttributes: false,
    ignoreDeclaration: true,
    parseTagValue: false,
    trimValues: false,
    tagValueProcessor: (_, val) => (val.trim() === "" && val.includes("\n") ? "" : undefined),
});
parser.addEntity("#xD", "\r");
parser.addEntity("#10", "\n");
function parseXML(xmlString) {
    return parser.parse(xmlString, true);
}


/***/ },

/***/ 459
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RpcProtocol: () => (/* binding */ RpcProtocol)
/* harmony export */ });
/* harmony import */ var _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(264);
/* harmony import */ var _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _collect_stream_body__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(276);
/* harmony import */ var _HttpProtocol__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(279);




class RpcProtocol extends _HttpProtocol__WEBPACK_IMPORTED_MODULE_3__.HttpProtocol {
    async serializeRequest(operationSchema, input, context) {
        const serializer = this.serializer;
        const query = {};
        const headers = {};
        const endpoint = await context.endpoint();
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.NormalizedSchema.of(operationSchema?.input);
        const schema = ns.getSchema();
        let payload;
        const request = new _smithy_protocol_http__WEBPACK_IMPORTED_MODULE_1__.HttpRequest({
            protocol: "",
            hostname: "",
            port: undefined,
            path: "/",
            fragment: undefined,
            query: query,
            headers: headers,
            body: undefined,
        });
        if (endpoint) {
            this.updateServiceEndpoint(request, endpoint);
            this.setHostPrefix(request, operationSchema, input);
        }
        const _input = {
            ...input,
        };
        if (input) {
            const eventStreamMember = ns.getEventStreamMember();
            if (eventStreamMember) {
                if (_input[eventStreamMember]) {
                    const initialRequest = {};
                    for (const [memberName, memberSchema] of ns.structIterator()) {
                        if (memberName !== eventStreamMember && _input[memberName]) {
                            serializer.write(memberSchema, _input[memberName]);
                            initialRequest[memberName] = serializer.flush();
                        }
                    }
                    payload = await this.serializeEventStream({
                        eventStream: _input[eventStreamMember],
                        requestSchema: ns,
                        initialRequest,
                    });
                }
            }
            else {
                serializer.write(schema, _input);
                payload = serializer.flush();
            }
        }
        request.headers = headers;
        request.query = query;
        request.body = payload;
        request.method = "POST";
        return request;
    }
    async deserializeResponse(operationSchema, context, response) {
        const deserializer = this.deserializer;
        const ns = _smithy_core_schema__WEBPACK_IMPORTED_MODULE_0__.NormalizedSchema.of(operationSchema.output);
        const dataObject = {};
        if (response.statusCode >= 300) {
            const bytes = await (0,_collect_stream_body__WEBPACK_IMPORTED_MODULE_2__.collectBody)(response.body, context);
            if (bytes.byteLength > 0) {
                Object.assign(dataObject, await deserializer.read(15, bytes));
            }
            await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
            throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
        }
        for (const header in response.headers) {
            const value = response.headers[header];
            delete response.headers[header];
            response.headers[header.toLowerCase()] = value;
        }
        const eventStreamMember = ns.getEventStreamMember();
        if (eventStreamMember) {
            dataObject[eventStreamMember] = await this.deserializeEventStream({
                response,
                responseSchema: ns,
                initialResponseContainer: dataObject,
            });
        }
        else {
            const bytes = await (0,_collect_stream_body__WEBPACK_IMPORTED_MODULE_2__.collectBody)(response.body, context);
            if (bytes.byteLength > 0) {
                Object.assign(dataObject, await deserializer.read(ns, bytes));
            }
        }
        dataObject.$metadata = this.deserializeMetadata(response);
        return dataObject;
    }
}


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

/***/ 472
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValueFromTextNode: () => (/* binding */ getValueFromTextNode)
/* harmony export */ });
const getValueFromTextNode = (obj) => {
    const textNodeName = "#text";
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key][textNodeName] !== undefined) {
            obj[key] = obj[key][textNodeName];
        }
        else if (typeof obj[key] === "object" && obj[key] !== null) {
            obj[key] = getValueFromTextNode(obj[key]);
        }
    }
    return obj;
};


/***/ },

/***/ 469
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getIgnoreAttributesFn)
/* harmony export */ });
function getIgnoreAttributesFn(ignoreAttributes) {
    if (typeof ignoreAttributes === 'function') {
        return ignoreAttributes
    }
    if (Array.isArray(ignoreAttributes)) {
        return (attrName) => {
            for (const pattern of ignoreAttributes) {
                if (typeof pattern === 'string' && attrName === pattern) {
                    return true
                }
                if (pattern instanceof RegExp && pattern.test(attrName)) {
                    return true
                }
            }
        }
    }
    return () => false
}

/***/ },

/***/ 465
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAllMatches: () => (/* binding */ getAllMatches),
/* harmony export */   getValue: () => (/* binding */ getValue),
/* harmony export */   isEmptyObject: () => (/* binding */ isEmptyObject),
/* harmony export */   isExist: () => (/* binding */ isExist),
/* harmony export */   isName: () => (/* binding */ isName),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   nameRegexp: () => (/* binding */ nameRegexp)
/* harmony export */ });


const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
const regexName = new RegExp('^' + nameRegexp + '$');

function getAllMatches(string, regex) {
  const matches = [];
  let match = regex.exec(string);
  while (match) {
    const allmatches = [];
    allmatches.startIndex = regex.lastIndex - match[0].length;
    const len = match.length;
    for (let index = 0; index < len; index++) {
      allmatches.push(match[index]);
    }
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
}

const isName = function(string) {
  const match = regexName.exec(string);
  return !(match === null || typeof match === 'undefined');
}

function isExist(v) {
  return typeof v !== 'undefined';
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */
function merge(target, a, arrayMode) {
  if (a) {
    const keys = Object.keys(a); // will return an array of own properties
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      if (arrayMode === 'strict') {
        target[keys[i]] = [ a[keys[i]] ];
      } else {
        target[keys[i]] = a[keys[i]];
      }
    }
  }
}
/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */

function getValue(v) {
  if (exports.isExist(v)) {
    return v;
  } else {
    return '';
  }
}

// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};

/***/ },

/***/ 471
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(465);




const defaultOptions = {
  allowBooleanAttributes: false, //A tag can have attributes without any value
  unpairedTags: []
};

//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
function validate(xmlData, options) {
  options = Object.assign({}, defaultOptions, options);

  //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
  //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
  //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
  const tags = [];
  let tagFound = false;

  //indicates that the root tag has been closed (aka. depth 0 has been reached)
  let reachedRoot = false;

  if (xmlData[0] === '\ufeff') {
    // check for byte order mark (BOM)
    xmlData = xmlData.substr(1);
  }
  
  for (let i = 0; i < xmlData.length; i++) {

    if (xmlData[i] === '<' && xmlData[i+1] === '?') {
      i+=2;
      i = readPI(xmlData,i);
      if (i.err) return i;
    }else if (xmlData[i] === '<') {
      //starting of tag
      //read until you reach to '>' avoiding any '>' in attribute value
      let tagStartPos = i;
      i++;
      
      if (xmlData[i] === '!') {
        i = readCommentAndCDATA(xmlData, i);
        continue;
      } else {
        let closingTag = false;
        if (xmlData[i] === '/') {
          //closing tag
          closingTag = true;
          i++;
        }
        //read tagname
        let tagName = '';
        for (; i < xmlData.length &&
          xmlData[i] !== '>' &&
          xmlData[i] !== ' ' &&
          xmlData[i] !== '\t' &&
          xmlData[i] !== '\n' &&
          xmlData[i] !== '\r'; i++
        ) {
          tagName += xmlData[i];
        }
        tagName = tagName.trim();
        //console.log(tagName);

        if (tagName[tagName.length - 1] === '/') {
          //self closing tag without attributes
          tagName = tagName.substring(0, tagName.length - 1);
          //continue;
          i--;
        }
        if (!validateTagName(tagName)) {
          let msg;
          if (tagName.trim().length === 0) {
            msg = "Invalid space after '<'.";
          } else {
            msg = "Tag '"+tagName+"' is an invalid name.";
          }
          return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
        }

        const result = readAttributeStr(xmlData, i);
        if (result === false) {
          return getErrorObject('InvalidAttr', "Attributes for '"+tagName+"' have open quote.", getLineNumberForPosition(xmlData, i));
        }
        let attrStr = result.value;
        i = result.index;

        if (attrStr[attrStr.length - 1] === '/') {
          //self closing tag
          const attrStrStart = i - attrStr.length;
          attrStr = attrStr.substring(0, attrStr.length - 1);
          const isValid = validateAttributeString(attrStr, options);
          if (isValid === true) {
            tagFound = true;
            //continue; //text may presents after self closing tag
          } else {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
          }
        } else if (closingTag) {
          if (!result.tagClosed) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
          } else if (attrStr.trim().length > 0) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
          } else if (tags.length === 0) {
            return getErrorObject('InvalidTag', "Closing tag '"+tagName+"' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
          } else {
            const otg = tags.pop();
            if (tagName !== otg.tagName) {
              let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
              return getErrorObject('InvalidTag',
                "Expected closing tag '"+otg.tagName+"' (opened in line "+openPos.line+", col "+openPos.col+") instead of closing tag '"+tagName+"'.",
                getLineNumberForPosition(xmlData, tagStartPos));
            }

            //when there are no more tags, we reached the root level.
            if (tags.length == 0) {
              reachedRoot = true;
            }
          }
        } else {
          const isValid = validateAttributeString(attrStr, options);
          if (isValid !== true) {
            //the result from the nested function returns the position of the error within the attribute
            //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
            //this gives us the absolute index in the entire xml, which we can use to find the line at last
            return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
          }

          //if the root level has been reached before ...
          if (reachedRoot === true) {
            return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
          } else if(options.unpairedTags.indexOf(tagName) !== -1){
            //don't push into stack
          } else {
            tags.push({tagName, tagStartPos});
          }
          tagFound = true;
        }

        //skip tag text value
        //It may include comments and CDATA value
        for (i++; i < xmlData.length; i++) {
          if (xmlData[i] === '<') {
            if (xmlData[i + 1] === '!') {
              //comment or CADATA
              i++;
              i = readCommentAndCDATA(xmlData, i);
              continue;
            } else if (xmlData[i+1] === '?') {
              i = readPI(xmlData, ++i);
              if (i.err) return i;
            } else{
              break;
            }
          } else if (xmlData[i] === '&') {
            const afterAmp = validateAmpersand(xmlData, i);
            if (afterAmp == -1)
              return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
            i = afterAmp;
          }else{
            if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
              return getErrorObject('InvalidXml', "Extra text at the end", getLineNumberForPosition(xmlData, i));
            }
          }
        } //end of reading tag text value
        if (xmlData[i] === '<') {
          i--;
        }
      }
    } else {
      if ( isWhiteSpace(xmlData[i])) {
        continue;
      }
      return getErrorObject('InvalidChar', "char '"+xmlData[i]+"' is not expected.", getLineNumberForPosition(xmlData, i));
    }
  }

  if (!tagFound) {
    return getErrorObject('InvalidXml', 'Start tag expected.', 1);
  }else if (tags.length == 1) {
      return getErrorObject('InvalidTag', "Unclosed tag '"+tags[0].tagName+"'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
  }else if (tags.length > 0) {
      return getErrorObject('InvalidXml', "Invalid '"+
          JSON.stringify(tags.map(t => t.tagName), null, 4).replace(/\r?\n/g, '')+
          "' found.", {line: 1, col: 1});
  }

  return true;
};

function isWhiteSpace(char){
  return char === ' ' || char === '\t' || char === '\n'  || char === '\r';
}
/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */
function readPI(xmlData, i) {
  const start = i;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] == '?' || xmlData[i] == ' ') {
      //tagname
      const tagname = xmlData.substr(start, i - start);
      if (i > 5 && tagname === 'xml') {
        return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
      } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
        //check if valid attribut string
        i++;
        break;
      } else {
        continue;
      }
    }
  }
  return i;
}

function readCommentAndCDATA(xmlData, i) {
  if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
    //comment
    for (i += 3; i < xmlData.length; i++) {
      if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  } else if (
    xmlData.length > i + 8 &&
    xmlData[i + 1] === 'D' &&
    xmlData[i + 2] === 'O' &&
    xmlData[i + 3] === 'C' &&
    xmlData[i + 4] === 'T' &&
    xmlData[i + 5] === 'Y' &&
    xmlData[i + 6] === 'P' &&
    xmlData[i + 7] === 'E'
  ) {
    let angleBracketsCount = 1;
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === '<') {
        angleBracketsCount++;
      } else if (xmlData[i] === '>') {
        angleBracketsCount--;
        if (angleBracketsCount === 0) {
          break;
        }
      }
    }
  } else if (
    xmlData.length > i + 9 &&
    xmlData[i + 1] === '[' &&
    xmlData[i + 2] === 'C' &&
    xmlData[i + 3] === 'D' &&
    xmlData[i + 4] === 'A' &&
    xmlData[i + 5] === 'T' &&
    xmlData[i + 6] === 'A' &&
    xmlData[i + 7] === '['
  ) {
    for (i += 8; i < xmlData.length; i++) {
      if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
        i += 2;
        break;
      }
    }
  }

  return i;
}

const doubleQuote = '"';
const singleQuote = "'";

/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */
function readAttributeStr(xmlData, i) {
  let attrStr = '';
  let startChar = '';
  let tagClosed = false;
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
      if (startChar === '') {
        startChar = xmlData[i];
      } else if (startChar !== xmlData[i]) {
        //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
      } else {
        startChar = '';
      }
    } else if (xmlData[i] === '>') {
      if (startChar === '') {
        tagClosed = true;
        break;
      }
    }
    attrStr += xmlData[i];
  }
  if (startChar !== '') {
    return false;
  }

  return {
    value: attrStr,
    index: i,
    tagClosed: tagClosed
  };
}

/**
 * Select all the attributes whether valid or invalid.
 */
const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');

//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""

function validateAttributeString(attrStr, options) {
  //console.log("start:"+attrStr+":end");

  //if(attrStr.trim().length === 0) return true; //empty string

  const matches = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getAllMatches)(attrStr, validAttrStrRegxp);
  const attrNames = {};

  for (let i = 0; i < matches.length; i++) {
    if (matches[i][1].length === 0) {
      //nospace before attribute name: a="sd"b="saf"
      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' has no space in starting.", getPositionFromMatch(matches[i]))
    } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
      return getErrorObject('InvalidAttr', "Attribute '"+matches[i][2]+"' is without value.", getPositionFromMatch(matches[i]));
    } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
      //independent attribute: ab
      return getErrorObject('InvalidAttr', "boolean attribute '"+matches[i][2]+"' is not allowed.", getPositionFromMatch(matches[i]));
    }
    /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */
    const attrName = matches[i][2];
    if (!validateAttrName(attrName)) {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is an invalid name.", getPositionFromMatch(matches[i]));
    }
    if (!attrNames.hasOwnProperty(attrName)) {
      //check for duplicate attribute.
      attrNames[attrName] = 1;
    } else {
      return getErrorObject('InvalidAttr', "Attribute '"+attrName+"' is repeated.", getPositionFromMatch(matches[i]));
    }
  }

  return true;
}

function validateNumberAmpersand(xmlData, i) {
  let re = /\d/;
  if (xmlData[i] === 'x') {
    i++;
    re = /[\da-fA-F]/;
  }
  for (; i < xmlData.length; i++) {
    if (xmlData[i] === ';')
      return i;
    if (!xmlData[i].match(re))
      break;
  }
  return -1;
}

function validateAmpersand(xmlData, i) {
  // https://www.w3.org/TR/xml/#dt-charref
  i++;
  if (xmlData[i] === ';')
    return -1;
  if (xmlData[i] === '#') {
    i++;
    return validateNumberAmpersand(xmlData, i);
  }
  let count = 0;
  for (; i < xmlData.length; i++, count++) {
    if (xmlData[i].match(/\w/) && count < 20)
      continue;
    if (xmlData[i] === ';')
      break;
    return -1;
  }
  return i;
}

function getErrorObject(code, message, lineNumber) {
  return {
    err: {
      code: code,
      msg: message,
      line: lineNumber.line || lineNumber,
      col: lineNumber.col,
    },
  };
}

function validateAttrName(attrName) {
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isName)(attrName);
}

// const startsWithXML = /^xml/i;

function validateTagName(tagname) {
  return (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isName)(tagname) /* && !tagname.match(startsWithXML) */;
}

//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
  const lines = xmlData.substring(0, index).split(/\r?\n/);
  return {
    line: lines.length,

    // column number is last line's length + 1, because column numbering starts at 1:
    col: lines[lines.length - 1].length + 1
  };
}

//this function returns the position of the first character of match within attrStr
function getPositionFromMatch(match) {
  return match.startIndex + match[1].length;
}


/***/ },

/***/ 467
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DocTypeReader)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(465);


class DocTypeReader {
    constructor(options) {
        this.suppressValidationErr = !options;
        this.options = options;
    }

    readDocType(xmlData, i) {

        const entities = {};
        if (xmlData[i + 3] === 'O' &&
            xmlData[i + 4] === 'C' &&
            xmlData[i + 5] === 'T' &&
            xmlData[i + 6] === 'Y' &&
            xmlData[i + 7] === 'P' &&
            xmlData[i + 8] === 'E') {
            i = i + 9;
            let angleBracketsCount = 1;
            let hasBody = false, comment = false;
            let exp = "";
            for (; i < xmlData.length; i++) {
                if (xmlData[i] === '<' && !comment) { //Determine the tag type
                    if (hasBody && hasSeq(xmlData, "!ENTITY", i)) {
                        i += 7;
                        let entityName, val;
                        [entityName, val, i] = this.readEntityExp(xmlData, i + 1, this.suppressValidationErr);
                        if (val.indexOf("&") === -1) { //Parameter entities are not supported
                            const escaped = entityName.replace(/[.\-+*:]/g, '\\.');
                            entities[entityName] = {
                                regx: RegExp(`&${escaped};`, "g"),
                                val: val
                            };
                        }
                    }
                    else if (hasBody && hasSeq(xmlData, "!ELEMENT", i)) {
                        i += 8;//Not supported
                        const { index } = this.readElementExp(xmlData, i + 1);
                        i = index;
                    } else if (hasBody && hasSeq(xmlData, "!ATTLIST", i)) {
                        i += 8;//Not supported
                        // const {index} = this.readAttlistExp(xmlData,i+1);
                        // i = index;
                    } else if (hasBody && hasSeq(xmlData, "!NOTATION", i)) {
                        i += 9;//Not supported
                        const { index } = this.readNotationExp(xmlData, i + 1, this.suppressValidationErr);
                        i = index;
                    } else if (hasSeq(xmlData, "!--", i)) comment = true;
                    else throw new Error(`Invalid DOCTYPE`);

                    angleBracketsCount++;
                    exp = "";
                } else if (xmlData[i] === '>') { //Read tag content
                    if (comment) {
                        if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
                            comment = false;
                            angleBracketsCount--;
                        }
                    } else {
                        angleBracketsCount--;
                    }
                    if (angleBracketsCount === 0) {
                        break;
                    }
                } else if (xmlData[i] === '[') {
                    hasBody = true;
                } else {
                    exp += xmlData[i];
                }
            }
            if (angleBracketsCount !== 0) {
                throw new Error(`Unclosed DOCTYPE`);
            }
        } else {
            throw new Error(`Invalid Tag instead of DOCTYPE`);
        }
        return { entities, i };
    }
    readEntityExp(xmlData, i) {
        //External entities are not supported
        //    <!ENTITY ext SYSTEM "http://normal-website.com" >

        //Parameter entities are not supported
        //    <!ENTITY entityname "&anotherElement;">

        //Internal entities are supported
        //    <!ENTITY entityname "replacement text">

        // Skip leading whitespace after <!ENTITY
        i = skipWhitespace(xmlData, i);

        // Read entity name
        let entityName = "";
        while (i < xmlData.length && !/\s/.test(xmlData[i]) && xmlData[i] !== '"' && xmlData[i] !== "'") {
            entityName += xmlData[i];
            i++;
        }
        validateEntityName(entityName);

        // Skip whitespace after entity name
        i = skipWhitespace(xmlData, i);

        // Check for unsupported constructs (external entities or parameter entities)
        if (!this.suppressValidationErr) {
            if (xmlData.substring(i, i + 6).toUpperCase() === "SYSTEM") {
                throw new Error("External entities are not supported");
            } else if (xmlData[i] === "%") {
                throw new Error("Parameter entities are not supported");
            }
        }

        // Read entity value (internal entity)
        let entityValue = "";
        [i, entityValue] = this.readIdentifierVal(xmlData, i, "entity");

        // Validate entity size
        if (this.options.enabled !== false &&
            this.options.maxEntitySize &&
            entityValue.length > this.options.maxEntitySize) {
            throw new Error(
                `Entity "${entityName}" size (${entityValue.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`
            );
        }

        i--;
        return [entityName, entityValue, i];
    }

    readNotationExp(xmlData, i) {
        // Skip leading whitespace after <!NOTATION
        i = skipWhitespace(xmlData, i);

        // Read notation name
        let notationName = "";
        while (i < xmlData.length && !/\s/.test(xmlData[i])) {
            notationName += xmlData[i];
            i++;
        }
        !this.suppressValidationErr && validateEntityName(notationName);

        // Skip whitespace after notation name
        i = skipWhitespace(xmlData, i);

        // Check identifier type (SYSTEM or PUBLIC)
        const identifierType = xmlData.substring(i, i + 6).toUpperCase();
        if (!this.suppressValidationErr && identifierType !== "SYSTEM" && identifierType !== "PUBLIC") {
            throw new Error(`Expected SYSTEM or PUBLIC, found "${identifierType}"`);
        }
        i += identifierType.length;

        // Skip whitespace after identifier type
        i = skipWhitespace(xmlData, i);

        // Read public identifier (if PUBLIC)
        let publicIdentifier = null;
        let systemIdentifier = null;

        if (identifierType === "PUBLIC") {
            [i, publicIdentifier] = this.readIdentifierVal(xmlData, i, "publicIdentifier");

            // Skip whitespace after public identifier
            i = skipWhitespace(xmlData, i);

            // Optionally read system identifier
            if (xmlData[i] === '"' || xmlData[i] === "'") {
                [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");
            }
        } else if (identifierType === "SYSTEM") {
            // Read system identifier (mandatory for SYSTEM)
            [i, systemIdentifier] = this.readIdentifierVal(xmlData, i, "systemIdentifier");

            if (!this.suppressValidationErr && !systemIdentifier) {
                throw new Error("Missing mandatory system identifier for SYSTEM notation");
            }
        }

        return { notationName, publicIdentifier, systemIdentifier, index: --i };
    }

    readIdentifierVal(xmlData, i, type) {
        let identifierVal = "";
        const startChar = xmlData[i];
        if (startChar !== '"' && startChar !== "'") {
            throw new Error(`Expected quoted string, found "${startChar}"`);
        }
        i++;

        while (i < xmlData.length && xmlData[i] !== startChar) {
            identifierVal += xmlData[i];
            i++;
        }

        if (xmlData[i] !== startChar) {
            throw new Error(`Unterminated ${type} value`);
        }
        i++;
        return [i, identifierVal];
    }

    readElementExp(xmlData, i) {
        // <!ELEMENT br EMPTY>
        // <!ELEMENT div ANY>
        // <!ELEMENT title (#PCDATA)>
        // <!ELEMENT book (title, author+)>
        // <!ELEMENT name (content-model)>

        // Skip leading whitespace after <!ELEMENT
        i = skipWhitespace(xmlData, i);

        // Read element name
        let elementName = "";
        while (i < xmlData.length && !/\s/.test(xmlData[i])) {
            elementName += xmlData[i];
            i++;
        }

        // Validate element name
        if (!this.suppressValidationErr && !(0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isName)(elementName)) {
            throw new Error(`Invalid element name: "${elementName}"`);
        }

        // Skip whitespace after element name
        i = skipWhitespace(xmlData, i);
        let contentModel = "";
        // Expect '(' to start content model
        if (xmlData[i] === "E" && hasSeq(xmlData, "MPTY", i)) i += 4;
        else if (xmlData[i] === "A" && hasSeq(xmlData, "NY", i)) i += 2;
        else if (xmlData[i] === "(") {
            i++; // Move past '('

            // Read content model
            while (i < xmlData.length && xmlData[i] !== ")") {
                contentModel += xmlData[i];
                i++;
            }
            if (xmlData[i] !== ")") {
                throw new Error("Unterminated content model");
            }

        } else if (!this.suppressValidationErr) {
            throw new Error(`Invalid Element Expression, found "${xmlData[i]}"`);
        }

        return {
            elementName,
            contentModel: contentModel.trim(),
            index: i
        };
    }

    readAttlistExp(xmlData, i) {
        // Skip leading whitespace after <!ATTLIST
        i = skipWhitespace(xmlData, i);

        // Read element name
        let elementName = "";
        while (i < xmlData.length && !/\s/.test(xmlData[i])) {
            elementName += xmlData[i];
            i++;
        }

        // Validate element name
        validateEntityName(elementName)

        // Skip whitespace after element name
        i = skipWhitespace(xmlData, i);

        // Read attribute name
        let attributeName = "";
        while (i < xmlData.length && !/\s/.test(xmlData[i])) {
            attributeName += xmlData[i];
            i++;
        }

        // Validate attribute name
        if (!validateEntityName(attributeName)) {
            throw new Error(`Invalid attribute name: "${attributeName}"`);
        }

        // Skip whitespace after attribute name
        i = skipWhitespace(xmlData, i);

        // Read attribute type
        let attributeType = "";
        if (xmlData.substring(i, i + 8).toUpperCase() === "NOTATION") {
            attributeType = "NOTATION";
            i += 8; // Move past "NOTATION"

            // Skip whitespace after "NOTATION"
            i = skipWhitespace(xmlData, i);

            // Expect '(' to start the list of notations
            if (xmlData[i] !== "(") {
                throw new Error(`Expected '(', found "${xmlData[i]}"`);
            }
            i++; // Move past '('

            // Read the list of allowed notations
            let allowedNotations = [];
            while (i < xmlData.length && xmlData[i] !== ")") {
                let notation = "";
                while (i < xmlData.length && xmlData[i] !== "|" && xmlData[i] !== ")") {
                    notation += xmlData[i];
                    i++;
                }

                // Validate notation name
                notation = notation.trim();
                if (!validateEntityName(notation)) {
                    throw new Error(`Invalid notation name: "${notation}"`);
                }

                allowedNotations.push(notation);

                // Skip '|' separator or exit loop
                if (xmlData[i] === "|") {
                    i++; // Move past '|'
                    i = skipWhitespace(xmlData, i); // Skip optional whitespace after '|'
                }
            }

            if (xmlData[i] !== ")") {
                throw new Error("Unterminated list of notations");
            }
            i++; // Move past ')'

            // Store the allowed notations as part of the attribute type
            attributeType += " (" + allowedNotations.join("|") + ")";
        } else {
            // Handle simple types (e.g., CDATA, ID, IDREF, etc.)
            while (i < xmlData.length && !/\s/.test(xmlData[i])) {
                attributeType += xmlData[i];
                i++;
            }

            // Validate simple attribute type
            const validTypes = ["CDATA", "ID", "IDREF", "IDREFS", "ENTITY", "ENTITIES", "NMTOKEN", "NMTOKENS"];
            if (!this.suppressValidationErr && !validTypes.includes(attributeType.toUpperCase())) {
                throw new Error(`Invalid attribute type: "${attributeType}"`);
            }
        }

        // Skip whitespace after attribute type
        i = skipWhitespace(xmlData, i);

        // Read default value
        let defaultValue = "";
        if (xmlData.substring(i, i + 8).toUpperCase() === "#REQUIRED") {
            defaultValue = "#REQUIRED";
            i += 8;
        } else if (xmlData.substring(i, i + 7).toUpperCase() === "#IMPLIED") {
            defaultValue = "#IMPLIED";
            i += 7;
        } else {
            [i, defaultValue] = this.readIdentifierVal(xmlData, i, "ATTLIST");
        }

        return {
            elementName,
            attributeName,
            attributeType,
            defaultValue,
            index: i
        }
    }
}



const skipWhitespace = (data, index) => {
    while (index < data.length && /\s/.test(data[index])) {
        index++;
    }
    return index;
};



function hasSeq(data, seq, i) {
    for (let j = 0; j < seq.length; j++) {
        if (seq[j] !== data[i + j + 1]) return false;
    }
    return true;
}

function validateEntityName(name) {
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isName)(name))
        return name;
    else
        throw new Error(`Invalid entity name ${name}`);
}

/***/ },

/***/ 463
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildOptions: () => (/* binding */ buildOptions),
/* harmony export */   defaultOptions: () => (/* binding */ defaultOptions)
/* harmony export */ });
const defaultOptions = {
  preserveOrder: false,
  attributeNamePrefix: '@_',
  attributesGroupName: false,
  textNodeName: '#text',
  ignoreAttributes: true,
  removeNSPrefix: false, // remove NS from tag name or attribute name if true
  allowBooleanAttributes: false, //a tag can have attributes without any value
  //ignoreRootElement : false,
  parseTagValue: true,
  parseAttributeValue: false,
  trimValues: true, //Trim string values of tag and attributes
  cdataPropName: false,
  numberParseOptions: {
    hex: true,
    leadingZeros: true,
    eNotation: true
  },
  tagValueProcessor: function (tagName, val) {
    return val;
  },
  attributeValueProcessor: function (attrName, val) {
    return val;
  },
  stopNodes: [], //nested tags will not be parsed even for errors
  alwaysCreateTextNode: false,
  isArray: () => false,
  commentPropName: false,
  unpairedTags: [],
  processEntities: true,
  htmlEntities: false,
  ignoreDeclaration: false,
  ignorePiTags: false,
  transformTagName: false,
  transformAttributeName: false,
  updateTag: function (tagName, jPath, attrs) {
    return tagName
  },
  // skipEmptyListItem: false
  captureMetaData: false,
};

/**
 * Normalizes processEntities option for backward compatibility
 * @param {boolean|object} value 
 * @returns {object} Always returns normalized object
 */
function normalizeProcessEntities(value) {
  // Boolean backward compatibility
  if (typeof value === 'boolean') {
    return {
      enabled: value, // true or false
      maxEntitySize: 10000,
      maxExpansionDepth: 10,
      maxTotalExpansions: 1000,
      maxExpandedLength: 100000,
      allowedTags: null,
      tagFilter: null
    };
  }

  // Object config - merge with defaults
  if (typeof value === 'object' && value !== null) {
    return {
      enabled: value.enabled !== false, // default true if not specified
      maxEntitySize: value.maxEntitySize ?? 10000,
      maxExpansionDepth: value.maxExpansionDepth ?? 10,
      maxTotalExpansions: value.maxTotalExpansions ?? 1000,
      maxExpandedLength: value.maxExpandedLength ?? 100000,
      allowedTags: value.allowedTags ?? null,
      tagFilter: value.tagFilter ?? null
    };
  }

  // Default to enabled with limits
  return normalizeProcessEntities(true);
}

const buildOptions = function (options) {
  const built = Object.assign({}, defaultOptions, options);

  // Always normalize processEntities for backward compatibility and validation
  built.processEntities = normalizeProcessEntities(built.processEntities);
  //console.debug(built.processEntities)
  return built;
};

/***/ },

/***/ 464
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderedObjParser)
/* harmony export */ });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(465);
/* harmony import */ var _xmlNode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(466);
/* harmony import */ var _DocTypeReader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(467);
/* harmony import */ var strnum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(468);
/* harmony import */ var _ignoreAttributes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(469);

///@ts-check







// const regx =
//   '<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'
//   .replace(/NAME/g, util.nameRegexp);

//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");

class OrderedObjParser {
  constructor(options) {
    this.options = options;
    this.currentNode = null;
    this.tagsNodeStack = [];
    this.docTypeEntities = {};
    this.lastEntities = {
      "apos": { regex: /&(apos|#39|#x27);/g, val: "'" },
      "gt": { regex: /&(gt|#62|#x3E);/g, val: ">" },
      "lt": { regex: /&(lt|#60|#x3C);/g, val: "<" },
      "quot": { regex: /&(quot|#34|#x22);/g, val: "\"" },
    };
    this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
    this.htmlEntities = {
      "space": { regex: /&(nbsp|#160);/g, val: " " },
      // "lt" : { regex: /&(lt|#60);/g, val: "<" },
      // "gt" : { regex: /&(gt|#62);/g, val: ">" },
      // "amp" : { regex: /&(amp|#38);/g, val: "&" },
      // "quot" : { regex: /&(quot|#34);/g, val: "\"" },
      // "apos" : { regex: /&(apos|#39);/g, val: "'" },
      "cent": { regex: /&(cent|#162);/g, val: "¢" },
      "pound": { regex: /&(pound|#163);/g, val: "£" },
      "yen": { regex: /&(yen|#165);/g, val: "¥" },
      "euro": { regex: /&(euro|#8364);/g, val: "€" },
      "copyright": { regex: /&(copy|#169);/g, val: "©" },
      "reg": { regex: /&(reg|#174);/g, val: "®" },
      "inr": { regex: /&(inr|#8377);/g, val: "₹" },
      "num_dec": { regex: /&#([0-9]{1,7});/g, val: (_, str) => fromCodePoint(str, 10, "&#") },
      "num_hex": { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => fromCodePoint(str, 16, "&#x") },
    };
    this.addExternalEntities = addExternalEntities;
    this.parseXml = parseXml;
    this.parseTextData = parseTextData;
    this.resolveNameSpace = resolveNameSpace;
    this.buildAttributesMap = buildAttributesMap;
    this.isItStopNode = isItStopNode;
    this.replaceEntitiesValue = replaceEntitiesValue;
    this.readStopNodeData = readStopNodeData;
    this.saveTextToParentTag = saveTextToParentTag;
    this.addChild = addChild;
    this.ignoreAttributesFn = (0,_ignoreAttributes_js__WEBPACK_IMPORTED_MODULE_4__["default"])(this.options.ignoreAttributes)
    this.entityExpansionCount = 0;
    this.currentExpandedLength = 0;

    if (this.options.stopNodes && this.options.stopNodes.length > 0) {
      this.stopNodesExact = new Set();
      this.stopNodesWildcard = new Set();
      for (let i = 0; i < this.options.stopNodes.length; i++) {
        const stopNodeExp = this.options.stopNodes[i];
        if (typeof stopNodeExp !== 'string') continue;
        if (stopNodeExp.startsWith("*.")) {
          this.stopNodesWildcard.add(stopNodeExp.substring(2));
        } else {
          this.stopNodesExact.add(stopNodeExp);
        }
      }
    }
  }

}

function addExternalEntities(externalEntities) {
  const entKeys = Object.keys(externalEntities);
  for (let i = 0; i < entKeys.length; i++) {
    const ent = entKeys[i];
    const escaped = ent.replace(/[.\-+*:]/g, '\\.');
    this.lastEntities[ent] = {
      regex: new RegExp("&" + escaped + ";", "g"),
      val: externalEntities[ent]
    }
  }
}

/**
 * @param {string} val
 * @param {string} tagName
 * @param {string} jPath
 * @param {boolean} dontTrim
 * @param {boolean} hasAttributes
 * @param {boolean} isLeafNode
 * @param {boolean} escapeEntities
 */
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
  if (val !== undefined) {
    if (this.options.trimValues && !dontTrim) {
      val = val.trim();
    }
    if (val.length > 0) {
      if (!escapeEntities) val = this.replaceEntitiesValue(val, tagName, jPath);

      const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
      if (newval === null || newval === undefined) {
        //don't parse
        return val;
      } else if (typeof newval !== typeof val || newval !== val) {
        //overwrite
        return newval;
      } else if (this.options.trimValues) {
        return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
      } else {
        const trimmedVal = val.trim();
        if (trimmedVal === val) {
          return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
        } else {
          return val;
        }
      }
    }
  }
}

function resolveNameSpace(tagname) {
  if (this.options.removeNSPrefix) {
    const tags = tagname.split(':');
    const prefix = tagname.charAt(0) === '/' ? '/' : '';
    if (tags[0] === 'xmlns') {
      return '';
    }
    if (tags.length === 2) {
      tagname = prefix + tags[1];
    }
  }
  return tagname;
}

//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
const attrsRegx = new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])([\\s\\S]*?)\\3)?', 'gm');

function buildAttributesMap(attrStr, jPath, tagName) {
  if (this.options.ignoreAttributes !== true && typeof attrStr === 'string') {
    // attrStr = attrStr.replace(/\r?\n/g, ' ');
    //attrStr = attrStr || attrStr.trim();

    const matches = (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.getAllMatches)(attrStr, attrsRegx);
    const len = matches.length; //don't make it inline
    const attrs = {};
    for (let i = 0; i < len; i++) {
      const attrName = this.resolveNameSpace(matches[i][1]);
      if (this.ignoreAttributesFn(attrName, jPath)) {
        continue
      }
      let oldVal = matches[i][4];
      let aName = this.options.attributeNamePrefix + attrName;
      if (attrName.length) {
        if (this.options.transformAttributeName) {
          aName = this.options.transformAttributeName(aName);
        }
        if (aName === "__proto__") aName = "#__proto__";
        if (oldVal !== undefined) {
          if (this.options.trimValues) {
            oldVal = oldVal.trim();
          }
          oldVal = this.replaceEntitiesValue(oldVal, tagName, jPath);
          const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
          if (newVal === null || newVal === undefined) {
            //don't parse
            attrs[aName] = oldVal;
          } else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
            //overwrite
            attrs[aName] = newVal;
          } else {
            //parse
            attrs[aName] = parseValue(
              oldVal,
              this.options.parseAttributeValue,
              this.options.numberParseOptions
            );
          }
        } else if (this.options.allowBooleanAttributes) {
          attrs[aName] = true;
        }
      }
    }
    if (!Object.keys(attrs).length) {
      return;
    }
    if (this.options.attributesGroupName) {
      const attrCollection = {};
      attrCollection[this.options.attributesGroupName] = attrs;
      return attrCollection;
    }
    return attrs
  }
}

const parseXml = function (xmlData) {
  xmlData = xmlData.replace(/\r\n?/g, "\n"); //TODO: remove this line
  const xmlObj = new _xmlNode_js__WEBPACK_IMPORTED_MODULE_1__["default"]('!xml');
  let currentNode = xmlObj;
  let textData = "";
  let jPath = "";

  // Reset entity expansion counters for this document
  this.entityExpansionCount = 0;
  this.currentExpandedLength = 0;

  const docTypeReader = new _DocTypeReader_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.options.processEntities);
  for (let i = 0; i < xmlData.length; i++) {//for each char in XML data
    const ch = xmlData[i];
    if (ch === '<') {
      // const nextIndex = i+1;
      // const _2ndChar = xmlData[nextIndex];
      if (xmlData[i + 1] === '/') {//Closing Tag
        const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.")
        let tagName = xmlData.substring(i + 2, closeIndex).trim();

        if (this.options.removeNSPrefix) {
          const colonIndex = tagName.indexOf(":");
          if (colonIndex !== -1) {
            tagName = tagName.substr(colonIndex + 1);
          }
        }

        if (this.options.transformTagName) {
          tagName = this.options.transformTagName(tagName);
        }

        if (currentNode) {
          textData = this.saveTextToParentTag(textData, currentNode, jPath);
        }

        //check if last tag of nested tag was unpaired tag
        const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
        if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
          throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
        }
        let propIndex = 0
        if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
          propIndex = jPath.lastIndexOf('.', jPath.lastIndexOf('.') - 1)
          this.tagsNodeStack.pop();
        } else {
          propIndex = jPath.lastIndexOf(".");
        }
        jPath = jPath.substring(0, propIndex);

        currentNode = this.tagsNodeStack.pop();//avoid recursion, set the parent tag scope
        textData = "";
        i = closeIndex;
      } else if (xmlData[i + 1] === '?') {

        let tagData = readTagExp(xmlData, i, false, "?>");
        if (!tagData) throw new Error("Pi Tag is not closed.");

        textData = this.saveTextToParentTag(textData, currentNode, jPath);
        if ((this.options.ignoreDeclaration && tagData.tagName === "?xml") || this.options.ignorePiTags) {
          //do nothing
        } else {

          const childNode = new _xmlNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](tagData.tagName);
          childNode.add(this.options.textNodeName, "");

          if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
            childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
          }
          this.addChild(currentNode, childNode, jPath, i);
        }


        i = tagData.closeIndex + 1;
      } else if (xmlData.substr(i + 1, 3) === '!--') {
        const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.")
        if (this.options.commentPropName) {
          const comment = xmlData.substring(i + 4, endIndex - 2);

          textData = this.saveTextToParentTag(textData, currentNode, jPath);

          currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
        }
        i = endIndex;
      } else if (xmlData.substr(i + 1, 2) === '!D') {
        const result = docTypeReader.readDocType(xmlData, i);
        this.docTypeEntities = result.entities;
        i = result.i;
      } else if (xmlData.substr(i + 1, 2) === '![') {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
        const tagExp = xmlData.substring(i + 9, closeIndex);

        textData = this.saveTextToParentTag(textData, currentNode, jPath);

        let val = this.parseTextData(tagExp, currentNode.tagname, jPath, true, false, true, true);
        if (val == undefined) val = "";

        //cdata should be set even if it is 0 length string
        if (this.options.cdataPropName) {
          currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
        } else {
          currentNode.add(this.options.textNodeName, val);
        }

        i = closeIndex + 2;
      } else {//Opening tag
        let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
        let tagName = result.tagName;
        const rawTagName = result.rawTagName;
        let tagExp = result.tagExp;
        let attrExpPresent = result.attrExpPresent;
        let closeIndex = result.closeIndex;

        if (this.options.transformTagName) {
          //console.log(tagExp, tagName)
          const newTagName = this.options.transformTagName(tagName);
          if (tagExp === tagName) {
            tagExp = newTagName
          }
          tagName = newTagName;
        }

        //save text as child node
        if (currentNode && textData) {
          if (currentNode.tagname !== '!xml') {
            //when nested tag is found
            textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
          }
        }

        //check if last tag was unpaired tag
        const lastTag = currentNode;
        if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
          currentNode = this.tagsNodeStack.pop();
          jPath = jPath.substring(0, jPath.lastIndexOf("."));
        }
        if (tagName !== xmlObj.tagname) {
          jPath += jPath ? "." + tagName : tagName;
        }
        const startIndex = i;
        if (this.isItStopNode(this.stopNodesExact, this.stopNodesWildcard, jPath, tagName)) {
          let tagContent = "";
          //self-closing tag
          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            if (tagName[tagName.length - 1] === "/") { //remove trailing '/'
              tagName = tagName.substr(0, tagName.length - 1);
              jPath = jPath.substr(0, jPath.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }
            i = result.closeIndex;
          }
          //unpaired tag
          else if (this.options.unpairedTags.indexOf(tagName) !== -1) {

            i = result.closeIndex;
          }
          //normal tag
          else {
            //read until closing tag is found
            const result = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
            if (!result) throw new Error(`Unexpected end of ${rawTagName}`);
            i = result.i;
            tagContent = result.tagContent;
          }

          const childNode = new _xmlNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](tagName);

          if (tagName !== tagExp && attrExpPresent) {
            childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
          }
          if (tagContent) {
            tagContent = this.parseTextData(tagContent, tagName, jPath, true, attrExpPresent, true, true);
          }

          jPath = jPath.substr(0, jPath.lastIndexOf("."));
          childNode.add(this.options.textNodeName, tagContent);

          this.addChild(currentNode, childNode, jPath, startIndex);
        } else {
          //selfClosing tag
          if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
            if (tagName[tagName.length - 1] === "/") { //remove trailing '/'
              tagName = tagName.substr(0, tagName.length - 1);
              jPath = jPath.substr(0, jPath.length - 1);
              tagExp = tagName;
            } else {
              tagExp = tagExp.substr(0, tagExp.length - 1);
            }

            if (this.options.transformTagName) {
              const newTagName = this.options.transformTagName(tagName);
              if (tagExp === tagName) {
                tagExp = newTagName
              }
              tagName = newTagName;
            }

            const childNode = new _xmlNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](tagName);
            if (tagName !== tagExp && attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            this.addChild(currentNode, childNode, jPath, startIndex);
            jPath = jPath.substr(0, jPath.lastIndexOf("."));
          }
          //opening tag
          else {
            const childNode = new _xmlNode_js__WEBPACK_IMPORTED_MODULE_1__["default"](tagName);
            this.tagsNodeStack.push(currentNode);

            if (tagName !== tagExp && attrExpPresent) {
              childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
            }
            this.addChild(currentNode, childNode, jPath, startIndex);
            currentNode = childNode;
          }
          textData = "";
          i = closeIndex;
        }
      }
    } else {
      textData += xmlData[i];
    }
  }
  return xmlObj.child;
}

function addChild(currentNode, childNode, jPath, startIndex) {
  // unset startIndex if not requested
  if (!this.options.captureMetaData) startIndex = undefined;
  const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"])
  if (result === false) {
    //do nothing
  } else if (typeof result === "string") {
    childNode.tagname = result
    currentNode.addChild(childNode, startIndex);
  } else {
    currentNode.addChild(childNode, startIndex);
  }
}

const replaceEntitiesValue = function (val, tagName, jPath) {
  // Performance optimization: Early return if no entities to replace
  if (val.indexOf('&') === -1) {
    return val;
  }

  const entityConfig = this.options.processEntities;

  if (!entityConfig.enabled) {
    return val;
  }

  // Check tag-specific filtering
  if (entityConfig.allowedTags) {
    if (!entityConfig.allowedTags.includes(tagName)) {
      return val; // Skip entity replacement for current tag as not set
    }
  }

  if (entityConfig.tagFilter) {
    if (!entityConfig.tagFilter(tagName, jPath)) {
      return val; // Skip based on custom filter
    }
  }

  // Replace DOCTYPE entities
  for (let entityName in this.docTypeEntities) {
    const entity = this.docTypeEntities[entityName];
    const matches = val.match(entity.regx);

    if (matches) {
      // Track expansions
      this.entityExpansionCount += matches.length;

      // Check expansion limit
      if (entityConfig.maxTotalExpansions &&
        this.entityExpansionCount > entityConfig.maxTotalExpansions) {
        throw new Error(
          `Entity expansion limit exceeded: ${this.entityExpansionCount} > ${entityConfig.maxTotalExpansions}`
        );
      }

      // Store length before replacement
      const lengthBefore = val.length;
      val = val.replace(entity.regx, entity.val);

      // Check expanded length immediately after replacement
      if (entityConfig.maxExpandedLength) {
        this.currentExpandedLength += (val.length - lengthBefore);

        if (this.currentExpandedLength > entityConfig.maxExpandedLength) {
          throw new Error(
            `Total expanded content size exceeded: ${this.currentExpandedLength} > ${entityConfig.maxExpandedLength}`
          );
        }
      }
    }
  }
  if (val.indexOf('&') === -1) return val;  // Early exit

  // Replace standard entities
  for (let entityName in this.lastEntities) {
    const entity = this.lastEntities[entityName];
    val = val.replace(entity.regex, entity.val);
  }
  if (val.indexOf('&') === -1) return val;  // Early exit

  // Replace HTML entities if enabled
  if (this.options.htmlEntities) {
    for (let entityName in this.htmlEntities) {
      const entity = this.htmlEntities[entityName];
      val = val.replace(entity.regex, entity.val);
    }
  }

  // Replace ampersand entity last
  val = val.replace(this.ampEntity.regex, this.ampEntity.val);

  return val;
}


function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
  if (textData) { //store previously collected data as textNode
    if (isLeafNode === undefined) isLeafNode = currentNode.child.length === 0

    textData = this.parseTextData(textData,
      currentNode.tagname,
      jPath,
      false,
      currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false,
      isLeafNode);

    if (textData !== undefined && textData !== "")
      currentNode.add(this.options.textNodeName, textData);
    textData = "";
  }
  return textData;
}

//TODO: use jPath to simplify the logic
/**
 * @param {Set} stopNodesExact
 * @param {Set} stopNodesWildcard
 * @param {string} jPath
 * @param {string} currentTagName
 */
function isItStopNode(stopNodesExact, stopNodesWildcard, jPath, currentTagName) {
  if (stopNodesWildcard && stopNodesWildcard.has(currentTagName)) return true;
  if (stopNodesExact && stopNodesExact.has(jPath)) return true;
  return false;
}

/**
 * Returns the tag Expression and where it is ending handling single-double quotes situation
 * @param {string} xmlData 
 * @param {number} i starting index
 * @returns 
 */
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
  let attrBoundary;
  let tagExp = "";
  for (let index = i; index < xmlData.length; index++) {
    let ch = xmlData[index];
    if (attrBoundary) {
      if (ch === attrBoundary) attrBoundary = "";//reset
    } else if (ch === '"' || ch === "'") {
      attrBoundary = ch;
    } else if (ch === closingChar[0]) {
      if (closingChar[1]) {
        if (xmlData[index + 1] === closingChar[1]) {
          return {
            data: tagExp,
            index: index
          }
        }
      } else {
        return {
          data: tagExp,
          index: index
        }
      }
    } else if (ch === '\t') {
      ch = " "
    }
    tagExp += ch;
  }
}

function findClosingIndex(xmlData, str, i, errMsg) {
  const closingIndex = xmlData.indexOf(str, i);
  if (closingIndex === -1) {
    throw new Error(errMsg)
  } else {
    return closingIndex + str.length - 1;
  }
}

function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
  const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
  if (!result) return;
  let tagExp = result.data;
  const closeIndex = result.index;
  const separatorIndex = tagExp.search(/\s/);
  let tagName = tagExp;
  let attrExpPresent = true;
  if (separatorIndex !== -1) {//separate tag name and attributes expression
    tagName = tagExp.substring(0, separatorIndex);
    tagExp = tagExp.substring(separatorIndex + 1).trimStart();
  }

  const rawTagName = tagName;
  if (removeNSPrefix) {
    const colonIndex = tagName.indexOf(":");
    if (colonIndex !== -1) {
      tagName = tagName.substr(colonIndex + 1);
      attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
    }
  }

  return {
    tagName: tagName,
    tagExp: tagExp,
    closeIndex: closeIndex,
    attrExpPresent: attrExpPresent,
    rawTagName: rawTagName,
  }
}
/**
 * find paired tag for a stop node
 * @param {string} xmlData 
 * @param {string} tagName 
 * @param {number} i 
 */
function readStopNodeData(xmlData, tagName, i) {
  const startIndex = i;
  // Starting at 1 since we already have an open tag
  let openTagCount = 1;

  for (; i < xmlData.length; i++) {
    if (xmlData[i] === "<") {
      if (xmlData[i + 1] === "/") {//close tag
        const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
        let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
        if (closeTagName === tagName) {
          openTagCount--;
          if (openTagCount === 0) {
            return {
              tagContent: xmlData.substring(startIndex, i),
              i: closeIndex
            }
          }
        }
        i = closeIndex;
      } else if (xmlData[i + 1] === '?') {
        const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.")
        i = closeIndex;
      } else if (xmlData.substr(i + 1, 3) === '!--') {
        const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.")
        i = closeIndex;
      } else if (xmlData.substr(i + 1, 2) === '![') {
        const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
        i = closeIndex;
      } else {
        const tagData = readTagExp(xmlData, i, '>')

        if (tagData) {
          const openTagName = tagData && tagData.tagName;
          if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
            openTagCount++;
          }
          i = tagData.closeIndex;
        }
      }
    }
  }//end for loop
}

function parseValue(val, shouldParse, options) {
  if (shouldParse && typeof val === 'string') {
    //console.log(options)
    const newval = val.trim();
    if (newval === 'true') return true;
    else if (newval === 'false') return false;
    else return (0,strnum__WEBPACK_IMPORTED_MODULE_3__["default"])(val, options);
  } else {
    if ((0,_util_js__WEBPACK_IMPORTED_MODULE_0__.isExist)(val)) {
      return val;
    } else {
      return '';
    }
  }
}

function fromCodePoint(str, base, prefix) {
  const codePoint = Number.parseInt(str, base);

  if (codePoint >= 0 && codePoint <= 0x10FFFF) {
    return String.fromCodePoint(codePoint);
  } else {
    return prefix + str + ";";
  }
}

/***/ },

/***/ 462
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ XMLParser)
/* harmony export */ });
/* harmony import */ var _OptionsBuilder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(463);
/* harmony import */ var _OrderedObjParser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(464);
/* harmony import */ var _node2json_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(470);
/* harmony import */ var _validator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(471);
/* harmony import */ var _xmlNode_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(466);






class XMLParser{
    
    constructor(options){
        this.externalEntities = {};
        this.options = (0,_OptionsBuilder_js__WEBPACK_IMPORTED_MODULE_0__.buildOptions)(options);
        
    }
    /**
     * Parse XML dats to JS object 
     * @param {string|Uint8Array} xmlData 
     * @param {boolean|Object} validationOption 
     */
    parse(xmlData,validationOption){
        if(typeof xmlData !== "string" && xmlData.toString){
            xmlData = xmlData.toString();
        }else if(typeof xmlData !== "string"){
            throw new Error("XML data is accepted in String or Bytes[] form.")
        }
        
        if( validationOption){
            if(validationOption === true) validationOption = {}; //validate with default options
            
            const result = (0,_validator_js__WEBPACK_IMPORTED_MODULE_3__.validate)(xmlData, validationOption);
            if (result !== true) {
              throw Error( `${result.err.msg}:${result.err.line}:${result.err.col}` )
            }
          }
        const orderedObjParser = new _OrderedObjParser_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.options);
        orderedObjParser.addExternalEntities(this.externalEntities);
        const orderedResult = orderedObjParser.parseXml(xmlData);
        if(this.options.preserveOrder || orderedResult === undefined) return orderedResult;
        else return (0,_node2json_js__WEBPACK_IMPORTED_MODULE_2__["default"])(orderedResult, this.options);
    }

    /**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */
    addEntity(key, value){
        if(value.indexOf("&") !== -1){
            throw new Error("Entity value can't have '&'")
        }else if(key.indexOf("&") !== -1 || key.indexOf(";") !== -1){
            throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'")
        }else if(value === "&"){
            throw new Error("An entity with value '&' is not permitted");
        }else{
            this.externalEntities[key] = value;
        }
    }

    /**
     * Returns a Symbol that can be used to access the metadata
     * property on a node.
     * 
     * If Symbol is not available in the environment, an ordinary property is used
     * and the name of the property is here returned.
     * 
     * The XMLMetaData property is only present when `captureMetaData`
     * is true in the options.
     */
    static getMetaDataSymbol() {
        return _xmlNode_js__WEBPACK_IMPORTED_MODULE_4__["default"].getMetaDataSymbol();
    }
}


/***/ },

/***/ 470
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ prettify)
/* harmony export */ });
/* harmony import */ var _xmlNode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(466);




const METADATA_SYMBOL = _xmlNode_js__WEBPACK_IMPORTED_MODULE_0__["default"].getMetaDataSymbol();

/**
 * 
 * @param {array} node 
 * @param {any} options 
 * @returns 
 */
function prettify(node, options){
  return compress( node, options);
}

/**
 * 
 * @param {array} arr 
 * @param {object} options 
 * @param {string} jPath 
 * @returns object
 */
function compress(arr, options, jPath){
  let text;
  const compressedObj = {};
  for (let i = 0; i < arr.length; i++) {
    const tagObj = arr[i];
    const property = propName(tagObj);
    let newJpath = "";
    if(jPath === undefined) newJpath = property;
    else newJpath = jPath + "." + property;

    if(property === options.textNodeName){
      if(text === undefined) text = tagObj[property];
      else text += "" + tagObj[property];
    }else if(property === undefined){
      continue;
    }else if(tagObj[property]){
      
      let val = compress(tagObj[property], options, newJpath);
      const isLeaf = isLeafTag(val, options);
      if (tagObj[METADATA_SYMBOL] !== undefined) {
        val[METADATA_SYMBOL] = tagObj[METADATA_SYMBOL]; // copy over metadata
      }

      if(tagObj[":@"]){
        assignAttributes( val, tagObj[":@"], newJpath, options);
      }else if(Object.keys(val).length === 1 && val[options.textNodeName] !== undefined && !options.alwaysCreateTextNode){
        val = val[options.textNodeName];
      }else if(Object.keys(val).length === 0){
        if(options.alwaysCreateTextNode) val[options.textNodeName] = "";
        else val = "";
      }

      if(compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
        if(!Array.isArray(compressedObj[property])) {
            compressedObj[property] = [ compressedObj[property] ];
        }
        compressedObj[property].push(val);
      }else{
        //TODO: if a node is not an array, then check if it should be an array
        //also determine if it is a leaf node
        if (options.isArray(property, newJpath, isLeaf )) {
          compressedObj[property] = [val];
        }else{
          compressedObj[property] = val;
        }
      }
    }
    
  }
  // if(text && text.length > 0) compressedObj[options.textNodeName] = text;
  if(typeof text === "string"){
    if(text.length > 0) compressedObj[options.textNodeName] = text;
  }else if(text !== undefined) compressedObj[options.textNodeName] = text;
  return compressedObj;
}

function propName(obj){
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(key !== ":@") return key;
  }
}

function assignAttributes(obj, attrMap, jpath, options){
  if (attrMap) {
    const keys = Object.keys(attrMap);
    const len = keys.length; //don't make it inline
    for (let i = 0; i < len; i++) {
      const atrrName = keys[i];
      if (options.isArray(atrrName, jpath + "." + atrrName, true, true)) {
        obj[atrrName] = [ attrMap[atrrName] ];
      } else {
        obj[atrrName] = attrMap[atrrName];
      }
    }
  }
}

function isLeafTag(obj, options){
  const { textNodeName } = options;
  const propCount = Object.keys(obj).length;
  
  if (propCount === 0) {
    return true;
  }

  if (
    propCount === 1 &&
    (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)
  ) {
    return true;
  }

  return false;
}


/***/ },

/***/ 466
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ XmlNode)
/* harmony export */ });


let METADATA_SYMBOL;

if (typeof Symbol !== "function") {
  METADATA_SYMBOL = "@@xmlMetadata";
} else {
  METADATA_SYMBOL = Symbol("XML Node Metadata");
}

class XmlNode{
  constructor(tagname) {
    this.tagname = tagname;
    this.child = []; //nested tags, text, cdata, comments in order
    this[":@"] = {}; //attributes map
  }
  add(key,val){
    // this.child.push( {name : key, val: val, isCdata: isCdata });
    if(key === "__proto__") key = "#__proto__";
    this.child.push( {[key]: val });
  }
  addChild(node, startIndex) {
    if(node.tagname === "__proto__") node.tagname = "#__proto__";
    if(node[":@"] && Object.keys(node[":@"]).length > 0){
      this.child.push( { [node.tagname]: node.child, [":@"]: node[":@"] });
    }else{
      this.child.push( { [node.tagname]: node.child });
    }
    // if requested, add the startIndex
    if (startIndex !== undefined) {
      // Note: for now we just overwrite the metadata. If we had more complex metadata,
      // we might need to do an object append here:  metadata = { ...metadata, startIndex }
      this.child[this.child.length - 1][METADATA_SYMBOL] = { startIndex };
    }
  }
  /** symbol used for metadata */
  static getMetaDataSymbol() {
    return METADATA_SYMBOL;
  }
}


/***/ },

/***/ 468
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toNumber)
/* harmony export */ });
const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
const numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
// const octRegex = /^0x[a-z0-9]+/;
// const binRegex = /0x[a-z0-9]+/;


const consider = {
    hex: true,
    // oct: false,
    leadingZeros: true,
    decimalPoint: "\.",
    eNotation: true,
    //skipLike: /regex/,
    infinity: "original", // "null", "infinity" (Infinity type), "string" ("Infinity" (the string literal))
};

function toNumber(str, options = {}) {
    options = Object.assign({}, consider, options);
    if (!str || typeof str !== "string") return str;

    let trimmedStr = str.trim();

    if (options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;
    else if (str === "0") return 0;
    else if (options.hex && hexRegex.test(trimmedStr)) {
        return parse_int(trimmedStr, 16);
        // }else if (options.oct && octRegex.test(str)) {
        //     return Number.parseInt(val, 8);
    } else if (!isFinite(trimmedStr)) { //Infinity
        return handleInfinity(str, Number(trimmedStr), options);
    } else if (trimmedStr.includes('e') || trimmedStr.includes('E')) { //eNotation
        return resolveEnotation(str, trimmedStr, options);
        // }else if (options.parseBin && binRegex.test(str)) {
        //     return Number.parseInt(val, 2);
    } else {
        //separate negative sign, leading zeros, and rest number
        const match = numRegex.exec(trimmedStr);
        // +00.123 => [ , '+', '00', '.123', ..
        if (match) {
            const sign = match[1] || "";
            const leadingZeros = match[2];
            let numTrimmedByZeros = trimZeros(match[3]); //complete num without leading zeros
            const decimalAdjacentToLeadingZeros = sign ? // 0., -00., 000.
                str[leadingZeros.length + 1] === "."
                : str[leadingZeros.length] === ".";

            //trim ending zeros for floating number
            if (!options.leadingZeros //leading zeros are not allowed
                && (leadingZeros.length > 1
                    || (leadingZeros.length === 1 && !decimalAdjacentToLeadingZeros))) {
                // 00, 00.3, +03.24, 03, 03.24
                return str;
            }
            else {//no leading zeros or leading zeros are allowed
                const num = Number(trimmedStr);
                const parsedStr = String(num);

                if (num === 0) return num;
                if (parsedStr.search(/[eE]/) !== -1) { //given number is long and parsed to eNotation
                    if (options.eNotation) return num;
                    else return str;
                } else if (trimmedStr.indexOf(".") !== -1) { //floating number
                    if (parsedStr === "0") return num; //0.0
                    else if (parsedStr === numTrimmedByZeros) return num; //0.456. 0.79000
                    else if (parsedStr === `${sign}${numTrimmedByZeros}`) return num;
                    else return str;
                }

                let n = leadingZeros ? numTrimmedByZeros : trimmedStr;
                if (leadingZeros) {
                    // -009 => -9
                    return (n === parsedStr) || (sign + n === parsedStr) ? num : str
                } else {
                    // +9
                    return (n === parsedStr) || (n === sign + parsedStr) ? num : str
                }
            }
        } else { //non-numeric string
            return str;
        }
    }
}

const eNotationRegx = /^([-+])?(0*)(\d*(\.\d*)?[eE][-\+]?\d+)$/;
function resolveEnotation(str, trimmedStr, options) {
    if (!options.eNotation) return str;
    const notation = trimmedStr.match(eNotationRegx);
    if (notation) {
        let sign = notation[1] || "";
        const eChar = notation[3].indexOf("e") === -1 ? "E" : "e";
        const leadingZeros = notation[2];
        const eAdjacentToLeadingZeros = sign ? // 0E.
            str[leadingZeros.length + 1] === eChar
            : str[leadingZeros.length] === eChar;

        if (leadingZeros.length > 1 && eAdjacentToLeadingZeros) return str;
        else if (leadingZeros.length === 1
            && (notation[3].startsWith(`.${eChar}`) || notation[3][0] === eChar)) {
            return Number(trimmedStr);
        } else if (options.leadingZeros && !eAdjacentToLeadingZeros) { //accept with leading zeros
            //remove leading 0s
            trimmedStr = (notation[1] || "") + notation[3];
            return Number(trimmedStr);
        } else return str;
    } else {
        return str;
    }
}

/**
 * 
 * @param {string} numStr without leading zeros
 * @returns 
 */
function trimZeros(numStr) {
    if (numStr && numStr.indexOf(".") !== -1) {//float
        numStr = numStr.replace(/0+$/, ""); //remove ending zeros
        if (numStr === ".") numStr = "0";
        else if (numStr[0] === ".") numStr = "0" + numStr;
        else if (numStr[numStr.length - 1] === ".") numStr = numStr.substring(0, numStr.length - 1);
        return numStr;
    }
    return numStr;
}

function parse_int(numStr, base) {
    //polyfill
    if (parseInt) return parseInt(numStr, base);
    else if (Number.parseInt) return Number.parseInt(numStr, base);
    else if (window && window.parseInt) return window.parseInt(numStr, base);
    else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")
}

/**
 * Handle infinite values based on user option
 * @param {string} str - original input string
 * @param {number} num - parsed number (Infinity or -Infinity)
 * @param {object} options - user options
 * @returns {string|number|null} based on infinity option
 */
function handleInfinity(str, num, options) {
    const isPositive = num === Infinity;

    switch (options.infinity.toLowerCase()) {
        case "null":
            return null;
        case "infinity":
            return num; // Return Infinity or -Infinity
        case "string":
            return isPositive ? "Infinity" : "-Infinity";
        case "original":
        default:
            return str; // Return original string like "1e1000"
    }
}

/***/ },

/***/ 422
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"name":"@aws-sdk/nested-clients","version":"3.996.3","description":"Nested clients for AWS SDK packages.","main":"./dist-cjs/index.js","module":"./dist-es/index.js","types":"./dist-types/index.d.ts","scripts":{"build":"yarn lint && concurrently \'yarn:build:types\' \'yarn:build:es\' && yarn build:cjs","build:cjs":"node ../../scripts/compilation/inline nested-clients","build:es":"tsc -p tsconfig.es.json","build:include:deps":"yarn g:turbo run build -F=\\"$npm_package_name\\"","build:types":"tsc -p tsconfig.types.json","build:types:downlevel":"downlevel-dts dist-types dist-types/ts3.4","clean":"premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo","lint":"node ../../scripts/validation/submodules-linter.js --pkg nested-clients","test":"yarn g:vitest run","test:watch":"yarn g:vitest watch"},"engines":{"node":">=20.0.0"},"sideEffects":false,"author":{"name":"AWS SDK for JavaScript Team","url":"https://aws.amazon.com/javascript/"},"license":"Apache-2.0","dependencies":{"@aws-crypto/sha256-browser":"5.2.0","@aws-crypto/sha256-js":"5.2.0","@aws-sdk/core":"^3.973.15","@aws-sdk/middleware-host-header":"^3.972.6","@aws-sdk/middleware-logger":"^3.972.6","@aws-sdk/middleware-recursion-detection":"^3.972.6","@aws-sdk/middleware-user-agent":"^3.972.15","@aws-sdk/region-config-resolver":"^3.972.6","@aws-sdk/types":"^3.973.4","@aws-sdk/util-endpoints":"^3.996.3","@aws-sdk/util-user-agent-browser":"^3.972.6","@aws-sdk/util-user-agent-node":"^3.973.0","@smithy/config-resolver":"^4.4.9","@smithy/core":"^3.23.6","@smithy/fetch-http-handler":"^5.3.11","@smithy/hash-node":"^4.2.10","@smithy/invalid-dependency":"^4.2.10","@smithy/middleware-content-length":"^4.2.10","@smithy/middleware-endpoint":"^4.4.20","@smithy/middleware-retry":"^4.4.37","@smithy/middleware-serde":"^4.2.11","@smithy/middleware-stack":"^4.2.10","@smithy/node-config-provider":"^4.3.10","@smithy/node-http-handler":"^4.4.12","@smithy/protocol-http":"^5.3.10","@smithy/smithy-client":"^4.12.0","@smithy/types":"^4.13.0","@smithy/url-parser":"^4.2.10","@smithy/util-base64":"^4.3.1","@smithy/util-body-length-browser":"^4.2.1","@smithy/util-body-length-node":"^4.2.2","@smithy/util-defaults-mode-browser":"^4.3.36","@smithy/util-defaults-mode-node":"^4.2.39","@smithy/util-endpoints":"^3.3.1","@smithy/util-middleware":"^4.2.10","@smithy/util-retry":"^4.2.10","@smithy/util-utf8":"^4.2.1","tslib":"^2.6.2"},"devDependencies":{"concurrently":"7.0.0","downlevel-dts":"0.10.1","premove":"4.0.0","typescript":"~5.8.3"},"typesVersions":{"<4.0":{"dist-types/*":["dist-types/ts3.4/*"]}},"files":["./cognito-identity.d.ts","./cognito-identity.js","./signin.d.ts","./signin.js","./sso-oidc.d.ts","./sso-oidc.js","./sso.d.ts","./sso.js","./sts.d.ts","./sts.js","dist-*/**"],"browser":{"./dist-es/submodules/signin/runtimeConfig":"./dist-es/submodules/signin/runtimeConfig.browser","./dist-es/submodules/sso-oidc/runtimeConfig":"./dist-es/submodules/sso-oidc/runtimeConfig.browser","./dist-es/submodules/sts/runtimeConfig":"./dist-es/submodules/sts/runtimeConfig.browser"},"react-native":{},"homepage":"https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients","repository":{"type":"git","url":"https://github.com/aws/aws-sdk-js-v3.git","directory":"packages/nested-clients"},"exports":{"./package.json":"./package.json","./sso-oidc":{"types":"./dist-types/submodules/sso-oidc/index.d.ts","module":"./dist-es/submodules/sso-oidc/index.js","node":"./dist-cjs/submodules/sso-oidc/index.js","import":"./dist-es/submodules/sso-oidc/index.js","require":"./dist-cjs/submodules/sso-oidc/index.js"},"./sts":{"types":"./dist-types/submodules/sts/index.d.ts","module":"./dist-es/submodules/sts/index.js","node":"./dist-cjs/submodules/sts/index.js","import":"./dist-es/submodules/sts/index.js","require":"./dist-cjs/submodules/sts/index.js"},"./signin":{"types":"./dist-types/submodules/signin/index.d.ts","module":"./dist-es/submodules/signin/index.js","node":"./dist-cjs/submodules/signin/index.js","import":"./dist-es/submodules/signin/index.js","require":"./dist-cjs/submodules/signin/index.js"},"./cognito-identity":{"types":"./dist-types/submodules/cognito-identity/index.d.ts","module":"./dist-es/submodules/cognito-identity/index.js","node":"./dist-cjs/submodules/cognito-identity/index.js","import":"./dist-es/submodules/cognito-identity/index.js","require":"./dist-cjs/submodules/cognito-identity/index.js"},"./sso":{"types":"./dist-types/submodules/sso/index.d.ts","module":"./dist-es/submodules/sso/index.js","node":"./dist-cjs/submodules/sso/index.js","import":"./dist-es/submodules/sso/index.js","require":"./dist-cjs/submodules/sso/index.js"}}}');

/***/ }

};
;
//# sourceMappingURL=10.extension.js.map