import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MediumComponent } from './medium.component';
import { MediumDetailComponent } from './medium-detail.component';
import { MediumPopupComponent } from './medium-dialog.component';
import { MediumDeletePopupComponent } from './medium-delete-dialog.component';

@Injectable()
export class MediumResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const mediumRoute: Routes = [
    {
        path: 'medium',
        component: MediumComponent,
        resolve: {
            'pagingParams': MediumResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.medium.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'medium/:id',
        component: MediumDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.medium.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const mediumPopupRoute: Routes = [
    {
        path: 'medium-new',
        component: MediumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.medium.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medium/:id/edit',
        component: MediumPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.medium.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'medium/:id/delete',
        component: MediumDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'hipmediadbApp.medium.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
