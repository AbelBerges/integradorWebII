import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/conection";
import { Estudiante } from "../models/EstudianteModel";
import { buscarCursos } from "./CursoController";
import { CursoEstudiante } from "../models/CursoEstudianteModel";
import { check, checkSchema, validationResult } from "express-validator";
const estudianteRepository = AppDataSource.getRepository(Estudiante);

export const validar = ()=>[
    check('dni')
            .notEmpty().withMessage('El DNI no puede estar vacío')
            .isLength({min:7}).withMessage('El DNI tiene que tener 7 caracteres minímo')
            .isInt().withMessage('El DNI solo debe tener números enteros'),
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
                .isLength({min: 3}).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    check('apellido').notEmpty().withMessage('El apellido no puede estar vacío')
                .isLength({min: 3}).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    check('email').notEmpty().withMessage('El email no puede estar vacío')
                .isEmail().withMessage('Debe proporcionar un email válido'),
    (req:Request,res:Response,next:NextFunction)=>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.render('creaEstudiantes',{
                pagina: 'Crear Estudiante',
                errores: errores.array()
            });
        }
        next();
    }
]

export const validarxIns = ()=>[
    check('dni')
            .notEmpty().withMessage('El DNI no puede estar vacío')
            .isLength({min:7}).withMessage('El DNI tiene que tener 7 caracteres minímo')
            .isInt().withMessage('El DNI solo debe tener números enteros'),
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
                .isLength({min: 3}).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    check('apellido').notEmpty().withMessage('El apellido no puede estar vacío')
                .isLength({min: 3}).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    check('email').notEmpty().withMessage('El email no puede estar vacío')
                .isEmail().withMessage('Debe proporcionar un email válido'),
    (req:Request,res:Response,next:NextFunction)=>{
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.render('creaEstudiantesIns',{
                pagina: 'Crear Estudiante',
                errores: errores.array()
            });
        }
        next();
    }
]


export const validarMod = ()=>[
    check('dni')
            .notEmpty().withMessage('El DNI no puede estar vacío')
            .isLength({min:7}).withMessage('El DNI tiene que tener 7 caracteres minímo')
            .isInt().withMessage('El DNI solo debe tener números enteros'),
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
            .isLength({min: 3}).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    check('apellido').notEmpty().withMessage('El apellido no puede estar vacío')
            .isLength({min: 3}).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    check('email').notEmpty().withMessage('El email no puede estar vacío')
            .isEmail().withMessage('Debe proporcionar un email válido'),
    (req:Request,res:Response,next:NextFunction)=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        res.render('capturaErroresMod',{
            pagina: 'Se detectaron errores al modificar el estudiante',
            fallas: errores.array()
        });
    }
    next();
    }
];

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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
        //return unEstudiante;
    }

export const buscarUnEstudiante = async (idEst:number, res:Response):Promise<Estudiante | null | undefined>=>{
    try{
        const estudiante = await estudianteRepository.findOneBy({id:idEst});
        if(estudiante){
            return estudiante;
        } else {
            return null;
        }
    }catch(err:unknown){
        if(err instanceof Error){
            res.render('capturaErrores',{
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
}

export const buscarEstudiantes = async (req:Request,res:Response):Promise<Estudiante[] | null | undefined>=>{
    try{
        const estudiantes = await estudianteRepository.find();
        if(estudiantes){
            return estudiantes;
        } else {
            return null;
        }
    } catch(err:unknown){
        if(err instanceof Error){
            res.render('capturaErrores',{
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
}

export const insertar = async (req:Request,res:Response):Promise<void>=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
       return res.render('creaEstudiantes',{
            pagina: 'Crear Estudiante',
            errores: errores.array()
        });
    }

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
            return res.redirect('/estudiantes/listarEstudiantes');
            /*const estudiantes = await estudianteRepository.find();
            res.render('listarEstudiantes',{
                pagina: 'Lista de Estudiantes',
                estudiantes
            });*/
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de estudiante',
                    falla: err.message
                });
            }
        }
    }

    //probar si funciona como void
    export const insertarxIns = async (req:Request,res:Response):Promise<void>=>{
        const errores = validationResult(req);
            if(!errores.isEmpty()){
                return res.render('creaEstudiantesIns',{
                pagina: 'Crear Estudiante',
                errores: errores.array()
        });
    }
        const {dni,nombre,apellido,email} = req.body;
           try{
               await AppDataSource.transaction(async (transactionalEntityManager) =>{
                   const estudianteRepository = transactionalEntityManager.getRepository(Estudiante);
                   const existe = await estudianteRepository.findOne({where:[{dni},{email}]});
                   if(existe){
                       throw new Error('El estudiante ya existe');
                   } else {
                       const insertar = estudianteRepository.create({dni,nombre,apellido,email});
                       const resultado = await estudianteRepository.save(insertar);
                   }
               });
               const estudiantes = await estudianteRepository.find();
               const cursos = await buscarCursos(req,res);
               res.render('creaInscripciones',{
                   pagina: 'Creación de Inscripciones',
                   estudiantes,
                   cursos
               });
               //return estudiantes;
           }catch(err:unknown){
               if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de estudiante',
                    falla: err.message
                });
               }
           }
       }


export const modificar = async (req:Request,res:Response):Promise<void>=>{
    const errores = validationResult(req);
    if(!errores.isEmpty()){
       return res.render('capturaErroresMod',{
            pagina: 'Se detectaron errores al modificar el estudiante',
            fallas: errores.mapped()
        });
    }
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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de estudiante',
                    falla: err.message
                });
               }
        }
    }

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
        try{
            await AppDataSource.transaction(async transactionalEntityManager=>{
                const inscriptoRepository = transactionalEntityManager.getRepository(CursoEstudiante);
                const estudianteRepository = transactionalEntityManager.getRepository(Estudiante);
                const tieneCursos = await inscriptoRepository.count({where: {estudiante: {id:parseInt(req.params.id)}}});
                if (tieneCursos == 0){
                    const resultado = await estudianteRepository.delete({id:parseInt(req.params.id)});
                    if(resultado.affected == 1){
                        return res.json({mensaje: 'Estudiante eliminado'});
                    } else {
                        throw new Error('Estudiante no encontrado');
                    }
                } else {
                    //throw new Error('El estudiante está cursando materias - No se puede eliminar - Asegúrese de eliminar la inscripción antes')
                    return res.json({mensaje:'El estudiante está cursando materias - No se puede eliminar - Asegúrese de eliminar la inscripción antes'})
                }
            });
        }catch(err:unknown){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }
