import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ausfuehrende } from './ausfuehrende.model';
import { AusfuehrendeService } from './ausfuehrende.service';

@Component({
    selector: 'jhi-ausfuehrende-detail',
    templateUrl: './ausfuehrende-detail.component.html'
})
export class AusfuehrendeDetailComponent implements OnInit, OnDestroy {

    ausfuehrende: Ausfuehrende;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ausfuehrendeService: AusfuehrendeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAusfuehrendes();
    }

    load(id) {
        this.ausfuehrendeService.find(id).subscribe((ausfuehrende) => {
            this.ausfuehrende = ausfuehrende;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAusfuehrendes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ausfuehrendeListModification',
            (response) => this.load(this.ausfuehrende.id)
        );
    }
}
