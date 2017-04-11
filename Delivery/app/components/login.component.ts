import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Classes
import { Usuario } from '../domain/usuario';
import { Product } from '../domain/country';
// Services
import { SoapService } from '../services/soap.service';
import { Respuesta } from '../domain/respuesta';



@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: '../../templates/login.html',
  styleUrls: [ '../../css/animate.css' ],
  providers: [ SoapService ]

})


export class LoginComponent { 

  private user = new Usuario(); // Inicializa la variable
  private result : Respuesta;

  constructor(private soapService: SoapService, private router: Router) { 
    this.user.dni = '48774327';
    this.user.contrasena = '123456';
  }

  ngOnInit() {
     if(this.soapService.isLogged()){
       this.router.navigate(['/dashboard']);
     }
  }

  userLogin(){

  this.soapService.login("loginUsuario", this.user.dni, this.user.contrasena, function(result){
      
      if(result != null){

           if(result.code == 100){

              console.log("paseeee");
              window.localStorage.setItem("NullPointers_Key", "1sdf4safsadfsd874f89sd4f89");
              this.router.navigate(['/dashboard']);



           }else{
             alert("Usuario o Contraseña incorrectos");
           }

      }else{
        console.log("No se pudo recuperar la informacion");
      }

    });

  }

}











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