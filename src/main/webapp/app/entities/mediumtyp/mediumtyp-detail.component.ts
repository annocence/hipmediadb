import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Mediumtyp } from './mediumtyp.model';
import { MediumtypService } from './mediumtyp.service';

@Component({
    selector: 'jhi-mediumtyp-detail',
    templateUrl: './mediumtyp-detail.component.html'
})
export class MediumtypDetailComponent implements OnInit, OnDestroy {

    mediumtyp: Mediumtyp;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mediumtypService: MediumtypService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMediumtyps();
    }

    load(id) {
        this.mediumtypService.find(id).subscribe((mediumtyp) => {
            this.mediumtyp = mediumtyp;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMediumtyps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mediumtypListModification',
            (response) => this.load(this.mediumtyp.id)
        );
    }
}
