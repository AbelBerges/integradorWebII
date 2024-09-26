import {NextFunction, Request, Response} from  "express";
import { AppDataSource } from "../db/conection";
import { Profesor } from "../models/ProfesorModel";
import { buscarxProfesor } from "./CursoController";
import { Curso } from "../models/CursoModel";
import { check, validationResult } from "express-validator";

export const validarProfe = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').isLength({min:3}),
    check('apellido').notEmpty().withMessage('El apellido no puede estar vacío').isLength({min:3}),
    check('email').notEmpty().withMessage('El email no puede estar vacío').isEmail(),
    check('profesion').notEmpty().withMessage('La profesión no puede estar vacío').isLength({min:5}),
    check('telefono').notEmpty().withMessage('El teléfono no puede estar vacío').isInt().withMessage('El teléfono deben ser solo números'),
    (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.render('creaProfesores',{
                pagina: 'Crear Profesor',
                errores: errores.array()
            });
        };
        next();
    }
]

export const validarProfexCurso = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').isLength({min:3}),
    check('apellido').notEmpty().withMessage('El apellido no puede estar vacío').isLength({min:3}),
    check('email').notEmpty().withMessage('El email no puede estar vacío').isEmail(),
    check('profesion').notEmpty().withMessage('La profesión no puede estar vacío').isLength({min:5}),
    check('telefono').notEmpty().withMessage('El teléfono no puede estar vacío').isInt().withMessage('El teléfono deben ser solo números'),
    (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.render('creaProfesoresCurso',{
                pagina: 'Crear Profesor',
                errores: errores.array()
            });
        };
        next();
    }
]

export const validarProfeMod = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío').isLength({min:3}),
    check('apellido').notEmpty().withMessage('El apellido no puede estar vacío').isLength({min:3}),
    check('email').notEmpty().withMessage('El email no puede estar vacío').isEmail(),
    check('profesion').notEmpty().withMessage('La profesión no puede estar vacío').isLength({min:5}),
    check('telefono').notEmpty().withMessage('El teléfono no puede estar vacío').isInt().withMessage('El teléfono deben ser solo números'),
    (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.render('capturaErroresMod',{
                pagina: 'Se detectaron errores al modificar el Profesor',
                fallas: errores.array()
            });
        };
        next();
    }
]

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
            res.render('No se ha encontrado el profesor');
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
    const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.render('creaProfesores',{
                pagina: 'Crear Profesor',
                errores: errores.array()
            });
        };
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
            });
            return res.redirect('/profesores/listarProfesores');
            /*const profesores = await profesorRepository.find();
            res.render('listarProfesores',{
                pagina: 'Lista de Profesores de la Universidad',
                profesores
            });*/
            
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la información',
                    falla: err.message
                });
            }
        }
    }


    export const insertarxCurso = async (req:Request,res:Response):Promise<void>=>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.render('creaProfesoresCurso',{
                pagina: 'Crear Profesor',
                errores: errores.array()
            });
        };
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
                return res.redirect('/cursos/creaCursos');
                
            }catch(err:unknown){
                if(err instanceof Error){
                    res.render('capturaErrores',{
                        pagina: 'Error en la grabación de la información',
                        falla: err.message
                    });
                }
            }
        }


export const modificar = async (req:Request,res:Response):Promise<void>=>{
    const errores = validationResult(req);
    if(!errores.isEmpty){
        res.render('capturaErroresMod',{
            pagina: 'Se detectaron errores al modificar el Profesor',
            fallas: errores.mapped()
        })
    }
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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la información',
                    falla: err.message
                });
            }
        }
    }

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
        try{
            await AppDataSource.transaction(async transactionalEntityManager=>{
                const cursosRepository = transactionalEntityManager.getRepository(Curso);
                const profesorRepository = transactionalEntityManager.getRepository(Profesor);
                const tienecursos = await cursosRepository.count({where: {profesor: {id:parseInt(req.params.id)}}});
                if(tienecursos == 0){
                    const resultado = await profesorRepository.delete({id:parseInt(req.params.id)});
                    if(resultado.affected == 1){
                        return res.json({mensaje:'Profesor eliminado'});
                    } else {
                        throw new Error('Profesor no encontrado');
                    }
                } else {
                    return res.json({mensaje: 'El profesor está dando un curso - No se puede eliminar - Asegúrese se que se debe eliminar el curso'})
                }
            });
        }catch(err:unknown){
           if(err instanceof Error){
            res.status(500).send(err.message);
           }
        } 
    }
