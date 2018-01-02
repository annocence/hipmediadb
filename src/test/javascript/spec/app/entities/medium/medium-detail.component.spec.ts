/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { MediumDetailComponent } from '../../../../../../main/webapp/app/entities/medium/medium-detail.component';
import { MediumService } from '../../../../../../main/webapp/app/entities/medium/medium.service';
import { Medium } from '../../../../../../main/webapp/app/entities/medium/medium.model';

describe('Component Tests', () => {

    describe('Medium Management Detail Component', () => {
        let comp: MediumDetailComponent;
        let fixture: ComponentFixture<MediumDetailComponent>;
        let service: MediumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [MediumDetailComponent],
                providers: [
                    MediumService
                ]
            })
            .overrideTemplate(MediumDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MediumDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MediumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Medium(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.medium).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
