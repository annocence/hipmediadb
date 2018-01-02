import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AufnahmeComponent } from './aufnahme.component';
import { AufnahmeDetailComponent } from './aufnahme-detail.component';
import { AufnahmePopupComponent } from './aufnahme-dialog.component';
import { AufnahmeDeletePopupComponent } from './aufnahme-delete-dialog.component';

export const aufnahmeRoute: Routes = [
    {
        path: 'aufnahme',
        component: AufnahmeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.aufnahme.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aufnahme/:id',
        component: AufnahmeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.aufnahme.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aufnahmePopupRoute: Routes = [
    {
        path: 'aufnahme-new',
        component: AufnahmePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.aufnahme.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aufnahme/:id/edit',
        component: AufnahmePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.aufnahme.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aufnahme/:id/delete',
        component: AufnahmeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.aufnahme.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
