import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Ensembleart } from './ensembleart.model';
import { EnsembleartService } from './ensembleart.service';

@Component({
    selector: 'jhi-ensembleart-detail',
    templateUrl: './ensembleart-detail.component.html'
})
export class EnsembleartDetailComponent implements OnInit, OnDestroy {

    ensembleart: Ensembleart;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ensembleartService: EnsembleartService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEnsemblearts();
    }

    load(id) {
        this.ensembleartService.find(id).subscribe((ensembleart) => {
            this.ensembleart = ensembleart;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEnsemblearts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ensembleartListModification',
            (response) => this.load(this.ensembleart.id)
        );
    }
}
