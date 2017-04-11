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
var router_1 = require('@angular/router');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var SoapService = (function () {
    function SoapService(http, router) {
        this.http = http;
        this.router = router;
        this.url = "http://localhost:50544/Service.svc";
        this.key = 'NullPointers_Key';
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new http_1.RequestOptions({ headers: headers });
    }
    SoapService.prototype.isLogged = function () {
        if (window.localStorage.getItem(this.key)) {
            return true;
        }
        return false;
    };
    SoapService.prototype.login = function (metodo, dni, contrasena, callback) {
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Body>' +
            '<' + metodo + ' xmlns="http://tempuri.org/">' +
            '<dni>' + dni + '</dni>' +
            '<contrasena>' + contrasena + '</contrasena>' +
            '</' + metodo + '>' +
            '</s:Body>' +
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
    };
    SoapService.prototype.obtenerUsuario = function (metodo) {
        var soapData = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">' +
            '<s:Body>' +
            '<' + metodo + ' xmlns="http://tempuri.org/">' +
            '<dni>4877</dni>' +
            '</' + metodo + '>' +
            '</s:Body>' +
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
                var xmlDoc = $.parseXML(data), $xml = $(xmlDoc), $value = $xml.find(metodo + "Result");
                //do what you want with the value
                console.log("Valor : " + $value.text());
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    };
    SoapService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], SoapService);
    return SoapService;
}());
exports.SoapService = SoapService;
//# sourceMappingURL=soap.service.js.map