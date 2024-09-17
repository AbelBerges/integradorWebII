import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Curso } from "./CursoModel";
import { Estudiante } from "./EstudianteModel";

@Entity('cursos_estudiantes')
export class CursoEstudiante{
    @PrimaryColumn()
    curso_id:number;

    @PrimaryColumn()
    estudiante_id:number;

    @Column({type: "float"})
    nota: number;

    @CreateDateColumn()
    fecha: Date;

    @ManyToOne(()=>Estudiante,(estudiante)=>estudiante.cursos)
    @JoinColumn({name:'estudiante_id'})
    public estudiante:Estudiante;

    @ManyToOne(()=>Curso, (curso)=>curso.estudiantes)
    @JoinColumn({name:'curso_id'})
    public curso:Curso;
}