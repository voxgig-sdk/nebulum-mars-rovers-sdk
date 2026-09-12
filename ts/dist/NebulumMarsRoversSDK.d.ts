import { PhotoEntity } from './entity/PhotoEntity';
export type * from './NebulumMarsRoversTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { NebulumMarsRoversEntityBase } from './NebulumMarsRoversEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class NebulumMarsRoversSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Photo(entopts?: Record<string, any>): PhotoEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): NebulumMarsRoversSDK;
    tester(testopts?: any, sdkopts?: any): NebulumMarsRoversSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof NebulumMarsRoversSDK;
export { stdutil, config, BaseFeature, NebulumMarsRoversEntityBase, NebulumMarsRoversSDK, SDK, };
