import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Aufnahme } from './aufnahme.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AufnahmeService {

    private resourceUrl =  SERVER_API_URL + 'api/aufnahmes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(aufnahme: Aufnahme): Observable<Aufnahme> {
        const copy = this.convert(aufnahme);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(aufnahme: Aufnahme): Observable<Aufnahme> {
        const copy = this.convert(aufnahme);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Aufnahme> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Aufnahme.
     */
    private convertItemFromServer(json: any): Aufnahme {
        const entity: Aufnahme = Object.assign(new Aufnahme(), json);
        entity.aufnahmeDatum = this.dateUtils
            .convertLocalDateFromServer(json.aufnahmeDatum);
        entity.mitschnittDatum = this.dateUtils
            .convertLocalDateFromServer(json.mitschnittDatum);
        return entity;
    }

    /**
     * Convert a Aufnahme to a JSON which can be sent to the server.
     */
    private convert(aufnahme: Aufnahme): Aufnahme {
        const copy: Aufnahme = Object.assign({}, aufnahme);
        copy.aufnahmeDatum = this.dateUtils
            .convertLocalDateToServer(aufnahme.aufnahmeDatum);
        copy.mitschnittDatum = this.dateUtils
            .convertLocalDateToServer(aufnahme.mitschnittDatum);
        return copy;
    }
}
