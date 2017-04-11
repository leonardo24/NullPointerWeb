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
var auth_guard_service_1 = require('../services/auth-guard.service');
var login_component_1 = require('../components/login.component');
var actividad_component_1 = require('../components/actividad.component');
var promocion_component_1 = require('../components/promocion.component');
var cliente_component_1 = require('../components/cliente.component');
var dashboard_component_1 = require('../components/dashboard.component');
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_service_1.AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'clientes' },
            { path: 'clientes', component: cliente_component_1.ClienteComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'actividades', component: actividad_component_1.ActividadComponent, canActivate: [auth_guard_service_1.AuthGuard] },
            { path: 'promociones', component: promocion_component_1.PromocionComponent, canActivate: [auth_guard_service_1.AuthGuard] },
        ]
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
exports.routedComponents = [actividad_component_1.ActividadComponent,
    promocion_component_1.PromocionComponent,
    cliente_component_1.ClienteComponent,
    dashboard_component_1.DashboardComponent,
    login_component_1.LoginComponent];
//# sourceMappingURL=routing.module.js.map