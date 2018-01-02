import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HipmediadbSharedModule } from '../../shared';
import {
    AufnahmeService,
    AufnahmePopupService,
    AufnahmeComponent,
    AufnahmeDetailComponent,
    AufnahmeDialogComponent,
    AufnahmePopupComponent,
    AufnahmeDeletePopupComponent,
    AufnahmeDeleteDialogComponent,
    aufnahmeRoute,
    aufnahmePopupRoute,
} from './';

const ENTITY_STATES = [
    ...aufnahmeRoute,
    ...aufnahmePopupRoute,
];

@NgModule({
    imports: [
        HipmediadbSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AufnahmeComponent,
        AufnahmeDetailComponent,
        AufnahmeDialogComponent,
        AufnahmeDeleteDialogComponent,
        AufnahmePopupComponent,
        AufnahmeDeletePopupComponent,
    ],
    entryComponents: [
        AufnahmeComponent,
        AufnahmeDialogComponent,
        AufnahmePopupComponent,
        AufnahmeDeleteDialogComponent,
        AufnahmeDeletePopupComponent,
    ],
    providers: [
        AufnahmeService,
        AufnahmePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HipmediadbAufnahmeModule {}
