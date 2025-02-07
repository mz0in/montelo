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
import type { EnvironmentDto } from './EnvironmentDto';
import {
    EnvironmentDtoFromJSON,
    EnvironmentDtoFromJSONTyped,
    EnvironmentDtoToJSON,
} from './EnvironmentDto';

/**
 * 
 * @export
 * @interface ProjectWithEnvironmentsDto
 */
export interface ProjectWithEnvironmentsDto {
    /**
     * 
     * @type {string}
     * @memberof ProjectWithEnvironmentsDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectWithEnvironmentsDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof ProjectWithEnvironmentsDto
     */
    teamId: string;
    /**
     * 
     * @type {Array<EnvironmentDto>}
     * @memberof ProjectWithEnvironmentsDto
     */
    environments: Array<EnvironmentDto>;
}

/**
 * Check if a given object implements the ProjectWithEnvironmentsDto interface.
 */
export function instanceOfProjectWithEnvironmentsDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "teamId" in value;
    isInstance = isInstance && "environments" in value;

    return isInstance;
}

export function ProjectWithEnvironmentsDtoFromJSON(json: any): ProjectWithEnvironmentsDto {
    return ProjectWithEnvironmentsDtoFromJSONTyped(json, false);
}

export function ProjectWithEnvironmentsDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProjectWithEnvironmentsDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'teamId': json['teamId'],
        'environments': ((json['environments'] as Array<any>).map(EnvironmentDtoFromJSON)),
    };
}

export function ProjectWithEnvironmentsDtoToJSON(value?: ProjectWithEnvironmentsDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'teamId': value.teamId,
        'environments': ((value.environments as Array<any>).map(EnvironmentDtoToJSON)),
    };
}

