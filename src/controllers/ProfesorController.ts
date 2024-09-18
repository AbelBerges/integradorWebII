import {Request, Response} from  "express";
import { AppDataSource } from "../db/conection";
import { Profesor } from "../models/ProfesorModel";

const profesorRepository = AppDataSource.getRepository(Profesor);
export const consultarTodos =  async (req:Request,res:Response):Promise<void>=>{
        try{
            const profesores = await profesorRepository.find();
            res.render('listarProfesores',{
                pagina: 'Lista de Profesores de la Universidad',
                profesores
            });
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const consultarUno = async (req:Request,res:Response):Promise<Profesor |null | undefined>=>{
        try{
            const profesor = await profesorRepository.findOneBy({id:parseInt(req.params.id)});
            if(profesor){
                return profesor;
            } else {
                return null;
            }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const buscarUnProfe = async (id:number,res:Response):Promise<Profesor | null | undefined>=>{
    try{
        const profe = await profesorRepository.findOneBy({id:id});
        if(profe){
            return profe;
        } else {
            return null;
        }
    } catch (err:unknown){
        if(err instanceof Error){
            res.render('No s eha encontrado el profesor');
        }
    }
}

export const buscarProfe = async (req:Request,res:Response):Promise<Profesor[] |null |undefined>=>{
    try{
        const profesores = await profesorRepository.find();
        if(profesores){
            return profesores;
        } else {
            return null;
        }
    }catch(err:unknown){
        if(err instanceof Error){
            res.render('No se ha encontrado el profesor');
        }
    }
}

 export const insertar = async (req:Request,res:Response):Promise<void>=>{
    const {nombre,apellido,email,profesion,telefono} =req.body;
        try{
            await AppDataSource.transaction(async(transactionalEntityManager)=>{
                const profesorRepository = transactionalEntityManager.getRepository(Profesor);
                const profesor = await profesorRepository.findOne({where:[{email}]});
                if(profesor){
                    res.render('El profesor ya existe');
                } else {
                    const agrego = profesorRepository.create({nombre,apellido,email,profesion,telefono});
                    const insertar = await profesorRepository.save(agrego);
                }
            })
            const profesores = await profesorRepository.find();
            res.render('listarProfesores',{
                pagina: 'Lista de Profesores de la Universidad',
                profesores
            });
            
        }catch(err:unknown){
            if(err instanceof Error){
                res.render(`Ha ocurrido un error ${err.message}`);
            }
        }
    }

export const modificar = async (req:Request,res:Response):Promise<void>=>{
        try{
            const profesor = await profesorRepository.findOneBy({id:parseInt(req.params.id)});
            if(profesor){
                profesorRepository.merge(profesor, req.body);
                const resultado = await profesorRepository.save(profesor);
                return res.redirect('/profesores/listarProfesores');
            } else {
                res.json({mensaje:'No se ha encontrado el profesor para modificar'});
            }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
        try{
            const profesor = await profesorRepository.findOneBy({id:parseInt(req.params.id)});
            if(profesor){
                const resultado = await profesorRepository.delete({id:parseInt(req.params.id)});
                res.json(resultado);
            } else {
                res.json({mensaje:'No se ha encontrado el profesor para eliminar '});
            }
        }catch(err:unknown){
           if(err instanceof Error){
            res.status(500).send(err.message);
           }
        } 
    }
