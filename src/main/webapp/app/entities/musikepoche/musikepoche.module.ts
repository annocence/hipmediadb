import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    MusikepocheService,
    MusikepochePopupService,
    MusikepocheComponent,
    MusikepocheDetailComponent,
    MusikepocheDialogComponent,
    MusikepochePopupComponent,
    MusikepocheDeletePopupComponent,
    MusikepocheDeleteDialogComponent,
    musikepocheRoute,
    musikepochePopupRoute,
} from './';

const ENTITY_STATES = [
    ...musikepocheRoute,
    ...musikepochePopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MusikepocheComponent,
        MusikepocheDetailComponent,
        MusikepocheDialogComponent,
        MusikepocheDeleteDialogComponent,
        MusikepochePopupComponent,
        MusikepocheDeletePopupComponent,
    ],
    entryComponents: [
        MusikepocheComponent,
        MusikepocheDialogComponent,
        MusikepochePopupComponent,
        MusikepocheDeleteDialogComponent,
        MusikepocheDeletePopupComponent,
    ],
    providers: [
        MusikepocheService,
        MusikepochePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbMusikepocheModule {}
