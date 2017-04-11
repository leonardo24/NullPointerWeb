import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Respuesta } from '../domain/respuesta';
//import 'rxjs/Rx';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpService {

    
    private url = "http://localhost:8095/v.1.0.0";
    private key = 'EasyGym_Key';
    private options;    // Used for Post Parameters
   
    constructor(private http: Http){
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: headers });
    }


    get(ruta, ...params: String[]) : Observable<Respuesta> {

        for (var i = 0; i < params.length; i++) {
            ruta += "/" + params[i];
        }

        // ...using get request
        return this.http.get(this.url + ruta)
                    // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    put(ruta, objeto: any) : Observable<Respuesta> {

         console.log(JSON.stringify(objeto));

         var headers_json = new Headers({ 'Content-Type': 'application/json' });
         var options = new RequestOptions({ headers: headers_json });

         // ...using get request
         return this.http.put(this.url + ruta, JSON.stringify(objeto), options)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

     post(ruta, objeto: any) : Observable<Respuesta> {

        var headers_json = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers_json });

        console.log(JSON.stringify(objeto));

        // ...using get request
        return this.http.post(this.url + ruta, JSON.stringify(objeto), options)
                    // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

     delete(ruta, ...params: String[]) : Observable<Respuesta> {

        for (var i = 0; i < params.length; i++) {
            ruta += "/" + params[i];
        }
        
        console.log(this.url + ruta);

        // ...using get request
        return this.http.delete(this.url + ruta)
                    // ...and calling .json() on the response to return data
                        .map((res:Response) => res.json())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }





}