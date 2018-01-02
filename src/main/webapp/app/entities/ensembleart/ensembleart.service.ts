import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Ensembleart } from './ensembleart.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EnsembleartService {

    private resourceUrl =  SERVER_API_URL + 'api/ensemblearts';

    constructor(private http: Http) { }

    create(ensembleart: Ensembleart): Observable<Ensembleart> {
        const copy = this.convert(ensembleart);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(ensembleart: Ensembleart): Observable<Ensembleart> {
        const copy = this.convert(ensembleart);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Ensembleart> {
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
     * Convert a returned JSON object to Ensembleart.
     */
    private convertItemFromServer(json: any): Ensembleart {
        const entity: Ensembleart = Object.assign(new Ensembleart(), json);
        return entity;
    }

    /**
     * Convert a Ensembleart to a JSON which can be sent to the server.
     */
    private convert(ensembleart: Ensembleart): Ensembleart {
        const copy: Ensembleart = Object.assign({}, ensembleart);
        return copy;
    }
}
