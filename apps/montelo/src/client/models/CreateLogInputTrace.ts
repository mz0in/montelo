/* tslint:disable */
/* eslint-disable */
/**
 * Montelo Log Server
 * This server handles creating traces and logs.
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
 * @interface CreateLogInputTrace
 */
export interface CreateLogInputTrace {
    /**
     * 
     * @type {string}
     * @memberof CreateLogInputTrace
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLogInputTrace
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLogInputTrace
     */
    userId: string | null;
    /**
     * 
     * @type {object}
     * @memberof CreateLogInputTrace
     */
    extra: object | null;
}

/**
 * Check if a given object implements the CreateLogInputTrace interface.
 */
export function instanceOfCreateLogInputTrace(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "userId" in value;
    isInstance = isInstance && "extra" in value;

    return isInstance;
}

export function CreateLogInputTraceFromJSON(json: any): CreateLogInputTrace {
    return CreateLogInputTraceFromJSONTyped(json, false);
}

export function CreateLogInputTraceFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateLogInputTrace {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'userId': json['userId'],
        'extra': json['extra'],
    };
}

export function CreateLogInputTraceToJSON(value?: CreateLogInputTrace | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'userId': value.userId,
        'extra': value.extra,
    };
}

