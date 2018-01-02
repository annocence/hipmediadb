import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Werk } from './werk.model';
import { WerkPopupService } from './werk-popup.service';
import { WerkService } from './werk.service';

@Component({
    selector: 'jhi-werk-delete-dialog',
    templateUrl: './werk-delete-dialog.component.html'
})
export class WerkDeleteDialogComponent {

    werk: Werk;

    constructor(
        private werkService: WerkService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.werkService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'werkListModification',
                content: 'Deleted an werk'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-werk-delete-popup',
    template: ''
})
export class WerkDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private werkPopupService: WerkPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.werkPopupService
                .open(WerkDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
