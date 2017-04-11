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
        this.user.dni = '48774327';
        this.user.contrasena = '123456';
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.soapService.isLogged()) {
            this.router.navigate(['/dashboard']);
        }
    };
    LoginComponent.prototype.userLogin = function () {
        this.soapService.login("loginUsuario", this.user.dni, this.user.contrasena, function (result) {
            if (result != null) {
                if (result.code == 100) {
                    console.log("paseeee");
                    window.localStorage.setItem("NullPointers_Key", "1sdf4safsadfsd874f89sd4f89");
                    this.router.navigate(['/dashboard']);
                }
                else {
                    alert("Usuario o Contraseña incorrectos");
                }
            }
            else {
                console.log("No se pudo recuperar la informacion");
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: '../../templates/login.html',
            styleUrls: ['../../css/animate.css'],
            providers: [soap_service_1.SoapService]
        }), 
        __metadata('design:paramtypes', [soap_service_1.SoapService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
/*
  userLogin(){
      
      this.loginService.getLogin(this.user.usuario, this.user.contrasena, this.user.ruc)
                          .subscribe(
                              result => {
                                this.result = result;
                                console.log(  this.result.data);
                                
                                if(this.result.status == 100){
                                    window.localStorage.setItem(this.key, "1sdf4safsadfsd874f89sd4f89");
                                    this.router.navigate(['/dashboard']);
                                }


                              },
                              err => {
                                console.log(err);
                              });
    }
  */ 
//# sourceMappingURL=login.component.js.map