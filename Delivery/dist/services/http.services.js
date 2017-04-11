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
var HttpService = (function () {
    function HttpService(http) {
        this.http = http;
        this.url = "http://localhost:8095/v.1.0.0";
        this.key = 'EasyGym_Key';
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new http_1.RequestOptions({ headers: headers });
    }
    HttpService.prototype.get = function (ruta) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < params.length; i++) {
            ruta += "/" + params[i];
        }
        // ...using get request
        return this.http.get(this.url + ruta)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.put = function (ruta, objeto) {
        console.log(JSON.stringify(objeto));
        var headers_json = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers_json });
        // ...using get request
        return this.http.put(this.url + ruta, JSON.stringify(objeto), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.post = function (ruta, objeto) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var headers_json = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers_json });
        for (var i = 0; i < params.length; i++) {
            ruta += "/" + params[i];
        }
        // ...using get request
        return this.http.post(this.url + ruta, JSON.stringify(objeto), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService.prototype.delete = function (ruta) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < params.length; i++) {
            ruta += "/" + params[i];
        }
        // ...using get request
        return this.http.delete(this.url + ruta)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.services.js.map