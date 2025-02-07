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


import * as runtime from '../runtime';
import type {
  EnvironmentDto,
} from '../models/index';
import {
    EnvironmentDtoFromJSON,
    EnvironmentDtoToJSON,
} from '../models/index';

export interface EnvironmentControllerGetRequest {
    envId: string;
}

/**
 * 
 */
export class EnvironmentApi extends runtime.BaseAPI {

    /**
     */
    async environmentControllerGetRaw(requestParameters: EnvironmentControllerGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<EnvironmentDto>> {
        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling environmentControllerGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearer", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/env/{envId}`.replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => EnvironmentDtoFromJSON(jsonValue));
    }

    /**
     */
    async environmentControllerGet(requestParameters: EnvironmentControllerGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<EnvironmentDto> {
        const response = await this.environmentControllerGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
