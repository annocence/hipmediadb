/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { MediumtypComponent } from '../../../../../../main/webapp/app/entities/mediumtyp/mediumtyp.component';
import { MediumtypService } from '../../../../../../main/webapp/app/entities/mediumtyp/mediumtyp.service';
import { Mediumtyp } from '../../../../../../main/webapp/app/entities/mediumtyp/mediumtyp.model';

describe('Component Tests', () => {

    describe('Mediumtyp Management Component', () => {
        let comp: MediumtypComponent;
        let fixture: ComponentFixture<MediumtypComponent>;
        let service: MediumtypService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [MediumtypComponent],
                providers: [
                    MediumtypService
                ]
            })
            .overrideTemplate(MediumtypComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MediumtypComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MediumtypService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Mediumtyp(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mediumtyps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
