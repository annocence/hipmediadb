import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Aufnahme } from './aufnahme.model';
import { AufnahmePopupService } from './aufnahme-popup.service';
import { AufnahmeService } from './aufnahme.service';

@Component({
    selector: 'jhi-aufnahme-delete-dialog',
    templateUrl: './aufnahme-delete-dialog.component.html'
})
export class AufnahmeDeleteDialogComponent {

    aufnahme: Aufnahme;

    constructor(
        private aufnahmeService: AufnahmeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.aufnahmeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'aufnahmeListModification',
                content: 'Deleted an aufnahme'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-aufnahme-delete-popup',
    template: ''
})
export class AufnahmeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aufnahmePopupService: AufnahmePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.aufnahmePopupService
                .open(AufnahmeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
