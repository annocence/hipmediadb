import { Mediumtyp } from '../mediumtyp';
import { BaseEntity } from './../../shared';

export class Medium implements BaseEntity {
    constructor(
        public id?: number,
        public signatur?: string,
        public typ?: Mediumtyp,
    ) {
    }
}
