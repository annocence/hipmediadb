import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Musikepoche } from './musikepoche.model';
import { MusikepocheService } from './musikepoche.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-musikepoche',
    templateUrl: './musikepoche.component.html'
})
export class MusikepocheComponent implements OnInit, OnDestroy {
musikepoches: Musikepoche[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private musikepocheService: MusikepocheService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.musikepocheService.query().subscribe(
            (res: ResponseWrapper) => {
                this.musikepoches = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMusikepoches();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Musikepoche) {
        return item.id;
    }
    registerChangeInMusikepoches() {
        this.eventSubscriber = this.eventManager.subscribe('musikepocheListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
