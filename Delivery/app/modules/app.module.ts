// Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
// Components
import { AppComponent }   from '../components/app.component';
import { AppRoutingModule, routedComponents } from '../modules/routing.module';
// Services
import { AuthGuard }   from '../services/auth-guard.service';
import { LoginService }   from '../services/login.service';
import { HttpService }   from '../services/http.service';
import { SoapService }   from '../services/soap.service';
import { DataTableModule, SharedModule } from 'primeng/primeng';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule, AppRoutingModule, DataTableModule, SharedModule ],
  declarations: [ AppComponent, routedComponents ],
  bootstrap:    [ AppComponent ],
  providers:    [ AuthGuard, LoginService, HttpService, SoapService ]
})

export class AppModule { }