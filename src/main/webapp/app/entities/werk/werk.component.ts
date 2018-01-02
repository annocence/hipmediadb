import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Werk } from './werk.model';
import { WerkService } from './werk.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-werk',
    templateUrl: './werk.component.html'
})
export class WerkComponent implements OnInit, OnDestroy {
werks: Werk[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private werkService: WerkService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.werkService.query().subscribe(
            (res: ResponseWrapper) => {
                this.werks = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWerks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Werk) {
        return item.id;
    }
    registerChangeInWerks() {
        this.eventSubscriber = this.eventManager.subscribe('werkListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
