import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ausfuehrende } from './ausfuehrende.model';
import { AusfuehrendePopupService } from './ausfuehrende-popup.service';
import { AusfuehrendeService } from './ausfuehrende.service';

@Component({
    selector: 'jhi-ausfuehrende-delete-dialog',
    templateUrl: './ausfuehrende-delete-dialog.component.html'
})
export class AusfuehrendeDeleteDialogComponent {

    ausfuehrende: Ausfuehrende;

    constructor(
        private ausfuehrendeService: AusfuehrendeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ausfuehrendeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ausfuehrendeListModification',
                content: 'Deleted an ausfuehrende'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ausfuehrende-delete-popup',
    template: ''
})
export class AusfuehrendeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ausfuehrendePopupService: AusfuehrendePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ausfuehrendePopupService
                .open(AusfuehrendeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
