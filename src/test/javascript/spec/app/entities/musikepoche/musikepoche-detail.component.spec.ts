/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { MusikepocheDetailComponent } from '../../../../../../main/webapp/app/entities/musikepoche/musikepoche-detail.component';
import { MusikepocheService } from '../../../../../../main/webapp/app/entities/musikepoche/musikepoche.service';
import { Musikepoche } from '../../../../../../main/webapp/app/entities/musikepoche/musikepoche.model';

describe('Component Tests', () => {

    describe('Musikepoche Management Detail Component', () => {
        let comp: MusikepocheDetailComponent;
        let fixture: ComponentFixture<MusikepocheDetailComponent>;
        let service: MusikepocheService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [MusikepocheDetailComponent],
                providers: [
                    MusikepocheService
                ]
            })
            .overrideTemplate(MusikepocheDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MusikepocheDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MusikepocheService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Musikepoche(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.musikepoche).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
