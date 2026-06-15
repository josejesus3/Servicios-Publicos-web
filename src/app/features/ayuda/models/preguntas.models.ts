export interface FromItem {
    id: number;
    titulo: string;
    respuesta: string;

}

export interface FromGrup{
    id: number;
    tema:string;
    preguntas:FromItem[]
}
