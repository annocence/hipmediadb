import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Werk } from './werk.model';
import { WerkService } from './werk.service';

@Component({
    selector: 'jhi-werk-detail',
    templateUrl: './werk-detail.component.html'
})
export class WerkDetailComponent implements OnInit, OnDestroy {

    werk: Werk;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private werkService: WerkService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInWerks();
    }

    load(id) {
        this.werkService.find(id).subscribe((werk) => {
            this.werk = werk;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWerks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'werkListModification',
            (response) => this.load(this.werk.id)
        );
    }
}
