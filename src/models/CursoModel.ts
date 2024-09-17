import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, JoinTable} from 'typeorm';
import { Profesor } from './ProfesorModel';
import { Estudiante } from './EstudianteModel';

@Entity('cursos')
export class Curso{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;
    @Column({type:'text'})
    descripcion:string;
    
    @Column()
    profesor_id:number;

    @ManyToOne(()=>Profesor)
    @JoinColumn({name:'profesor_id'})
    profesor:Profesor;

    @ManyToMany(()=>Estudiante)
    @JoinTable({
        name:'cursos_estudiantes',
        joinColumn:{name:'curso_id',referencedColumnName:'id'},
        inverseJoinColumn:{name:'estudiante_id', referencedColumnName:'id'}
    })
    estudiantes:Estudiante[];
}