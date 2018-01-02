/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { WerkDetailComponent } from '../../../../../../main/webapp/app/entities/werk/werk-detail.component';
import { WerkService } from '../../../../../../main/webapp/app/entities/werk/werk.service';
import { Werk } from '../../../../../../main/webapp/app/entities/werk/werk.model';

describe('Component Tests', () => {

    describe('Werk Management Detail Component', () => {
        let comp: WerkDetailComponent;
        let fixture: ComponentFixture<WerkDetailComponent>;
        let service: WerkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [WerkDetailComponent],
                providers: [
                    WerkService
                ]
            })
            .overrideTemplate(WerkDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WerkDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WerkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Werk(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.werk).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
