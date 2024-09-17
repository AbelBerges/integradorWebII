import { Request, Response } from "express";
import { AppDataSource } from "../db/conection";
import { Estudiante } from "../models/EstudianteModel";

const estudianteRepository = AppDataSource.getRepository(Estudiante);


export const consultarTodos = async (req:Request,res:Response):Promise<void>=>{
        try{
            const estudiantes = await estudianteRepository.find();
            //res.json(estudiantes);
            res.render('listarEstudiantes',{
                pagina: 'Lista de estudiantes',
                varnav: 'listar',
                estudiantes
            });
        }catch(err: unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const consultarUno = async (req:Request,res:Response): Promise<Estudiante | null | undefined> => {
        const idNumber:number = parseInt(req.params.id);
        try{
            //const estudianteRepository = AppDataSource.getRepository(Estudiante);
            const estudiante = await estudianteRepository.findOne({where: {id: idNumber}});
            if(estudiante){
                 //estudiante = unEstudiante;
                 return estudiante;
            } else {
                return null;
            }
           //return unEstudiante;
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
        //return unEstudiante;
    }

export const insertar = async (req:Request,res:Response):Promise<void>=>{
     const {dni,nombre,apellido,email} = req.body;
        try{
            await AppDataSource.transaction(async (transactionalEntityManager) =>{
                const estudianteRepository = transactionalEntityManager.getRepository(Estudiante);
                const existe = await estudianteRepository.findOne({where:[{dni},{email}]});
                //const existe = await estudianteRepository.findOne({where: {id:idNumber}});
                if(existe){
                    throw new Error('El estudiante ya existe');
                } else {
                    const insertar = estudianteRepository.create({dni,nombre,apellido,email});
                    const resultado = await estudianteRepository.save(insertar);
                }
            });
            const estudiantes = await estudianteRepository.find();
            res.render('listarEstudiantes',{
                pagina: 'Lista de Estudiantes',
                estudiantes
            });
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const modificar = async (req:Request,res:Response):Promise<void>=>{
        const {dni,nombre,apellido,email} = req.body;
        try{
            const elEstudiante = await estudianteRepository.findOneBy({id:parseInt(req.params.id)});
            if(elEstudiante){
                estudianteRepository.merge(elEstudiante, req.body);
                const resultado = await estudianteRepository.save(elEstudiante);
                //res.json(resultado);
                return res.redirect('/estudiantes/listarestudiantes');
            } else {
                res.status(400).json({mensaje:'No se ha encontrado el estudiante'});
            }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
        try{
            const estudiante = await estudianteRepository.findOneBy({id:parseInt(req.params.id)});
            if(estudiante){
                const resultado = await estudianteRepository.delete({id:parseInt(req.params.id)});
                res.json(resultado);
            } else {
                res.status(400).json({mensaje:'No se ha encontrado el estudiante'});
            }
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }
