import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Musikepoche } from './musikepoche.model';
import { MusikepochePopupService } from './musikepoche-popup.service';
import { MusikepocheService } from './musikepoche.service';

@Component({
    selector: 'jhi-musikepoche-dialog',
    templateUrl: './musikepoche-dialog.component.html'
})
export class MusikepocheDialogComponent implements OnInit {

    musikepoche: Musikepoche;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private musikepocheService: MusikepocheService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.musikepoche.id !== undefined) {
            this.subscribeToSaveResponse(
                this.musikepocheService.update(this.musikepoche));
        } else {
            this.subscribeToSaveResponse(
                this.musikepocheService.create(this.musikepoche));
        }
    }

    private subscribeToSaveResponse(result: Observable<Musikepoche>) {
        result.subscribe((res: Musikepoche) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Musikepoche) {
        this.eventManager.broadcast({ name: 'musikepocheListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-musikepoche-popup',
    template: ''
})
export class MusikepochePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private musikepochePopupService: MusikepochePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.musikepochePopupService
                    .open(MusikepocheDialogComponent as Component, params['id']);
            } else {
                this.musikepochePopupService
                    .open(MusikepocheDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
