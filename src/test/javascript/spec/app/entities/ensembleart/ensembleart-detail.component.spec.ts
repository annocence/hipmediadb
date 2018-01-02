/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { EnsembleartDetailComponent } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart-detail.component';
import { EnsembleartService } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.service';
import { Ensembleart } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.model';

describe('Component Tests', () => {

    describe('Ensembleart Management Detail Component', () => {
        let comp: EnsembleartDetailComponent;
        let fixture: ComponentFixture<EnsembleartDetailComponent>;
        let service: EnsembleartService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [EnsembleartDetailComponent],
                providers: [
                    EnsembleartService
                ]
            })
            .overrideTemplate(EnsembleartDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnsembleartDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnsembleartService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ensembleart(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ensembleart).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
