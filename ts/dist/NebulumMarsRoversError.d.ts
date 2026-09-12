import { Context } from './Context';
declare class NebulumMarsRoversError extends Error {
    isNebulumMarsRoversError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { NebulumMarsRoversError };
