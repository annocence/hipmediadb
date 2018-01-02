import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Mediumtyp } from './mediumtyp.model';
import { MediumtypPopupService } from './mediumtyp-popup.service';
import { MediumtypService } from './mediumtyp.service';

@Component({
    selector: 'jhi-mediumtyp-delete-dialog',
    templateUrl: './mediumtyp-delete-dialog.component.html'
})
export class MediumtypDeleteDialogComponent {

    mediumtyp: Mediumtyp;

    constructor(
        private mediumtypService: MediumtypService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mediumtypService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mediumtypListModification',
                content: 'Deleted an mediumtyp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mediumtyp-delete-popup',
    template: ''
})
export class MediumtypDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mediumtypPopupService: MediumtypPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mediumtypPopupService
                .open(MediumtypDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
