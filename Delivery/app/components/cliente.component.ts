import { Component } from '@angular/core';
import { SoapService } from '../services/soap.service';
import { Cliente } from '../domain/cliente';
import { Producto } from '../domain/producto';
import { DataTable } from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: 'cliente',
    templateUrl: '../../templates/clientes.html'
})

export class ClienteComponent{

    productos: Producto[];
    private selected = new Producto();
    private row = new Cliente();

    constructor(private soapService: SoapService) { 

    }

    ngOnInit() {
        this.obtenerClientes();
    }

    obtenerClientes(){

           this.soapService.obtenerProductos("ListarProductos")
                .subscribe(
                  result => {
                    console.log(result);
                    this.productos = JSON.parse(result);
                  },
                  err => {
                  console.log(err);
                  });

    }

    refresh(){
        this.obtenerClientes();
    }

    status(estado){
        this.selected.Estado = estado;
    }

    onRowSelect(event){

        this.row = Object.assign({}, event.data); // copiado
        this.selected = event.data;
        console.log(this.selected.Id);
        
    }

    add(){

        console.log(this.selected);
        
        this.soapService.anadirProducto("CrearProducto", this.selected)
            .subscribe(
                result => {
                console.log(result);

                var insertado : Producto = JSON.parse(result);

                this.selected.Id = insertado.Id;
                this.productos.push(this.selected);    
                this.selected = new Producto();

                $('#myModal').modal('hide');

                },
                err => {
                console.log(err);
                });
        
    }

    delete(){

        this.soapService.eliminarProducto("EliminarProducto", this.selected.Id)
            .subscribe(
                result => {
                console.log(result);

                var index = this.productos.map(function(x) {return x.Id; }).indexOf(this.selected.Id);
                if (index > -1) {
                    this.productos.splice(index, 1);
                }
                this.selected = new Producto();

                },
                err => {
                console.log(err);
                });

        
    }

    onRowDblclick(event){
        console.log("doble click!");
        // SHOW MODAL
    }

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


    addModal(){
        //Mostrar Modal Vacio

         this.selected = new Producto();
         $("#activo").addClass("active");

         this.selected.CategoriaId = 1;
         this.selected.Estado = 1;            // Sexo por default
         //this.selected.contrasena = "factory";      // Contraseña por defecto
         //this.selected.g_ruc = "10487743271";       // RUC POR DEFECTO
         
    }

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

    */

    updateDt(dt: DataTable) {
        dt.reset();
    }   

    cancel(){
        Object.assign(this.selected, this.row);
        this.selected = new Producto();
    }
 
}