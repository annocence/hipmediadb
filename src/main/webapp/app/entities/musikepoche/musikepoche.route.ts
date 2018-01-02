import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MusikepocheComponent } from './musikepoche.component';
import { MusikepocheDetailComponent } from './musikepoche-detail.component';
import { MusikepochePopupComponent } from './musikepoche-dialog.component';
import { MusikepocheDeletePopupComponent } from './musikepoche-delete-dialog.component';

export const musikepocheRoute: Routes = [
    {
        path: 'musikepoche',
        component: MusikepocheComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.musikepoche.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'musikepoche/:id',
        component: MusikepocheDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.musikepoche.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const musikepochePopupRoute: Routes = [
    {
        path: 'musikepoche-new',
        component: MusikepochePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.musikepoche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'musikepoche/:id/edit',
        component: MusikepochePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.musikepoche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'musikepoche/:id/delete',
        component: MusikepocheDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.musikepoche.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
