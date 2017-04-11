import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpService } from '../services/http.service';
import { Cliente } from '../domain/cliente';
import { Respuesta } from '../domain/respuesta';
import { DataTable } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'cliente',
    templateUrl: '../../templates/clientes.html'
})

export class ClienteComponent{

    private result : Respuesta;
    clients: Cliente[];
    private selected = new Cliente();
    private row = new Cliente();

    constructor(private loginService: LoginService, private httpService: HttpService) { 

    }

    ngOnInit() {
        this.obtenerClientes();
    }

    obtenerClientes(){

         this.loginService.getClientes()
                     .subscribe(
                        result => {
                        this.result = result;

                        console.log("Mi info : " + this.result.data);
                        this.clients = JSON.parse(this.result.data);
                     
                        },
                        err => {
                        console.log(err);
                        });

    }
    
    refresh(){
        this.obtenerClientes();
    }

    onRowSelect(event){

        this.row = Object.assign({}, event.data); // copiado
        this.selected = event.data;

         if (this.selected.sexo == 0){
            $("#masculino").addClass("active");
            $("#femenino").removeClass("active");
         } else{
            $("#masculino").removeClass("active");
            $("#femenino").addClass("active");
         } 

    }

    gender(sexo){
        this.selected.sexo = sexo;
    }
    
    onRowDblclick(event){
        console.log("doble click!");
        // SHOW MODAL
    }

    save(){

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
    }


    addModal(){
        //Mostrar Modal Vacio

         this.selected = new Cliente();
         $("#dni").removeAttr("disabled");
         $("#btnAdd").removeAttr("hidden");

         this.selected.sexo = 0;            // Sexo por default
         this.selected.contrasena = "factory";      // Contraseña por defecto
         this.selected.g_ruc = "10487743271";       // RUC POR DEFECTO
         
    }

    // CRUD

    add(){
        
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

    delete(){

        this.httpService.delete("/cliente", this.selected.id )
                         .subscribe(
                            result => {

                                this.result = result;

                                if(this.result.status == 100){
                                    
                                    var index = this.clients.map(function(x) {return x.id; }).indexOf(this.selected.id);
                                    if (index > -1) {
                                        this.clients.splice(index, 1);
                                    }
                                    this.selected = new Cliente();
                                
                                }

                                console.log("Mi info : " + this.result.status);

                            },
                            err => {
                                console.log(err);
                            });
        
    }

    updateDt(dt: DataTable) {
        dt.reset();
    }   

    cancel(){

        Object.assign(this.selected, this.row);
        this.selected = new Cliente();
    }
 
    
    obtenerEdad(Fecha){
        let elapsed = + new Date() - + new Date(Fecha);
        return Fecha == null ? "--" : Math.floor((elapsed) / 1000 / 60 / 60 / 24 / 365.25);
    }   

}