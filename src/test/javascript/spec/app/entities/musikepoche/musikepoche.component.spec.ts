/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { MusikepocheComponent } from '../../../../../../main/webapp/app/entities/musikepoche/musikepoche.component';
import { MusikepocheService } from '../../../../../../main/webapp/app/entities/musikepoche/musikepoche.service';
import { Musikepoche } from '../../../../../../main/webapp/app/entities/musikepoche/musikepoche.model';

describe('Component Tests', () => {

    describe('Musikepoche Management Component', () => {
        let comp: MusikepocheComponent;
        let fixture: ComponentFixture<MusikepocheComponent>;
        let service: MusikepocheService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [MusikepocheComponent],
                providers: [
                    MusikepocheService
                ]
            })
            .overrideTemplate(MusikepocheComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MusikepocheComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MusikepocheService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Musikepoche(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.musikepoches[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
