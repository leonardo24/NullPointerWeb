import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Respuesta } from '../domain/respuesta';
import { Producto } from '../domain/producto';
import { Router } from '@angular/router';


//import 'rxjs/Rx';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SoapService {

    private url_Usuarios = "http://localhost:3401/Usuarios.svc";
    private url_Productos = "http://localhost:3401/Productos.svc";
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

        return this.http.post(this.url_Usuarios, soapData, options)
                        // ...and calling .json() on the response to return data
                        .map(res => $(res.text()).find(metodo + 'Result').text())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

     obtenerProductos(metodo) : Observable<string> {
  
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
                        '<s:Body>'+
                            '<' + metodo + ' xmlns="http://tempuri.org/">'+
                            '</' + metodo + '>'+
                        '</s:Body>'+
                    '</s:Envelope>';

        var headers = new Headers({ 'SOAPAction': 'http://tempuri.org/IProductos/' + metodo });
            headers.append('Content-Type', 'text/xml');
            headers.append('Accept', 'text/xml');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.url_Productos, soapData, options)
                        // ...and calling .json() on the response to return data
                        .map(res => $(res.text()).find(metodo + 'Result').text())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

     eliminarProducto(metodo, id) : Observable<string> {
  
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
                        '<s:Body>'+
                            '<' + metodo + ' xmlns="http://tempuri.org/">'+
                                '<id>' + id + '</id>'+
                            '</' + metodo + '>'+
                        '</s:Body>'+
                    '</s:Envelope>';

        var headers = new Headers({ 'SOAPAction': 'http://tempuri.org/IProductos/' + metodo });
            headers.append('Content-Type', 'text/xml');
            headers.append('Accept', 'text/xml');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.url_Productos, soapData, options)
                        // ...and calling .json() on the response to return data
                        .map(res => $(res.text()).find(metodo + 'Result').text())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

     anadirProducto(metodo, producto: Producto) : Observable<string> {

         console.log(producto);


         var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">'+
                            '<s:Body>'+
                                '<' + metodo + ' xmlns="http://tempuri.org/">'+
                                    '<productos xmlns:d4p1="http://schemas.datacontract.org/2004/07/WCFNullPointers.Dominio" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'+
                                        '<d4p1:CategoriaId>' + producto.CategoriaId + '</d4p1:CategoriaId>'+
                                        '<d4p1:Descripcion>' + producto.Descripcion + '</d4p1:Descripcion>'+
                                        '<d4p1:Descuento>' + producto.Descuento + '</d4p1:Descuento>'+
                                        '<d4p1:Estado>' + producto.Estado + '</d4p1:Estado>'+
                                        '<d4p1:Nombre>' + producto.Nombre + '</d4p1:Nombre>'+
                                        '<d4p1:Precio>' + producto.Precio + '</d4p1:Precio>'+
                                        '<d4p1:Presentacion>' + producto.Presentacion + '</d4p1:Presentacion>'+
                                    '</productos>'+
                                '</' + metodo + '>'+
                            '</s:Body>'+
                        '</s:Envelope>';

                        console.log(soapData);

        var headers = new Headers({ 'SOAPAction': 'http://tempuri.org/IProductos/' + metodo });
            headers.append('Content-Type', 'text/xml');
            headers.append('Accept', 'text/xml');
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.url_Productos, soapData, options)
                        // ...and calling .json() on the response to return data
                        .map(res => $(res.text()).find(metodo + 'Result').text())
                        //...errors if any
                        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }


     

}