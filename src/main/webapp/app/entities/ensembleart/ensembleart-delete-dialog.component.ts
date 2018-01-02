import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ensembleart } from './ensembleart.model';
import { EnsembleartPopupService } from './ensembleart-popup.service';
import { EnsembleartService } from './ensembleart.service';

@Component({
    selector: 'jhi-ensembleart-delete-dialog',
    templateUrl: './ensembleart-delete-dialog.component.html'
})
export class EnsembleartDeleteDialogComponent {

    ensembleart: Ensembleart;

    constructor(
        private ensembleartService: EnsembleartService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ensembleartService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ensembleartListModification',
                content: 'Deleted an ensembleart'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ensembleart-delete-popup',
    template: ''
})
export class EnsembleartDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ensembleartPopupService: EnsembleartPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ensembleartPopupService
                .open(EnsembleartDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
