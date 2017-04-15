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
var router_1 = require('@angular/router');
// Classes
var usuario_1 = require('../domain/usuario');
// Services
var soap_service_1 = require('../services/soap.service');
var LoginComponent = (function () {
    function LoginComponent(soapService, router) {
        this.soapService = soapService;
        this.router = router;
        this.user = new usuario_1.Usuario(); // Inicializa la variable
        this.key = 'NullPointers_Key';
        this.user.Codigo = 'leo';
        this.user.Contrasena = '123';
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.soapService.isLogged()) {
            this.router.navigate(['/dashboard']);
        }
    };
    LoginComponent.prototype.userLogin = function () {
        var _this = this;
        this.soapService.loginUsuario("LoginUsuario", this.user.Codigo, this.user.Contrasena)
            .subscribe(function (result) {
            var usuario = new usuario_1.Usuario();
            usuario = JSON.parse(result);
            console.log(usuario);
            if (usuario.Id > 0) {
                window.localStorage.setItem(_this.key, "1sdf4safsadfsd874f89sd4f89");
                _this.router.navigate(['/dashboard']);
            }
            else {
            }
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: '../../templates/login.html',
            providers: [soap_service_1.SoapService]
        }), 
        __metadata('design:paramtypes', [soap_service_1.SoapService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map