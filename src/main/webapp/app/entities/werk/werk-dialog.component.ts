import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Werk } from './werk.model';
import { WerkPopupService } from './werk-popup.service';
import { WerkService } from './werk.service';
import { Person, PersonService } from '../person';
import { Musikepoche, MusikepocheService } from '../musikepoche';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-werk-dialog',
    templateUrl: './werk-dialog.component.html'
})
export class WerkDialogComponent implements OnInit {

    werk: Werk;
    isSaving: boolean;

    people: Person[];

    musikepoches: Musikepoche[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private werkService: WerkService,
        private personService: PersonService,
        private musikepocheService: MusikepocheService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personService.query()
            .subscribe((res: ResponseWrapper) => { this.people = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.musikepocheService.query()
            .subscribe((res: ResponseWrapper) => { this.musikepoches = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.werk.id !== undefined) {
            this.subscribeToSaveResponse(
                this.werkService.update(this.werk));
        } else {
            this.subscribeToSaveResponse(
                this.werkService.create(this.werk));
        }
    }

    private subscribeToSaveResponse(result: Observable<Werk>) {
        result.subscribe((res: Werk) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Werk) {
        this.eventManager.broadcast({ name: 'werkListModification', content: 'OK'});
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

    trackMusikepocheById(index: number, item: Musikepoche) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-werk-popup',
    template: ''
})
export class WerkPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private werkPopupService: WerkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.werkPopupService
                    .open(WerkDialogComponent as Component, params['id']);
            } else {
                this.werkPopupService
                    .open(WerkDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
