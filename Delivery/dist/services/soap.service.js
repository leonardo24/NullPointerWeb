"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
//import 'rxjs/Rx';
var Rx_1 = require('rxjs/Rx');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SoapService = (function () {
    function SoapService(http) {
        this.http = http;
        this.url_Usuarios = "http://localhost:3401/Usuarios.svc";
        this.url_Productos = "http://localhost:3401/Productos.svc";
        this.key = 'NullPointers_Key';
    }
    SoapService.prototype.isLogged = function () {
        if (window.localStorage.getItem(this.key)) {
            return true;
        }
        return false;
    };
    SoapService.prototype.loginUsuario = function (metodo, codigo, contrasena) {
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Body>' +
            '<' + metodo + ' xmlns="http://tempuri.org/">' +
            '<codigo>' + codigo + '</codigo>' +
            '<contrasena>' + contrasena + '</contrasena>' +
            '</' + metodo + '>' +
            '</s:Body>' +
            '</s:Envelope>';
        var headers = new http_1.Headers({ 'SOAPAction': 'http://tempuri.org/IUsuarios/' + metodo });
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url_Usuarios, soapData, options)
            .map(function (res) { return $(res.text()).find(metodo + 'Result').text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SoapService.prototype.obtenerProductos = function (metodo) {
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Body>' +
            '<' + metodo + ' xmlns="http://tempuri.org/">' +
            '</' + metodo + '>' +
            '</s:Body>' +
            '</s:Envelope>';
        var headers = new http_1.Headers({ 'SOAPAction': 'http://tempuri.org/IProductos/' + metodo });
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url_Productos, soapData, options)
            .map(function (res) { return $(res.text()).find(metodo + 'Result').text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SoapService.prototype.eliminarProducto = function (metodo, id) {
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Body>' +
            '<' + metodo + ' xmlns="http://tempuri.org/">' +
            '<id>' + id + '</id>' +
            '</' + metodo + '>' +
            '</s:Body>' +
            '</s:Envelope>';
        var headers = new http_1.Headers({ 'SOAPAction': 'http://tempuri.org/IProductos/' + metodo });
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url_Productos, soapData, options)
            .map(function (res) { return $(res.text()).find(metodo + 'Result').text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SoapService.prototype.anadirProducto = function (metodo, producto) {
        console.log(producto);
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Body>' +
            '<' + metodo + ' xmlns="http://tempuri.org/">' +
            '<productos xmlns:d4p1="http://schemas.datacontract.org/2004/07/WCFNullPointers.Dominio" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">' +
            '<d4p1:CategoriaId>' + producto.CategoriaId + '</d4p1:CategoriaId>' +
            '<d4p1:Descripcion>' + producto.Descripcion + '</d4p1:Descripcion>' +
            '<d4p1:Descuento>' + producto.Descuento + '</d4p1:Descuento>' +
            '<d4p1:Estado>' + producto.Estado + '</d4p1:Estado>' +
            '<d4p1:Nombre>' + producto.Nombre + '</d4p1:Nombre>' +
            '<d4p1:Precio>' + producto.Precio + '</d4p1:Precio>' +
            '<d4p1:Presentacion>' + producto.Presentacion + '</d4p1:Presentacion>' +
            '</productos>' +
            '</' + metodo + '>' +
            '</s:Body>' +
            '</s:Envelope>';
        console.log(soapData);
        var headers = new http_1.Headers({ 'SOAPAction': 'http://tempuri.org/IProductos/' + metodo });
        headers.append('Content-Type', 'text/xml');
        headers.append('Accept', 'text/xml');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url_Productos, soapData, options)
            .map(function (res) { return $(res.text()).find(metodo + 'Result').text(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    SoapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SoapService);
    return SoapService;
}());
exports.SoapService = SoapService;
//# sourceMappingURL=soap.service.js.map