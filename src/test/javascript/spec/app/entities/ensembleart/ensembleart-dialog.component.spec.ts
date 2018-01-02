/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HipmediadbTestModule } from '../../../test.module';
import { EnsembleartDialogComponent } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart-dialog.component';
import { EnsembleartService } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.service';
import { Ensembleart } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.model';

describe('Component Tests', () => {

    describe('Ensembleart Management Dialog Component', () => {
        let comp: EnsembleartDialogComponent;
        let fixture: ComponentFixture<EnsembleartDialogComponent>;
        let service: EnsembleartService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [EnsembleartDialogComponent],
                providers: [
                    EnsembleartService
                ]
            })
            .overrideTemplate(EnsembleartDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnsembleartDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnsembleartService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ensembleart(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.ensembleart = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ensembleartListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Ensembleart();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.ensembleart = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ensembleartListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
