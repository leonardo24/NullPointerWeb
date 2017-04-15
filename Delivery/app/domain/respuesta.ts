export class Respuesta {
    constructor(
        public status: number, 
        public data: string, 
        public error: string
        ){}
}