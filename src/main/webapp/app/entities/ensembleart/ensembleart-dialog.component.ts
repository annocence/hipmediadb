import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ensembleart } from './ensembleart.model';
import { EnsembleartPopupService } from './ensembleart-popup.service';
import { EnsembleartService } from './ensembleart.service';

@Component({
    selector: 'jhi-ensembleart-dialog',
    templateUrl: './ensembleart-dialog.component.html'
})
export class EnsembleartDialogComponent implements OnInit {

    ensembleart: Ensembleart;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ensembleartService: EnsembleartService,
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
        if (this.ensembleart.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ensembleartService.update(this.ensembleart));
        } else {
            this.subscribeToSaveResponse(
                this.ensembleartService.create(this.ensembleart));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ensembleart>) {
        result.subscribe((res: Ensembleart) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ensembleart) {
        this.eventManager.broadcast({ name: 'ensembleartListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ensembleart-popup',
    template: ''
})
export class EnsembleartPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ensembleartPopupService: EnsembleartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ensembleartPopupService
                    .open(EnsembleartDialogComponent as Component, params['id']);
            } else {
                this.ensembleartPopupService
                    .open(EnsembleartDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
