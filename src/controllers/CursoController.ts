import { Request, Response } from "express";
import { AppDataSource } from "../db/conection";
import { Curso } from "../models/CursoModel";
import { buscarProfe, buscarUnProfe } from "../controllers/ProfesorController";
import { Profesor } from "../models/ProfesorModel";

const cursoRepository = AppDataSource.getRepository(Curso);
export const consultarTodos = async (req:Request,res:Response):Promise<void>=>{
        try{
            const repoProfe = AppDataSource.getRepository(Profesor);
            const profesores = await repoProfe.find();
            const cursos = await cursoRepository.find();
            res.render('listarCursos',{
                pagina: 'Listado de cursos',
                cursos,
                profesores
            })
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const buscarCursos = async (req:Request,res:Response):Promise<Curso[] |null |undefined>=>{
    try{
        const cursos = await cursoRepository.find();
        if(cursos){
            return cursos;
        } else {
            return null;
        }
    }catch(err:unknown){
        if(err instanceof Error){
            res.status(500).json(err.message);
        }
    }
}

export const consultarUno = async (req:Request,res:Response):Promise<Curso | null |undefined>=>{
        const idNum:number = parseInt(req.params.id);
        try{
            const curso = await cursoRepository.findOne({where:{id:idNum}});
            if(curso){
                //console.log(curso.id);
                return curso;
            } else {
                return null;
            }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const buscarxProfesor = async(req:Request,res:Response):Promise<void>=>{
        const {profesor_id} = req.body;
        try{
            const cursos = cursoRepository.findBy({profesor_id});
            res.render('listarCursos',{
                pagina: 'Cursos del profesor',
                cursos
            })
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const insertar = async (req:Request,res:Response):Promise<void>=>{
        const {nombre,descripcion,profesor_id} = req.body;
        try{
            await AppDataSource.transaction(async(transactionalEntityManager)=>{
                const cursoRepository = transactionalEntityManager.getRepository(Curso);
                const existe = await cursoRepository.findOne({where:[{nombre}]});
                if(existe) {
                    res.render('Ya existe el curso');
                } else {
                    const curso = cursoRepository.create({nombre,descripcion,profesor_id});
                    const agregar = await cursoRepository.save(curso);
                }
                
            });
            const cursos = await cursoRepository.find();
            res.render('listarCursos',{
                pagina: 'Listado de Cursos',
                cursos
            })
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const modificar = async (req:Request,res:Response):Promise<void>=>{
        try{
           console.log("Ver el contenido de req.body ", req.body);
           const curso = await cursoRepository.findOneBy({id:parseInt(req.params.id)}); 
           if(curso){
            cursoRepository.merge(curso,req.body);
            const resultado = await cursoRepository.save(curso);
            return res.redirect('/cursos/listarCursos');
           } else {
            res.json({mensaje:'No se ha encontrado el curso'});
           }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
        try{
            const curso = await cursoRepository.findOneBy({id:parseInt(req.params.id)});
            if(curso){
                const resultado = await cursoRepository.delete({id:parseInt(req.params.id)});
                res.json(resultado);
            } else {
                res.json({mensaje:'No se ha encontrado el curso '});
            }
        }catch(err){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }