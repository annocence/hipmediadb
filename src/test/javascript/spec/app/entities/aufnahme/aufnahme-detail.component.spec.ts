/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { AufnahmeDetailComponent } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme-detail.component';
import { AufnahmeService } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.service';
import { Aufnahme } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.model';

describe('Component Tests', () => {

    describe('Aufnahme Management Detail Component', () => {
        let comp: AufnahmeDetailComponent;
        let fixture: ComponentFixture<AufnahmeDetailComponent>;
        let service: AufnahmeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [AufnahmeDetailComponent],
                providers: [
                    AufnahmeService
                ]
            })
            .overrideTemplate(AufnahmeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AufnahmeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AufnahmeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Aufnahme(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.aufnahme).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
