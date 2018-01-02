/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HipmediadbTestModule } from '../../../test.module';
import { AufnahmeDialogComponent } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme-dialog.component';
import { AufnahmeService } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.service';
import { Aufnahme } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.model';
import { AusfuehrendeService } from '../../../../../../main/webapp/app/entities/ausfuehrende';
import { MediumService } from '../../../../../../main/webapp/app/entities/medium';
import { WerkService } from '../../../../../../main/webapp/app/entities/werk';

describe('Component Tests', () => {

    describe('Aufnahme Management Dialog Component', () => {
        let comp: AufnahmeDialogComponent;
        let fixture: ComponentFixture<AufnahmeDialogComponent>;
        let service: AufnahmeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [AufnahmeDialogComponent],
                providers: [
                    AusfuehrendeService,
                    MediumService,
                    WerkService,
                    AufnahmeService
                ]
            })
            .overrideTemplate(AufnahmeDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AufnahmeDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AufnahmeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Aufnahme(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.aufnahme = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'aufnahmeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Aufnahme();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.aufnahme = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'aufnahmeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
