import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    MediumtypService,
    MediumtypPopupService,
    MediumtypComponent,
    MediumtypDetailComponent,
    MediumtypDialogComponent,
    MediumtypPopupComponent,
    MediumtypDeletePopupComponent,
    MediumtypDeleteDialogComponent,
    mediumtypRoute,
    mediumtypPopupRoute,
} from './';

const ENTITY_STATES = [
    ...mediumtypRoute,
    ...mediumtypPopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MediumtypComponent,
        MediumtypDetailComponent,
        MediumtypDialogComponent,
        MediumtypDeleteDialogComponent,
        MediumtypPopupComponent,
        MediumtypDeletePopupComponent,
    ],
    entryComponents: [
        MediumtypComponent,
        MediumtypDialogComponent,
        MediumtypPopupComponent,
        MediumtypDeleteDialogComponent,
        MediumtypDeletePopupComponent,
    ],
    providers: [
        MediumtypService,
        MediumtypPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbMediumtypModule {}
