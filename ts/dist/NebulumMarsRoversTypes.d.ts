export interface Photo {
    camera?: Record<string, any>;
    earth_date?: string;
    id?: number;
    img_src?: string;
    rover?: Record<string, any>;
    sol?: number;
}
export interface PhotoLoadMatch {
    id: number;
}
export interface PhotoListMatch {
    earth_date?: string;
    sol?: number;
}
