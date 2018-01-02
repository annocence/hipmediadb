import { BaseEntity } from './../../shared';

export class Musikepoche implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
