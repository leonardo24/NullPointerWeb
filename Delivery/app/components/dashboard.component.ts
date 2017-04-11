import { Component, Input } from '@angular/core';
import {LoginService} from '../services/login.service'
import { Router } from '@angular/router';
// Classes
import { Usuario } from '../domain/usuario';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: '../../templates/dashboard.html',
    styleUrls: [ 
        '../../css/main.css'
     ],
})
export class DashboardComponent{

  constructor(private loginService: LoginService, private router: Router) { 

  }

  userLogout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}