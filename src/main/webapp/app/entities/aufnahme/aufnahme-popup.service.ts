import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Aufnahme } from './aufnahme.model';
import { AufnahmeService } from './aufnahme.service';

@Injectable()
export class AufnahmePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private aufnahmeService: AufnahmeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.aufnahmeService.find(id).subscribe((aufnahme) => {
                    if (aufnahme.aufnahmeDatum) {
                        aufnahme.aufnahmeDatum = {
                            year: aufnahme.aufnahmeDatum.getFullYear(),
                            month: aufnahme.aufnahmeDatum.getMonth() + 1,
                            day: aufnahme.aufnahmeDatum.getDate()
                        };
                    }
                    if (aufnahme.mitschnittDatum) {
                        aufnahme.mitschnittDatum = {
                            year: aufnahme.mitschnittDatum.getFullYear(),
                            month: aufnahme.mitschnittDatum.getMonth() + 1,
                            day: aufnahme.mitschnittDatum.getDate()
                        };
                    }
                    this.ngbModalRef = this.aufnahmeModalRef(component, aufnahme);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.aufnahmeModalRef(component, new Aufnahme());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    aufnahmeModalRef(component: Component, aufnahme: Aufnahme): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.aufnahme = aufnahme;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
