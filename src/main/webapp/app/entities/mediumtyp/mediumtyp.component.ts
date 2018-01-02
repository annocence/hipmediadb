import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Mediumtyp } from './mediumtyp.model';
import { MediumtypService } from './mediumtyp.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-mediumtyp',
    templateUrl: './mediumtyp.component.html'
})
export class MediumtypComponent implements OnInit, OnDestroy {
mediumtyps: Mediumtyp[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private mediumtypService: MediumtypService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.mediumtypService.query().subscribe(
            (res: ResponseWrapper) => {
                this.mediumtyps = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMediumtyps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Mediumtyp) {
        return item.id;
    }
    registerChangeInMediumtyps() {
        this.eventSubscriber = this.eventManager.subscribe('mediumtypListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
