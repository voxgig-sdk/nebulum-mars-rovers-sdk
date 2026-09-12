import { NebulumMarsRoversEntityBase } from '../NebulumMarsRoversEntityBase';
import type { NebulumMarsRoversSDK } from '../NebulumMarsRoversSDK';
import type { Control } from '../types';
import type { Photo, PhotoLoadMatch, PhotoListMatch } from '../NebulumMarsRoversTypes';
declare class PhotoEntity extends NebulumMarsRoversEntityBase<Photo> {
    constructor(client: NebulumMarsRoversSDK, entopts: any);
    make(this: PhotoEntity): PhotoEntity;
    load(this: any, reqmatch?: PhotoLoadMatch, ctrl?: Control): Promise<PhotoEntity>;
    list(this: any, reqmatch?: PhotoListMatch, ctrl?: Control): Promise<PhotoEntity[]>;
}
export { PhotoEntity };
