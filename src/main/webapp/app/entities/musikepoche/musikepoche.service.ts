import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Musikepoche } from './musikepoche.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MusikepocheService {

    private resourceUrl =  SERVER_API_URL + 'api/musikepoches';

    constructor(private http: Http) { }

    create(musikepoche: Musikepoche): Observable<Musikepoche> {
        const copy = this.convert(musikepoche);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(musikepoche: Musikepoche): Observable<Musikepoche> {
        const copy = this.convert(musikepoche);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Musikepoche> {
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
     * Convert a returned JSON object to Musikepoche.
     */
    private convertItemFromServer(json: any): Musikepoche {
        const entity: Musikepoche = Object.assign(new Musikepoche(), json);
        return entity;
    }

    /**
     * Convert a Musikepoche to a JSON which can be sent to the server.
     */
    private convert(musikepoche: Musikepoche): Musikepoche {
        const copy: Musikepoche = Object.assign({}, musikepoche);
        return copy;
    }
}
