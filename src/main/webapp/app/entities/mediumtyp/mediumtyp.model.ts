import { BaseEntity } from './../../shared';

export class Mediumtyp implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
