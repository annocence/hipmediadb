import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HipmediadbMediumtypModule } from './mediumtyp/mediumtyp.module';
import { HipmediadbMediumModule } from './medium/medium.module';
import { HipmediadbPersonModule } from './person/person.module';
import { HipmediadbMusikepocheModule } from './musikepoche/musikepoche.module';
import { HipmediadbEnsembleartModule } from './ensembleart/ensembleart.module';
import { HipmediadbAusfuehrendeModule } from './ausfuehrende/ausfuehrende.module';
import { HipmediadbAufnahmeModule } from './aufnahme/aufnahme.module';
import { HipmediadbWerkModule } from './werk/werk.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HipmediadbMediumtypModule,
        HipmediadbMediumModule,
        HipmediadbPersonModule,
        HipmediadbMusikepocheModule,
        HipmediadbEnsembleartModule,
        HipmediadbAusfuehrendeModule,
        HipmediadbAufnahmeModule,
        HipmediadbWerkModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbEntityModule {}
