import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Usuario } from '../domain/usuario';
import { Respuesta } from '../domain/respuesta';
//import 'rxjs/Rx';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LoginService {

    private url = "http://localhost:8095/v.1.0.0";
    private key = "NullPointers_Key";
    private options;    // Used for Post Parameters
    private logged: boolean;
   
    constructor(private http: Http){
        var headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: headers });
    }

    isLogged(): boolean{

        if(window.localStorage.getItem(this.key)){
            return true;
        }
        return false;

    }

   /* login(usuario, contrasena, ruc){


        var method: string = '/usuario/' + usuario + '/' + + contrasena + '/' + ruc;
        var body: string = 'usuario=' + usuario + '&' + 'contrasena=' + contrasena + '&' + 'ruc=' + ruc;

       return this.http.get(this.url + method, this.options)
                .toPromise()
                .then(response => {

                    if(response.json().status == 100){
                        window.localStorage.setItem(this.key, "1sdf4safsadfsd874f89sd4f89");
                        return response.json().data as string;
                    }else{
                        return null;
                    }
                    
                })
                .catch(error => error); 


    }*/

    getLogin(usuario, contrasena, ruc) : Observable<Respuesta> {

         let parameters =  '/usuario/' + usuario + '/' + contrasena + '/' + ruc;

         // ...using get request
         return this.http.get(this.url + parameters)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }


     getClientes() : Observable<Respuesta> {

         let parameters =  '/clientes/10487743271'

         // ...using get request
         return this.http.get(this.url + parameters)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }

     updateCliente(cliente) : Observable<Respuesta> {

         console.log(JSON.stringify(cliente));

         var headers_json = new Headers({ 'Content-Type': 'application/json' });
         var options = new RequestOptions({ headers: headers_json });

         let parameters =  '/cliente'

         
         //cliente.fecha_ingreso = dateFormat(cliente.fecha_ingreso, "yyyy/mm/dd");

         // ...using get request
         return this.http.put(this.url + parameters, JSON.stringify(cliente), options)
                        // ...and calling .json() on the response to return data
                         .map((res:Response) => res.json())
                         //...errors if any
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

     }
    

    
    logout(){
        window.localStorage.removeItem(this.key);
    }
    
    /*
    // Add a new comment
    addComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.commentsUrl, body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Update a comment
    updateComment (body: Object): Observable<Comment[]> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.put(`${this.commentsUrl}/${body['id']}`, body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   

    // Delete a comment
    removeComment (id:string): Observable<Comment[]> {
        return this.http.delete(`${this.commentsUrl}/${id}`) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }   
    */
}

