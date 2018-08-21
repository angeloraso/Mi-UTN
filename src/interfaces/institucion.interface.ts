export interface Opcion{
    nombre: string, // Nombre de la opcion
    icono: string, // Icono que acompaña a la opcion
    base_datos: string, // Base de datos donde se encuentra el documento con los detalles
    id_documento: string // Id del documento con los detalles
}

export interface Laboratorio{
    nombre: string, // Nombre del laboratorio Ej: CODAPLI
    subtitulo: string, // Descripcion del nombre si fuese necesario Ej: Codiseño Aplicado (CODAPLI)
    descripcion: string, // Descripcion de las actividades del laboratorio
    horario: string, // Horario de atencion del laboratorio
    fotos: Array<string>, // Arreglo con urls de fotos
    links: Array<string>, // Arreglo con links oficiales del laboratorio
}