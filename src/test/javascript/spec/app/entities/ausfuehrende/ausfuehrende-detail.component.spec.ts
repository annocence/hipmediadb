/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { HipmediadbTestModule } from '../../../test.module';
import { AusfuehrendeDetailComponent } from '../../../../../../main/webapp/app/entities/ausfuehrende/ausfuehrende-detail.component';
import { AusfuehrendeService } from '../../../../../../main/webapp/app/entities/ausfuehrende/ausfuehrende.service';
import { Ausfuehrende } from '../../../../../../main/webapp/app/entities/ausfuehrende/ausfuehrende.model';

describe('Component Tests', () => {

    describe('Ausfuehrende Management Detail Component', () => {
        let comp: AusfuehrendeDetailComponent;
        let fixture: ComponentFixture<AusfuehrendeDetailComponent>;
        let service: AusfuehrendeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [AusfuehrendeDetailComponent],
                providers: [
                    AusfuehrendeService
                ]
            })
            .overrideTemplate(AusfuehrendeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AusfuehrendeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AusfuehrendeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Ausfuehrende(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ausfuehrende).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
