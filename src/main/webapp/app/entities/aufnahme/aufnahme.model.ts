import { Ausfuehrende } from '../ausfuehrende/ausfuehrende.model';
import { Werk } from '../werk/werk.model';
import { BaseEntity } from './../../shared';

export class Aufnahme implements BaseEntity {
    constructor(
        public id?: number,
        public titel?: string,
        public aufnahmeDatum?: any,
        public mitschnittDatum?: any,
        public dauer?: number,
        public startzeit?: number,
        public ausfuehrende?: Ausfuehrende,
        public medium?: BaseEntity,
        public werk?: Werk,
    ) {
    }
}
