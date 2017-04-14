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
        this.url = "http://localhost:3401/Usuarios.svc";
        this.key = 'NullPointers_Key';
    }
    SoapService.prototype.isLogged = function () {
        if (window.localStorage.getItem(this.key)) {
            return true;
        }
        return false;
    };
    SoapService.prototype.loginUsuario = function (metodo, codigo, contrasena) {
        var parser = new DOMParser();
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
        return this.http.post(this.url, soapData, options)
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