import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Medium } from './medium.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MediumService {

    private resourceUrl =  SERVER_API_URL + 'api/mediums';

    constructor(private http: Http) { }

    create(medium: Medium): Observable<Medium> {
        const copy = this.convert(medium);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(medium: Medium): Observable<Medium> {
        const copy = this.convert(medium);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Medium> {
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
     * Convert a returned JSON object to Medium.
     */
    private convertItemFromServer(json: any): Medium {
        const entity: Medium = Object.assign(new Medium(), json);
        return entity;
    }

    /**
     * Convert a Medium to a JSON which can be sent to the server.
     */
    private convert(medium: Medium): Medium {
        const copy: Medium = Object.assign({}, medium);
        return copy;
    }
}
