import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ensembleart } from './ensembleart.model';
import { EnsembleartService } from './ensembleart.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ensembleart',
    templateUrl: './ensembleart.component.html'
})
export class EnsembleartComponent implements OnInit, OnDestroy {
ensemblearts: Ensembleart[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ensembleartService: EnsembleartService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ensembleartService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ensemblearts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEnsemblearts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ensembleart) {
        return item.id;
    }
    registerChangeInEnsemblearts() {
        this.eventSubscriber = this.eventManager.subscribe('ensembleartListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
