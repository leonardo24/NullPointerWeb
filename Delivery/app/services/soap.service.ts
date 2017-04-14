import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Respuesta } from '../domain/respuesta';
import { Router } from '@angular/router';


//import 'rxjs/Rx';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SoapService {

    private url = "http://localhost:3401/Usuarios.svc";
    private options;    // Used for Post Parameters
    private key = 'NullPointers_Key';
   
    constructor(private http: Http){

    }

    isLogged(): boolean{

        if(window.localStorage.getItem(this.key)){
            return true;
        }
        return false;

    }

    loginUsuario(metodo, codigo, contrasena) : Observable<string> {

        var parser = new DOMParser();    
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
                        '<s:Body>'+
                            '<' + metodo + ' xmlns="http://tempuri.org/">'+
                                '<codigo>' + codigo + '</codigo>'+
                                '<contrasena>' + contrasena + '</contrasena>'+
                            '</' + metodo + '>'+
                        '</s:Body>'+
                    '</s:Envelope>';

        var headers = new Headers({ 'SOAPAction': 'http://tempuri.org/IUsuarios/' + metodo });
            headers.append('Content-Type', 'text/xml');
            headers.append('Accept', 'text/xml');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.url, soapData, options)
                        // ...and calling .json() on the response to return data
                        .map(res => $(res.text()).find(metodo + 'Result').text())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

}