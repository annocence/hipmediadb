import { Musikepoche } from '../musikepoche/musikepoche.model';
import { Person } from '../person/person.model';
import { BaseEntity } from './../../shared';

export class Werk implements BaseEntity {
    constructor(
        public id?: number,
        public titel?: string,
        public titelzusatz?: string,
        public zaehlinfo?: string,
        public gattung?: string,
        public urheber?: Person,
        public musikepoche?: Musikepoche,
    ) {
    }
}
