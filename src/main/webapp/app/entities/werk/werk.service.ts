import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Werk } from './werk.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WerkService {

    private resourceUrl =  SERVER_API_URL + 'api/werks';

    constructor(private http: Http) { }

    create(werk: Werk): Observable<Werk> {
        const copy = this.convert(werk);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(werk: Werk): Observable<Werk> {
        const copy = this.convert(werk);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Werk> {
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
     * Convert a returned JSON object to Werk.
     */
    private convertItemFromServer(json: any): Werk {
        const entity: Werk = Object.assign(new Werk(), json);
        return entity;
    }

    /**
     * Convert a Werk to a JSON which can be sent to the server.
     */
    private convert(werk: Werk): Werk {
        const copy: Werk = Object.assign({}, werk);
        return copy;
    }
}
