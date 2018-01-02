import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    WerkService,
    WerkPopupService,
    WerkComponent,
    WerkDetailComponent,
    WerkDialogComponent,
    WerkPopupComponent,
    WerkDeletePopupComponent,
    WerkDeleteDialogComponent,
    werkRoute,
    werkPopupRoute,
} from './';

const ENTITY_STATES = [
    ...werkRoute,
    ...werkPopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WerkComponent,
        WerkDetailComponent,
        WerkDialogComponent,
        WerkDeleteDialogComponent,
        WerkPopupComponent,
        WerkDeletePopupComponent,
    ],
    entryComponents: [
        WerkComponent,
        WerkDialogComponent,
        WerkPopupComponent,
        WerkDeleteDialogComponent,
        WerkDeletePopupComponent,
    ],
    providers: [
        WerkService,
        WerkPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbWerkModule {}
