import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Medium } from './medium.model';
import { MediumService } from './medium.service';

@Component({
    selector: 'jhi-medium-detail',
    templateUrl: './medium-detail.component.html'
})
export class MediumDetailComponent implements OnInit, OnDestroy {

    medium: Medium;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private mediumService: MediumService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMediums();
    }

    load(id) {
        this.mediumService.find(id).subscribe((medium) => {
            this.medium = medium;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMediums() {
        this.eventSubscriber = this.eventManager.subscribe(
            'mediumListModification',
            (response) => this.load(this.medium.id)
        );
    }
}
