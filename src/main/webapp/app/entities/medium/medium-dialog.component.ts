import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Medium } from './medium.model';
import { MediumPopupService } from './medium-popup.service';
import { MediumService } from './medium.service';
import { Mediumtyp, MediumtypService } from '../mediumtyp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-medium-dialog',
    templateUrl: './medium-dialog.component.html'
})
export class MediumDialogComponent implements OnInit {

    medium: Medium;
    isSaving: boolean;

    mediumtyps: Mediumtyp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private mediumService: MediumService,
        private mediumtypService: MediumtypService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.mediumtypService.query()
            .subscribe((res: ResponseWrapper) => { this.mediumtyps = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.medium.id !== undefined) {
            this.subscribeToSaveResponse(
                this.mediumService.update(this.medium));
        } else {
            this.subscribeToSaveResponse(
                this.mediumService.create(this.medium));
        }
    }

    private subscribeToSaveResponse(result: Observable<Medium>) {
        result.subscribe((res: Medium) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Medium) {
        this.eventManager.broadcast({ name: 'mediumListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMediumtypById(index: number, item: Mediumtyp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-medium-popup',
    template: ''
})
export class MediumPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mediumPopupService: MediumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.mediumPopupService
                    .open(MediumDialogComponent as Component, params['id']);
            } else {
                this.mediumPopupService
                    .open(MediumDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
