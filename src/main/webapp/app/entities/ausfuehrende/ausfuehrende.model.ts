import { Ensembleart } from '../ensembleart/ensembleart.model';
import { Person } from '../person/person.model';
import { BaseEntity } from './../../shared';

export class Ausfuehrende implements BaseEntity {
    constructor(
        public id?: number,
        public orchester?: string,
        public interpret?: Person,
        public dirigent?: Person,
        public ensembleart?: Ensembleart,
    ) {
    }
}
