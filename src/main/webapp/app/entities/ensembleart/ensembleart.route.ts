import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EnsembleartComponent } from './ensembleart.component';
import { EnsembleartDetailComponent } from './ensembleart-detail.component';
import { EnsembleartPopupComponent } from './ensembleart-dialog.component';
import { EnsembleartDeletePopupComponent } from './ensembleart-delete-dialog.component';

export const ensembleartRoute: Routes = [
    {
        path: 'ensembleart',
        component: EnsembleartComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ensembleart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ensembleart/:id',
        component: EnsembleartDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ensembleart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ensembleartPopupRoute: Routes = [
    {
        path: 'ensembleart-new',
        component: EnsembleartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ensembleart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ensembleart/:id/edit',
        component: EnsembleartPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ensembleart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ensembleart/:id/delete',
        component: EnsembleartDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.ensembleart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
