import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Aufnahme } from './aufnahme.model';
import { AufnahmeService } from './aufnahme.service';

@Component({
    selector: 'jhi-aufnahme-detail',
    templateUrl: './aufnahme-detail.component.html'
})
export class AufnahmeDetailComponent implements OnInit, OnDestroy {

    aufnahme: Aufnahme;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private aufnahmeService: AufnahmeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAufnahmes();
    }

    load(id) {
        this.aufnahmeService.find(id).subscribe((aufnahme) => {
            this.aufnahme = aufnahme;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAufnahmes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'aufnahmeListModification',
            (response) => this.load(this.aufnahme.id)
        );
    }
}
