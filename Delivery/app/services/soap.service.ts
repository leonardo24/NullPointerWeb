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

    private url = "http://localhost:50544/Service.svc";
    private options;    // Used for Post Parameters
    private key = 'NullPointers_Key';
   
    constructor(private http: Http, private router: Router){
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: headers });
    }

    isLogged(): boolean{

        if(window.localStorage.getItem(this.key)){
            return true;
        }
        return false;

    }
    
    login(metodo, dni, contrasena, callback){

        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
                            '<s:Body>'+
                                '<' + metodo + ' xmlns="http://tempuri.org/">'+
                                    '<dni>' + dni + '</dni>'+
                                    '<contrasena>' + contrasena + '</contrasena>'+
                                '</' + metodo + '>'+
                            '</s:Body>'+
                        '</s:Envelope>';

        $.ajax({
            type: 'POST',
            url: this.url,
            contentType: 'text/xml; charset=utf-8',
            dataType: "xml",
            headers: {
                SOAPAction: 'http://tempuri.org/IService/' + metodo
            },
            data: soapData,
            success: function (data) {

                var json = $(data).find(metodo + 'Result').text();
                callback(JSON.parse(json));

            },
            error: function (xhr, status, error) {
                console.log(error);
                callback(null);
            }
        });

     }

    obtenerUsuario(metodo){

        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
                            '<s:Body>'+
                                '<' + metodo + ' xmlns="http://tempuri.org/">'+
                                    '<dni>4877</dni>'+
                                '</' + metodo + '>'+
                            '</s:Body>'+
                        '</s:Envelope>';

        $.ajax({
            type: 'POST',
            url: this.url,
            contentType: 'text/xml; charset=utf-8',
            headers: {
                SOAPAction: 'http://tempuri.org/IService/' + metodo
            },
            data: soapData,
            success: function (data) {
                console.log(data);

                var xmlDoc = $.parseXML(data),
                $xml = $( xmlDoc ),
                $value = $xml.find( metodo + "Result");
                //do what you want with the value
                console.log("Valor : " + $value.text());
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });

     }


}