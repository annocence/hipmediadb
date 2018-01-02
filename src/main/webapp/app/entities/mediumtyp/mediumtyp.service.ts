import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Mediumtyp } from './mediumtyp.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MediumtypService {

    private resourceUrl =  SERVER_API_URL + 'api/mediumtyps';

    constructor(private http: Http) { }

    create(mediumtyp: Mediumtyp): Observable<Mediumtyp> {
        const copy = this.convert(mediumtyp);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(mediumtyp: Mediumtyp): Observable<Mediumtyp> {
        const copy = this.convert(mediumtyp);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Mediumtyp> {
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
     * Convert a returned JSON object to Mediumtyp.
     */
    private convertItemFromServer(json: any): Mediumtyp {
        const entity: Mediumtyp = Object.assign(new Mediumtyp(), json);
        return entity;
    }

    /**
     * Convert a Mediumtyp to a JSON which can be sent to the server.
     */
    private convert(mediumtyp: Mediumtyp): Mediumtyp {
        const copy: Mediumtyp = Object.assign({}, mediumtyp);
        return copy;
    }
}
