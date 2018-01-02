import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ausfuehrende } from './ausfuehrende.model';
import { AusfuehrendeService } from './ausfuehrende.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ausfuehrende',
    templateUrl: './ausfuehrende.component.html'
})
export class AusfuehrendeComponent implements OnInit, OnDestroy {
ausfuehrendes: Ausfuehrende[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ausfuehrendeService: AusfuehrendeService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ausfuehrendeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ausfuehrendes = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAusfuehrendes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ausfuehrende) {
        return item.id;
    }
    registerChangeInAusfuehrendes() {
        this.eventSubscriber = this.eventManager.subscribe('ausfuehrendeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
