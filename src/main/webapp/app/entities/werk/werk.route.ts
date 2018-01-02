import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WerkComponent } from './werk.component';
import { WerkDetailComponent } from './werk-detail.component';
import { WerkPopupComponent } from './werk-dialog.component';
import { WerkDeletePopupComponent } from './werk-delete-dialog.component';

export const werkRoute: Routes = [
    {
        path: 'werk',
        component: WerkComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.werk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'werk/:id',
        component: WerkDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.werk.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const werkPopupRoute: Routes = [
    {
        path: 'werk-new',
        component: WerkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.werk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'werk/:id/edit',
        component: WerkPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.werk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'werk/:id/delete',
        component: WerkDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.werk.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
