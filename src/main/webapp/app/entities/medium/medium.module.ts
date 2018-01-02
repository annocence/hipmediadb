import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    MediumService,
    MediumPopupService,
    MediumComponent,
    MediumDetailComponent,
    MediumDialogComponent,
    MediumPopupComponent,
    MediumDeletePopupComponent,
    MediumDeleteDialogComponent,
    mediumRoute,
    mediumPopupRoute,
    MediumResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...mediumRoute,
    ...mediumPopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MediumComponent,
        MediumDetailComponent,
        MediumDialogComponent,
        MediumDeleteDialogComponent,
        MediumPopupComponent,
        MediumDeletePopupComponent,
    ],
    entryComponents: [
        MediumComponent,
        MediumDialogComponent,
        MediumPopupComponent,
        MediumDeleteDialogComponent,
        MediumDeletePopupComponent,
    ],
    providers: [
        MediumService,
        MediumPopupService,
        MediumResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbMediumModule {}
