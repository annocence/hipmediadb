/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { PersonComponent } from '../../../../../../main/webapp/app/entities/person/person.component';
import { PersonService } from '../../../../../../main/webapp/app/entities/person/person.service';
import { Person } from '../../../../../../main/webapp/app/entities/person/person.model';

describe('Component Tests', () => {

    describe('Person Management Component', () => {
        let comp: PersonComponent;
        let fixture: ComponentFixture<PersonComponent>;
        let service: PersonService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [PersonComponent],
                providers: [
                    PersonService
                ]
            })
            .overrideTemplate(PersonComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Person(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.people[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
