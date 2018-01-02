/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { WerkComponent } from '../../../../../../main/webapp/app/entities/werk/werk.component';
import { WerkService } from '../../../../../../main/webapp/app/entities/werk/werk.service';
import { Werk } from '../../../../../../main/webapp/app/entities/werk/werk.model';

describe('Component Tests', () => {

    describe('Werk Management Component', () => {
        let comp: WerkComponent;
        let fixture: ComponentFixture<WerkComponent>;
        let service: WerkService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [WerkComponent],
                providers: [
                    WerkService
                ]
            })
            .overrideTemplate(WerkComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WerkComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WerkService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Werk(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.werks[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
