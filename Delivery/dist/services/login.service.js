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
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.url = "http://localhost:8095/v.1.0.0";
        this.key = "NullPointers_Key";
        var headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new http_1.RequestOptions({ headers: headers });
    }
    LoginService.prototype.isLogged = function () {
        if (window.localStorage.getItem(this.key)) {
            return true;
        }
        return false;
    };
    /* login(usuario, contrasena, ruc){
 
 
         var method: string = '/usuario/' + usuario + '/' + + contrasena + '/' + ruc;
         var body: string = 'usuario=' + usuario + '&' + 'contrasena=' + contrasena + '&' + 'ruc=' + ruc;
 
        return this.http.get(this.url + method, this.options)
                 .toPromise()
                 .then(response => {
 
                     if(response.json().status == 100){
                         window.localStorage.setItem(this.key, "1sdf4safsadfsd874f89sd4f89");
                         return response.json().data as string;
                     }else{
                         return null;
                     }
                     
                 })
                 .catch(error => error);
 
 
     }*/
    LoginService.prototype.getLogin = function (usuario, contrasena, ruc) {
        var parameters = '/usuario/' + usuario + '/' + contrasena + '/' + ruc;
        // ...using get request
        return this.http.get(this.url + parameters)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoginService.prototype.getClientes = function () {
        var parameters = '/clientes/10487743271';
        // ...using get request
        return this.http.get(this.url + parameters)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoginService.prototype.updateCliente = function (cliente) {
        console.log(JSON.stringify(cliente));
        var headers_json = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers_json });
        var parameters = '/cliente';
        //cliente.fecha_ingreso = dateFormat(cliente.fecha_ingreso, "yyyy/mm/dd");
        // ...using get request
        return this.http.put(this.url + parameters, JSON.stringify(cliente), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    LoginService.prototype.logout = function () {
        window.localStorage.removeItem(this.key);
    };
    LoginService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map