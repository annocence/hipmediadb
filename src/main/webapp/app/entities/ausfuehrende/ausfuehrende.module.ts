import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    AusfuehrendeService,
    AusfuehrendePopupService,
    AusfuehrendeComponent,
    AusfuehrendeDetailComponent,
    AusfuehrendeDialogComponent,
    AusfuehrendePopupComponent,
    AusfuehrendeDeletePopupComponent,
    AusfuehrendeDeleteDialogComponent,
    ausfuehrendeRoute,
    ausfuehrendePopupRoute,
} from './';

const ENTITY_STATES = [
    ...ausfuehrendeRoute,
    ...ausfuehrendePopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AusfuehrendeComponent,
        AusfuehrendeDetailComponent,
        AusfuehrendeDialogComponent,
        AusfuehrendeDeleteDialogComponent,
        AusfuehrendePopupComponent,
        AusfuehrendeDeletePopupComponent,
    ],
    entryComponents: [
        AusfuehrendeComponent,
        AusfuehrendeDialogComponent,
        AusfuehrendePopupComponent,
        AusfuehrendeDeleteDialogComponent,
        AusfuehrendeDeletePopupComponent,
    ],
    providers: [
        AusfuehrendeService,
        AusfuehrendePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbAusfuehrendeModule {}
