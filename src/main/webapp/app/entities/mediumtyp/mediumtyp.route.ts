import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MediumtypComponent } from './mediumtyp.component';
import { MediumtypDetailComponent } from './mediumtyp-detail.component';
import { MediumtypPopupComponent } from './mediumtyp-dialog.component';
import { MediumtypDeletePopupComponent } from './mediumtyp-delete-dialog.component';

export const mediumtypRoute: Routes = [
    {
        path: 'mediumtyp',
        component: MediumtypComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.mediumtyp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'mediumtyp/:id',
        component: MediumtypDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.mediumtyp.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mediumtypPopupRoute: Routes = [
    {
        path: 'mediumtyp-new',
        component: MediumtypPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.mediumtyp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mediumtyp/:id/edit',
        component: MediumtypPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.mediumtyp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'mediumtyp/:id/delete',
        component: MediumtypDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.mediumtyp.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
