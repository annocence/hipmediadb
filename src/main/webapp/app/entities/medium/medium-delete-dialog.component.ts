import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Medium } from './medium.model';
import { MediumPopupService } from './medium-popup.service';
import { MediumService } from './medium.service';

@Component({
    selector: 'jhi-medium-delete-dialog',
    templateUrl: './medium-delete-dialog.component.html'
})
export class MediumDeleteDialogComponent {

    medium: Medium;

    constructor(
        private mediumService: MediumService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mediumService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mediumListModification',
                content: 'Deleted an medium'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medium-delete-popup',
    template: ''
})
export class MediumDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mediumPopupService: MediumPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mediumPopupService
                .open(MediumDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
