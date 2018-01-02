/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { MediumComponent } from '../../../../../../main/webapp/app/entities/medium/medium.component';
import { MediumService } from '../../../../../../main/webapp/app/entities/medium/medium.service';
import { Medium } from '../../../../../../main/webapp/app/entities/medium/medium.model';

describe('Component Tests', () => {

    describe('Medium Management Component', () => {
        let comp: MediumComponent;
        let fixture: ComponentFixture<MediumComponent>;
        let service: MediumService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [MediumComponent],
                providers: [
                    MediumService
                ]
            })
            .overrideTemplate(MediumComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MediumComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MediumService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Medium(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.mediums[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
