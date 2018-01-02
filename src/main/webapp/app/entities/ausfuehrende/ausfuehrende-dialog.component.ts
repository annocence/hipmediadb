import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ausfuehrende } from './ausfuehrende.model';
import { AusfuehrendePopupService } from './ausfuehrende-popup.service';
import { AusfuehrendeService } from './ausfuehrende.service';
import { Person, PersonService } from '../person';
import { Ensembleart, EnsembleartService } from '../ensembleart';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ausfuehrende-dialog',
    templateUrl: './ausfuehrende-dialog.component.html'
})
export class AusfuehrendeDialogComponent implements OnInit {

    ausfuehrende: Ausfuehrende;
    isSaving: boolean;

    people: Person[];

    ensemblearts: Ensembleart[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ausfuehrendeService: AusfuehrendeService,
        private personService: PersonService,
        private ensembleartService: EnsembleartService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ensembleartService.query()
            .subscribe((res: ResponseWrapper) => { this.ensemblearts = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ausfuehrende.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ausfuehrendeService.update(this.ausfuehrende));
        } else {
            this.subscribeToSaveResponse(
                this.ausfuehrendeService.create(this.ausfuehrende));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ausfuehrende>) {
        result.subscribe((res: Ausfuehrende) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ausfuehrende) {
        this.eventManager.broadcast({ name: 'ausfuehrendeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonById(index: number, item: Person) {
        return item.id;
    }

    trackEnsembleartById(index: number, item: Ensembleart) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ausfuehrende-popup',
    template: ''
})
export class AusfuehrendePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ausfuehrendePopupService: AusfuehrendePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ausfuehrendePopupService
                    .open(AusfuehrendeDialogComponent as Component, params['id']);
            } else {
                this.ausfuehrendePopupService
                    .open(AusfuehrendeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
