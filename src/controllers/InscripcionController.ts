import { Request, Response } from "express";
import { CursoEstudiante } from "../models/CursoEstudianteModel";
import { buscarEstudiantes } from "./EstudianteController";
import { buscarCursos } from "./CursoController";
import { AppDataSource } from "../db/conection";
const inscripcionRepository = AppDataSource.getRepository(CursoEstudiante);
export const buscarTodos = async (req:Request,res:Response):Promise<void>=>{
        try{
            const estudiantes = await buscarEstudiantes(req,res);
            const cursos = await buscarCursos(req,res);
            const inscripciones = await inscripcionRepository.find();
            res.render('listarInscripciones',{
                pagina: 'Listado de las inscripciones',
                inscripciones,
                estudiantes,
                cursos
            });
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const buscaxCurso = async (req:Request,res:Response):Promise<void>=>{
        try{
            const cursos = await inscripcionRepository.findBy({curso_id:parseInt(req.params.id)});
            if(cursos){
                res.render('listarInscripciones',{
                    pagina: 'Listado del curso',
                    cursos
                })
            } else {
                res.status(400).json({mensaje:'No se ha encontrado registros'});
            }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const buscarxEstudiante = async (req:Request,res:Response):Promise<void>=>{
        try{
           const cursos = await inscripcionRepository.findBy({estudiante_id:parseInt(req.params.id)});
           if(cursos){
                res.render('listarInscripciones',{
                    pagina: 'Listado de cursos del estudiante',
                    cursos
                })
           } else {
            res.json({mensaje:'No seha encontrado registros'});
           }
            
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
  }


export const agregar = async (req:Request,res:Response):Promise<void>=>{
    const {curso_id,estudiante_id,nota} = req.body;
        try{
            await AppDataSource.transaction(async(transactionaEntityManager)=>{
                const inscripcionRepository = transactionaEntityManager.getRepository(CursoEstudiante);
                const existe = await inscripcionRepository.findOneBy({curso_id:parseInt(curso_id),estudiante_id:parseInt(estudiante_id)});
                if(existe){
                    res.render('La inscripción a ese curso ya existe para ese estudiante');
                } else {
                    const agregar = inscripcionRepository.create({curso_id,estudiante_id,nota});
                    const resultado = await inscripcionRepository.save(agregar);      
                }
            });
            const estudiantes = await buscarEstudiantes(req,res);
            const cursos = await buscarCursos(req,res);
            const inscripciones = await inscripcionRepository.find();
            res.render('listarInscripciones',{
                pagina: 'Listar Inscripciones',
                inscripciones,
                estudiantes,
                cursos
            })
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const buscarUno = async (req:Request,res:Response):Promise<CursoEstudiante | null | undefined>=>{
    const {curso_id, estudiante_id} = req.params;
    try{
        const inscripcion = await inscripcionRepository.findOneBy({curso_id:parseInt(curso_id),estudiante_id:parseInt(estudiante_id)});
        if(inscripcion){
            return inscripcion;
        } else {
            res.render('No se ha encontrado la inscripción');
            return null;
        }
    }catch(err:unknown){
        if(err instanceof Error){
            res.render(err.message);
        }
    }
}

export const modifica = async (req:Request,res:Response):Promise<void>=>{
    const {curso_id,estudiante_id} = req.params;
    const {nota} = req.body; 
    try{
        const inscripcion = await inscripcionRepository.findOneBy({curso_id:parseInt(curso_id),estudiante_id:parseInt(estudiante_id)});
        if(inscripcion){
            inscripcionRepository.merge(inscripcion,req.body);
            const salvar = await inscripcionRepository.save(inscripcion);
            res.redirect('/inscripciones/listarInscripciones');
        } else {
            res.render('No se ha encontrado el curso');
        }
    } catch(err:unknown){
        if(err instanceof Error){
            res.render(err.message);
        }
    }
}

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
    try{
        res.json('Elimino la inscripción')
    }catch(err:unknown){
        if(err instanceof Error){
            res.status(500).send(err.message);
        }
    }
}