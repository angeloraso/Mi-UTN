
export interface Opcion {
    nombre: string; // Nombre de la opcion
    icono: string; // Icono que acompaña a la opcion
    base_datos: string; // Base de datos donde se encuentra el documento con los detalles
    id_documento: string; // Id del documento con los detalles
}

export interface Laboratorio {
    url_imagen_perfil: string; // Imagen de perfil para mostrar en el header del modal
    nombre: string; // Nombre del laboratorio Ej: CODAPLI
    subtitulo: string; // Descripcion del nombre si fuese necesario Ej: Codiseño Aplicado (CODAPLI)
    tipo_modal: string; // String que define el tipo de modal. Ej: laboratorio
    descripcion: string; // Descripcion de las actividades del laboratorio
    horario: string; // Horario de atencion del laboratorio
    fotos: Array<string>; // Arreglo con urls de fotos
    emails: Array<string>; // Arreglo de emails de contacto
    links: Array<{titulo: string, link: string, icono: string}>; // Arreglo con links oficiales del laboratorio
}

export interface Deporte {
    url_imagen_perfil: string; // Imagen de perfil para mostrar en el header del modal
    nombre: string; // Nombre del deporte. Ej Futbol
    subtitulo: string; // Detalle del deporte. Ej Masculino y Femenino
    tipo_modal: string; // String que define el tipo de modal a utilizar
    descripcion: string; // Mensaje sobre la actividad
    fotos: Array<string>; // Fotos sobre la actividad
    emails: Array<string>; // Emails de contacto
    links: Array<{ titulo: string, link: string, icono: string}>; // Enlaces de contacto
    informacion: [
        {
            genero: string; // Subdivision dentro del deporte. Ej Femenino
            cronograma: [
                {
                    ubicacion: string; // Donde se realiza la actividad
                    dias_horarios: string[] // Dias y horarios de la actividad
                }
            ]
        }
    ];
}

export interface Proyecto {
    url_imagen_perfil: string; // Imagen de perfil para mostrar en el header del modal
    nombre: string; // Nombre del proyecto
    subitutlo: string; // Temática del proyecto. Ej: Programacion, Investigacion, etc
    nombre_completo: string; // Nombre completo del proyecto. Sin siglas
    tipo_modal: string; // String que define que modal utilizar
    descripcion: string; // Descripcion del proyecto
    prestaciones: string; // Objetivo del proyecto
    emails: Array<{profesor: string, email: string}>; // Correos de contacto
}

export interface UrlOpcion {
    titulo: string;
    url: string;
    mensaje: string;
}

export interface CalendarioAnual {
    anio: string;
    cronograma: Array<{
        fecha: string,
        icono: string,
        color: string,
        descripcion: string,
    }>;
}

export interface TokenComedor {
  nombre: string;
  apellido: string;
  token: string;
  especialidad: string;
  documento: string;
}
