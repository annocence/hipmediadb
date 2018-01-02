import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AusfuehrendeComponent } from './ausfuehrende.component';
import { AusfuehrendeDetailComponent } from './ausfuehrende-detail.component';
import { AusfuehrendePopupComponent } from './ausfuehrende-dialog.component';
import { AusfuehrendeDeletePopupComponent } from './ausfuehrende-delete-dialog.component';

export const ausfuehrendeRoute: Routes = [
    {
        path: 'ausfuehrende',
        component: AusfuehrendeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ausfuehrende.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ausfuehrende/:id',
        component: AusfuehrendeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ausfuehrende.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ausfuehrendePopupRoute: Routes = [
    {
        path: 'ausfuehrende-new',
        component: AusfuehrendePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ausfuehrende.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ausfuehrende/:id/edit',
        component: AusfuehrendePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ausfuehrende.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ausfuehrende/:id/delete',
        component: AusfuehrendeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ausfuehrende.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
