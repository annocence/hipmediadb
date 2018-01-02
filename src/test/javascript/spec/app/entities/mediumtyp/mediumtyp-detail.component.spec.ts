/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { MediumtypDetailComponent } from '../../../../../../main/webapp/app/entities/mediumtyp/mediumtyp-detail.component';
import { MediumtypService } from '../../../../../../main/webapp/app/entities/mediumtyp/mediumtyp.service';
import { Mediumtyp } from '../../../../../../main/webapp/app/entities/mediumtyp/mediumtyp.model';

describe('Component Tests', () => {

    describe('Mediumtyp Management Detail Component', () => {
        let comp: MediumtypDetailComponent;
        let fixture: ComponentFixture<MediumtypDetailComponent>;
        let service: MediumtypService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [MediumtypDetailComponent],
                providers: [
                    MediumtypService
                ]
            })
            .overrideTemplate(MediumtypDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MediumtypDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MediumtypService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Mediumtyp(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mediumtyp).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
