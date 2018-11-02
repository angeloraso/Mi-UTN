export interface Materia {
    nombre: string; // Nombre de la Materia
    periodo: string; // Anual, 1er Cuatrimestre, 2do Cuatrimestre
    modalidad?: string; // Presencial o Remota
    horas?: string; // Cantidad de horas de la electiva
    id_materia: string; // ID de la materia en la base de datos "materias"
    cursadas_para_cursar: Array<string>;
    finales_para_cursar: Array<string>;
    finales_para_rendir: Array<string>;
    cronogramas: Array<{ comision: string, dias_horarios: Array<string> }>;
    profesores: Array<string>;
    clases_consulta: Array<{dia_horario: string, profesor: string, aula: string}>;
    links: Array<{link: string, titulo: string}>;
}
