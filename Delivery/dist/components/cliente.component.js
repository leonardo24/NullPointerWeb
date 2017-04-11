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
var login_service_1 = require('../services/login.service');
var http_service_1 = require('../services/http.service');
var cliente_1 = require('../domain/cliente');
var ClienteComponent = (function () {
    function ClienteComponent(loginService, httpService) {
        this.loginService = loginService;
        this.httpService = httpService;
        this.selected = new cliente_1.Cliente();
        this.row = new cliente_1.Cliente();
    }
    ClienteComponent.prototype.ngOnInit = function () {
        this.obtenerClientes();
    };
    ClienteComponent.prototype.obtenerClientes = function () {
        var _this = this;
        this.loginService.getClientes()
            .subscribe(function (result) {
            _this.result = result;
            console.log("Mi info : " + _this.result.data);
            _this.clients = JSON.parse(_this.result.data);
        }, function (err) {
            console.log(err);
        });
    };
    ClienteComponent.prototype.refresh = function () {
        this.obtenerClientes();
    };
    ClienteComponent.prototype.onRowSelect = function (event) {
        this.row = Object.assign({}, event.data); // copiado
        this.selected = event.data;
        if (this.selected.sexo == 0) {
            $("#masculino").addClass("active");
            $("#femenino").removeClass("active");
        }
        else {
            $("#masculino").removeClass("active");
            $("#femenino").addClass("active");
        }
    };
    ClienteComponent.prototype.gender = function (sexo) {
        this.selected.sexo = sexo;
    };
    ClienteComponent.prototype.onRowDblclick = function (event) {
        console.log("doble click!");
        // SHOW MODAL
    };
    ClienteComponent.prototype.save = function () {
        var _this = this;
        this.loginService.updateCliente(this.selected)
            .subscribe(function (result) {
            _this.result = result;
            console.log("Mi info : " + _this.result.status);
            _this.selected = new cliente_1.Cliente();
        }, function (err) {
            console.log(err);
        });
    };
    ClienteComponent.prototype.addModal = function () {
        //Mostrar Modal Vacio
        this.selected = new cliente_1.Cliente();
        $("#dni").removeAttr("disabled");
        $("#btnAdd").removeAttr("hidden");
        this.selected.sexo = 0; // Sexo por default
        this.selected.contrasena = "factory"; // Contraseña por defecto
        this.selected.g_ruc = "10487743271"; // RUC POR DEFECTO
    };
    // CRUD
    ClienteComponent.prototype.add = function () {
        var _this = this;
        this.httpService.post("/cliente", this.selected)
            .subscribe(function (result) {
            _this.result = result;
            console.log("Mi info : " + _this.result.status);
            if (_this.result.status == 100) {
                // MENSAJE SATISFACTORIO
                _this.selected.id = _this.result.data;
                _this.clients.push(_this.selected); // Se le asigna la ID con la que se inserto
                _this.selected = new cliente_1.Cliente();
            }
        }, function (err) {
            console.log(err);
        });
    };
    ClienteComponent.prototype.delete = function () {
        var _this = this;
        this.httpService.delete("/cliente", this.selected.id)
            .subscribe(function (result) {
            _this.result = result;
            if (_this.result.status == 100) {
                var index = _this.clients.map(function (x) { return x.id; }).indexOf(_this.selected.id);
                if (index > -1) {
                    _this.clients.splice(index, 1);
                }
                _this.selected = new cliente_1.Cliente();
            }
            console.log("Mi info : " + _this.result.status);
        }, function (err) {
            console.log(err);
        });
    };
    ClienteComponent.prototype.updateDt = function (dt) {
        dt.reset();
    };
    ClienteComponent.prototype.cancel = function () {
        Object.assign(this.selected, this.row);
        this.selected = new cliente_1.Cliente();
    };
    ClienteComponent.prototype.obtenerEdad = function (Fecha) {
        var elapsed = +new Date() - +new Date(Fecha);
        return Fecha == null ? "--" : Math.floor((elapsed) / 1000 / 60 / 60 / 24 / 365.25);
    };
    ClienteComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cliente',
            templateUrl: '../../templates/clientes.html'
        }), 
        __metadata('design:paramtypes', [login_service_1.LoginService, http_service_1.HttpService])
    ], ClienteComponent);
    return ClienteComponent;
}());
exports.ClienteComponent = ClienteComponent;
//# sourceMappingURL=cliente.component.js.map