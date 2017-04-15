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
var soap_service_1 = require('../services/soap.service');
var cliente_1 = require('../domain/cliente');
var producto_1 = require('../domain/producto');
var ClienteComponent = (function () {
    function ClienteComponent(soapService) {
        this.soapService = soapService;
        this.selected = new producto_1.Producto();
        this.row = new cliente_1.Cliente();
    }
    ClienteComponent.prototype.ngOnInit = function () {
        this.obtenerClientes();
    };
    ClienteComponent.prototype.obtenerClientes = function () {
        var _this = this;
        this.soapService.obtenerProductos("ListarProductos")
            .subscribe(function (result) {
            console.log(result);
            _this.productos = JSON.parse(result);
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
        console.log(this.selected.Id);
    };
    ClienteComponent.prototype.delete = function () {
        var _this = this;
        this.soapService.eliminarProducto("EliminarProducto", this.selected.Id)
            .subscribe(function (result) {
            console.log(result);
            var index = _this.productos.map(function (x) { return x.Id; }).indexOf(_this.selected.Id);
            if (index > -1) {
                _this.productos.splice(index, 1);
            }
            _this.selected = new producto_1.Producto();
        }, function (err) {
            console.log(err);
        });
    };
    ClienteComponent.prototype.onRowDblclick = function (event) {
        console.log("doble click!");
        // SHOW MODAL
    };
    /*save(){

        this.loginService.updateCliente(this.selected)
                         .subscribe(
                            result => {

                                this.result = result;
                                console.log("Mi info : " + this.result.status);
                                this.selected = new Cliente();
                            },
                            err => {
                                console.log(err);
                            });
    }*/
    ClienteComponent.prototype.addModal = function () {
        //Mostrar Modal Vacio
        this.selected = new producto_1.Producto();
        $("#dni").removeAttr("disabled");
        $("#btnAdd").removeAttr("hidden");
        //this.selected.sexo = 0;            // Sexo por default
        //this.selected.contrasena = "factory";      // Contraseña por defecto
        //this.selected.g_ruc = "10487743271";       // RUC POR DEFECTO
    };
    // CRUD
    /* add(){
         
         this.httpService.post("/cliente", this.selected )
                          .subscribe(
                             result => {
 
                                 this.result = result;
                                 console.log("Mi info : " + this.result.status);
 
                                 if(this.result.status == 100){
                                     // MENSAJE SATISFACTORIO
                                     this.selected.id = this.result.data;
                                     this.clients.push(this.selected);       // Se le asigna la ID con la que se inserto
                                     this.selected = new Cliente();
                                 
                                 }
 
                                 
                             },
                             err => {
                                 console.log(err);
                             });
         
     }
 
     
 
     updateDt(dt: DataTable) {
         dt.reset();
     }   */
    ClienteComponent.prototype.cancel = function () {
        Object.assign(this.selected, this.row);
        this.selected = new producto_1.Producto();
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
        __metadata('design:paramtypes', [soap_service_1.SoapService])
    ], ClienteComponent);
    return ClienteComponent;
}());
exports.ClienteComponent = ClienteComponent;
//# sourceMappingURL=cliente.component.js.map