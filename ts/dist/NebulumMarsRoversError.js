"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NebulumMarsRoversError = void 0;
class NebulumMarsRoversError extends Error {
    isNebulumMarsRoversError = true;
    sdk = 'NebulumMarsRovers';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.NebulumMarsRoversError = NebulumMarsRoversError;
//# sourceMappingURL=NebulumMarsRoversError.js.map