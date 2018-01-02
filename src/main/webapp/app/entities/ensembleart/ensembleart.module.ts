import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    EnsembleartService,
    EnsembleartPopupService,
    EnsembleartComponent,
    EnsembleartDetailComponent,
    EnsembleartDialogComponent,
    EnsembleartPopupComponent,
    EnsembleartDeletePopupComponent,
    EnsembleartDeleteDialogComponent,
    ensembleartRoute,
    ensembleartPopupRoute,
} from './';

const ENTITY_STATES = [
    ...ensembleartRoute,
    ...ensembleartPopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnsembleartComponent,
        EnsembleartDetailComponent,
        EnsembleartDialogComponent,
        EnsembleartDeleteDialogComponent,
        EnsembleartPopupComponent,
        EnsembleartDeletePopupComponent,
    ],
    entryComponents: [
        EnsembleartComponent,
        EnsembleartDialogComponent,
        EnsembleartPopupComponent,
        EnsembleartDeleteDialogComponent,
        EnsembleartDeletePopupComponent,
    ],
    providers: [
        EnsembleartService,
        EnsembleartPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbEnsembleartModule {}
