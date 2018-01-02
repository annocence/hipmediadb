/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { AusfuehrendeComponent } from '../../../../../../main/webapp/app/entities/ausfuehrende/ausfuehrende.component';
import { AusfuehrendeService } from '../../../../../../main/webapp/app/entities/ausfuehrende/ausfuehrende.service';
import { Ausfuehrende } from '../../../../../../main/webapp/app/entities/ausfuehrende/ausfuehrende.model';

describe('Component Tests', () => {

    describe('Ausfuehrende Management Component', () => {
        let comp: AusfuehrendeComponent;
        let fixture: ComponentFixture<AusfuehrendeComponent>;
        let service: AusfuehrendeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [AusfuehrendeComponent],
                providers: [
                    AusfuehrendeService
                ]
            })
            .overrideTemplate(AusfuehrendeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AusfuehrendeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AusfuehrendeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ausfuehrende(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ausfuehrendes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
