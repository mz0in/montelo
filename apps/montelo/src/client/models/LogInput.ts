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
 * @interface LogInput
 */
export interface LogInput {
    /**
     * 
     * @type {string}
     * @memberof LogInput
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof LogInput
     */
    model: string;
    /**
     * 
     * @type {object}
     * @memberof LogInput
     */
    input: object;
    /**
     * 
     * @type {object}
     * @memberof LogInput
     */
    output: object;
    /**
     * 
     * @type {string}
     * @memberof LogInput
     */
    startTime: string;
    /**
     * 
     * @type {string}
     * @memberof LogInput
     */
    endTime: string;
    /**
     * 
     * @type {number}
     * @memberof LogInput
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof LogInput
     */
    inputTokens: number;
    /**
     * 
     * @type {number}
     * @memberof LogInput
     */
    outputTokens: number;
    /**
     * 
     * @type {number}
     * @memberof LogInput
     */
    totalTokens: number;
    /**
     * 
     * @type {object}
     * @memberof LogInput
     */
    extra: object;
}

/**
 * Check if a given object implements the LogInput interface.
 */
export function instanceOfLogInput(value: object): boolean {
    let isInstance = true;
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
    isInstance = isInstance && "extra" in value;

    return isInstance;
}

export function LogInputFromJSON(json: any): LogInput {
    return LogInputFromJSONTyped(json, false);
}

export function LogInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): LogInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
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
        'extra': json['extra'],
    };
}

export function LogInputToJSON(value?: LogInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
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
        'extra': value.extra,
    };
}

