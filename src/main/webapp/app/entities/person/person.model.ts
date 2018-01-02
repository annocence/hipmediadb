import { BaseEntity } from '../../shared';
import { Musikepoche } from '../musikepoche';

export class Person implements BaseEntity {
    name: string;

    constructor(
        public id?: number,
        public nachname?: string,
        public vorname?: string,
        public pclass?: string,
        public lebensdaten?: string,
        public musikepoche?: Musikepoche,
    ) {
      this.name = nachname + ', ' + vorname;
      }

  getName() {
    return this.nachname + ', ' + this.vorname;
  }
}
