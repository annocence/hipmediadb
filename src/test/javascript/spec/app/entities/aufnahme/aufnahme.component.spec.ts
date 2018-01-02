/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { AufnahmeComponent } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.component';
import { AufnahmeService } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.service';
import { Aufnahme } from '../../../../../../main/webapp/app/entities/aufnahme/aufnahme.model';

describe('Component Tests', () => {

    describe('Aufnahme Management Component', () => {
        let comp: AufnahmeComponent;
        let fixture: ComponentFixture<AufnahmeComponent>;
        let service: AufnahmeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [AufnahmeComponent],
                providers: [
                    AufnahmeService
                ]
            })
            .overrideTemplate(AufnahmeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AufnahmeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AufnahmeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Aufnahme(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.aufnahmes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
