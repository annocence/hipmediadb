import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Musikepoche } from './musikepoche.model';
import { MusikepochePopupService } from './musikepoche-popup.service';
import { MusikepocheService } from './musikepoche.service';

@Component({
    selector: 'jhi-musikepoche-delete-dialog',
    templateUrl: './musikepoche-delete-dialog.component.html'
})
export class MusikepocheDeleteDialogComponent {

    musikepoche: Musikepoche;

    constructor(
        private musikepocheService: MusikepocheService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.musikepocheService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'musikepocheListModification',
                content: 'Deleted an musikepoche'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-musikepoche-delete-popup',
    template: ''
})
export class MusikepocheDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private musikepochePopupService: MusikepochePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.musikepochePopupService
                .open(MusikepocheDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
