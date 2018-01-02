import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ausfuehrende } from './ausfuehrende.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AusfuehrendeService {

    private resourceUrl =  SERVER_API_URL + 'api/ausfuehrendes';

    constructor(private http: Http) { }

    create(ausfuehrende: Ausfuehrende): Observable<Ausfuehrende> {
        const copy = this.convert(ausfuehrende);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ausfuehrende: Ausfuehrende): Observable<Ausfuehrende> {
        const copy = this.convert(ausfuehrende);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ausfuehrende> {
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
     * Convert a returned JSON object to Ausfuehrende.
     */
    private convertItemFromServer(json: any): Ausfuehrende {
        const entity: Ausfuehrende = Object.assign(new Ausfuehrende(), json);
        entity.interpret.name = entity.interpret.nachname + ', ' + entity.interpret.vorname
        entity.dirigent.name = entity.dirigent.nachname + ', ' + entity.dirigent.vorname
        return entity;
    }

    /**
     * Convert a Ausfuehrende to a JSON which can be sent to the server.
     */
    private convert(ausfuehrende: Ausfuehrende): Ausfuehrende {
        const copy: Ausfuehrende = Object.assign({}, ausfuehrende);
        return copy;
    }
}
