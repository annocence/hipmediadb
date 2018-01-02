import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aufnahme } from './aufnahme.model';
import { AufnahmePopupService } from './aufnahme-popup.service';
import { AufnahmeService } from './aufnahme.service';
import { Ausfuehrende, AusfuehrendeService } from '../ausfuehrende';
import { Medium, MediumService } from '../medium';
import { Werk, WerkService } from '../werk';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-aufnahme-dialog',
    templateUrl: './aufnahme-dialog.component.html'
})
export class AufnahmeDialogComponent implements OnInit {

    aufnahme: Aufnahme;
    isSaving: boolean;

    ausfuehrendes: Ausfuehrende[];

    mediums: Medium[];

    werks: Werk[];
    aufnahmeDatumDp: any;
    mitschnittDatumDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private aufnahmeService: AufnahmeService,
        private ausfuehrendeService: AusfuehrendeService,
        private mediumService: MediumService,
        private werkService: WerkService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ausfuehrendeService.query()
            .subscribe((res: ResponseWrapper) => { this.ausfuehrendes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.mediumService.query()
            .subscribe((res: ResponseWrapper) => { this.mediums = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.werkService.query()
            .subscribe((res: ResponseWrapper) => { this.werks = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.aufnahme.id !== undefined) {
            this.subscribeToSaveResponse(
                this.aufnahmeService.update(this.aufnahme));
        } else {
            this.subscribeToSaveResponse(
                this.aufnahmeService.create(this.aufnahme));
        }
    }

    private subscribeToSaveResponse(result: Observable<Aufnahme>) {
        result.subscribe((res: Aufnahme) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Aufnahme) {
        this.eventManager.broadcast({ name: 'aufnahmeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAusfuehrendeById(index: number, item: Ausfuehrende) {
        return item.id;
    }

    trackMediumById(index: number, item: Medium) {
        return item.id;
    }

    trackWerkById(index: number, item: Werk) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-aufnahme-popup',
    template: ''
})
export class AufnahmePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aufnahmePopupService: AufnahmePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.aufnahmePopupService
                    .open(AufnahmeDialogComponent as Component, params['id']);
            } else {
                this.aufnahmePopupService
                    .open(AufnahmeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
