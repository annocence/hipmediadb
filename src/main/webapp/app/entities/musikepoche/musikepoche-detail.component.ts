import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Musikepoche } from './musikepoche.model';
import { MusikepocheService } from './musikepoche.service';

@Component({
    selector: 'jhi-musikepoche-detail',
    templateUrl: './musikepoche-detail.component.html'
})
export class MusikepocheDetailComponent implements OnInit, OnDestroy {

    musikepoche: Musikepoche;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private musikepocheService: MusikepocheService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMusikepoches();
    }

    load(id) {
        this.musikepocheService.find(id).subscribe((musikepoche) => {
            this.musikepoche = musikepoche;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMusikepoches() {
        this.eventSubscriber = this.eventManager.subscribe(
            'musikepocheListModification',
            (response) => this.load(this.musikepoche.id)
        );
    }
}
