/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { HipmediadbTestModule } from '../../../test.module';
import { EnsembleartComponent } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.component';
import { EnsembleartService } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.service';
import { Ensembleart } from '../../../../../../main/webapp/app/entities/ensembleart/ensembleart.model';

describe('Component Tests', () => {

    describe('Ensembleart Management Component', () => {
        let comp: EnsembleartComponent;
        let fixture: ComponentFixture<EnsembleartComponent>;
        let service: EnsembleartService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HipmediadbTestModule],
                declarations: [EnsembleartComponent],
                providers: [
                    EnsembleartService
                ]
            })
            .overrideTemplate(EnsembleartComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnsembleartComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnsembleartService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Ensembleart(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ensemblearts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
