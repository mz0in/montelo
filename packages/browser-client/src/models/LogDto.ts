/* tslint:disable */
/* eslint-disable */
/**
 * Montelo
 * Documentation for the Montelo API.
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface LogDto
 */
export interface LogDto {
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    traceId: string;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    envId: string;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    parentLogId: string | null;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    model: string | null;
    /**
     * 
     * @type {object}
     * @memberof LogDto
     */
    input: object;
    /**
     * 
     * @type {object}
     * @memberof LogDto
     */
    output: object;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    startTime: string | null;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    endTime: string | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    duration: number | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    inputTokens: number | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    outputTokens: number | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    totalTokens: number | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    inputCost: number | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    outputCost: number | null;
    /**
     * 
     * @type {number}
     * @memberof LogDto
     */
    totalCost: number | null;
    /**
     * 
     * @type {object}
     * @memberof LogDto
     */
    extra: object;
    /**
     * 
     * @type {string}
     * @memberof LogDto
     */
    createdAt: string;
}

/**
 * Check if a given object implements the LogDto interface.
 */
export function instanceOfLogDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "traceId" in value;
    isInstance = isInstance && "envId" in value;
    isInstance = isInstance && "parentLogId" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "model" in value;
    isInstance = isInstance && "input" in value;
    isInstance = isInstance && "output" in value;
    isInstance = isInstance && "startTime" in value;
    isInstance = isInstance && "endTime" in value;
    isInstance = isInstance && "duration" in value;
    isInstance = isInstance && "inputTokens" in value;
    isInstance = isInstance && "outputTokens" in value;
    isInstance = isInstance && "totalTokens" in value;
    isInstance = isInstance && "inputCost" in value;
    isInstance = isInstance && "outputCost" in value;
    isInstance = isInstance && "totalCost" in value;
    isInstance = isInstance && "extra" in value;
    isInstance = isInstance && "createdAt" in value;

    return isInstance;
}

export function LogDtoFromJSON(json: any): LogDto {
    return LogDtoFromJSONTyped(json, false);
}

export function LogDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): LogDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'traceId': json['traceId'],
        'envId': json['envId'],
        'parentLogId': json['parentLogId'],
        'name': json['name'],
        'model': json['model'],
        'input': json['input'],
        'output': json['output'],
        'startTime': json['startTime'],
        'endTime': json['endTime'],
        'duration': json['duration'],
        'inputTokens': json['inputTokens'],
        'outputTokens': json['outputTokens'],
        'totalTokens': json['totalTokens'],
        'inputCost': json['inputCost'],
        'outputCost': json['outputCost'],
        'totalCost': json['totalCost'],
        'extra': json['extra'],
        'createdAt': json['createdAt'],
    };
}

export function LogDtoToJSON(value?: LogDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'traceId': value.traceId,
        'envId': value.envId,
        'parentLogId': value.parentLogId,
        'name': value.name,
        'model': value.model,
        'input': value.input,
        'output': value.output,
        'startTime': value.startTime,
        'endTime': value.endTime,
        'duration': value.duration,
        'inputTokens': value.inputTokens,
        'outputTokens': value.outputTokens,
        'totalTokens': value.totalTokens,
        'inputCost': value.inputCost,
        'outputCost': value.outputCost,
        'totalCost': value.totalCost,
        'extra': value.extra,
        'createdAt': value.createdAt,
    };
}

