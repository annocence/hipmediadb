import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mediumtyp } from './mediumtyp.model';
import { MediumtypPopupService } from './mediumtyp-popup.service';
import { MediumtypService } from './mediumtyp.service';

@Component({
    selector: 'jhi-mediumtyp-dialog',
    templateUrl: './mediumtyp-dialog.component.html'
})
export class MediumtypDialogComponent implements OnInit {

    mediumtyp: Mediumtyp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private mediumtypService: MediumtypService,
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
        if (this.mediumtyp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mediumtypService.update(this.mediumtyp));
        } else {
            this.subscribeToSaveResponse(
                this.mediumtypService.create(this.mediumtyp));
        }
    }

    private subscribeToSaveResponse(result: Observable<Mediumtyp>) {
        result.subscribe((res: Mediumtyp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Mediumtyp) {
        this.eventManager.broadcast({ name: 'mediumtypListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-mediumtyp-popup',
    template: ''
})
export class MediumtypPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mediumtypPopupService: MediumtypPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mediumtypPopupService
                    .open(MediumtypDialogComponent as Component, params['id']);
            } else {
                this.mediumtypPopupService
                    .open(MediumtypDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
