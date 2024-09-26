import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/conection";
import { Curso } from "../models/CursoModel";
import { buscarProfe, buscarUnProfe } from "../controllers/ProfesorController";
import { buscarEstudiantes } from "./EstudianteController";
import { Profesor } from "../models/ProfesorModel";
import { CursoEstudiante } from "../models/CursoEstudianteModel";
import { check,validationResult } from "express-validator";

//var cursos:Curso[];

export const validarCurso = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
                   .isLength({min:5}).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    check('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
                        .isLength({min:5}).withMessage('La descripción debe tener al menos 5 caracteres'),
    async (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        const profesores = await repoProfe.find();
        if(!errores.isEmpty()){
            res.render('creaCursos',{
                pagina: 'Crear Curso',
                profesores,
                errores: errores.array()
                
            })
        };
        next();
    }
];

export const validarCursoxPro = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
                   .isLength({min:5}).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    check('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
                        .isLength({min:5}).withMessage('La descripción debe tener al menos 5 caracteres'),
    async (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        const profesores = await repoProfe.find();
        if(!errores.isEmpty()){
            res.render('creaProfesoresCurso',{
                pagina: 'Crear Curso',
                profesores,
                errores: errores.array()
                
            })
        };
        next();
    }
];

export const validarCursoxins = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
                   .isLength({min:5}).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    check('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
                        .isLength({min:5}).withMessage('La descripción debe tener al menos 5 caracteres'),
    async (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        const profesores = await repoProfe.find();
        if(!errores.isEmpty()){
            res.render('creaCursosIns',{
                pagina: 'Crear Curso',
                profesores,
                errores: errores.array()
                
            })
        };
        next();
    }
];

export const validarCursoMod = ()=>[
    check('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
                   .isLength({min:5}).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    check('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
                        .isLength({min:5}).withMessage('La descripción debe tener al menos 5 caracteres'),
    (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        //const profesores = await repoProfe.find();
        if(!errores.isEmpty()){
            res.render('capturaErroresMod',{
                pagina: 'Se han detectado errores en el ingreso de los datos',
                fallas: errores.array()
            })
        };
        next();
    }
]

const repoProfe = AppDataSource.getRepository(Profesor);
const cursoRepository = AppDataSource.getRepository(Curso);
export const consultarTodos = async (req:Request,res:Response):Promise<void>=>{
        try{
            
            const profesores = await repoProfe.find();
            const cursos = await cursoRepository.find();
            res.render('listarCursos',{
                pagina: 'Listado de cursos',
                cursos,
                profesores
            })
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
    }



    export const profesorxCurso = async(req:Request,res:Response):Promise<void>=>{
        
        try{
            const profesores = await repoProfe.find();
            const cursos = await cursoRepository.find();
            res.render('listarProfesoresxCurso',{
                pagina: 'Seleccionar el profesor para buscar sus cursos',
                profesores
            });
            
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
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
            res.render('capturaErrores',{
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
    }

export const buscarxProfesor = async(req:Request,res:Response):Promise<void>=>{
        
        try{
            const cursos = await cursoRepository.find();
            const profesores = await repoProfe.findBy({id:parseInt(req.body.id)});
            return res.render('listarProfesoresxCursoResult',{
                pagina: 'Cursos del profesor seleccionado',
                cursos,
                profesores
            })
            
        }catch(err:unknown){
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
    const profesores = await repoProfe.find();
        if(!errores.isEmpty()){
           return res.render('creaCursos',{
                    pagina: 'Crear Curso',
                    profesores,
                    errores: errores.array()
            });
        }
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
            return res.redirect('/cursos/listarCursos');
            /*const repoProfe = AppDataSource.getRepository(Profesor);
            const profesores = await repoProfe.find();
            const cursos = await cursoRepository.find();
            res.render('listarCursos',{
                pagina: 'Listado de Cursos',
                cursos,
                profesores
            });*/
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
    }

    export const insertarxIns = async (req:Request,res:Response):Promise<void>=>{
        const errores = validationResult(req);
        const profesores = await repoProfe.find();
            if(!errores.isEmpty()){
                return res.render('creaCursosIns',{
                    pagina: 'Crear Curso',
                    profesores,
                    errores: errores.array()
            });
        };
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
            return res.redirect('/inscripciones/creaInscripciones');
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
    }


export const modificar = async (req:Request,res:Response):Promise<void>=>{
    const errores = validationResult(req);
        //const profesores = await repoProfe.find();
    if(!errores.isEmpty){
        return res.render('capturaErroresMod',{
                pagina: 'Se han detectado errores en el ingreso de los datos',
                fallas: errores.mapped()
        })
    }
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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
    }

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
        try{
            await AppDataSource.transaction(async transactaonalEntityManager=>{
                const inscripcionRepository = transactaonalEntityManager.getRepository(CursoEstudiante);
                const cursoRepository = transactaonalEntityManager.getRepository(Curso);
                const tieneInscriptos = await inscripcionRepository.count({where: {curso:{id:parseInt(req.params.id)}}});
                if(tieneInscriptos == 0){
                    const resultado = await cursoRepository.delete({id:parseInt(req.params.id)});
                    if(resultado.affected == 1){
                        return res.json({mensaje: 'Curso eliminado'});
                    } else {
                        throw new Error('No se ha encontrado el curso');
                    }
                } else {
                    //throw new Error('El curso tiene estudiantes inscriptos - Elimine primero la inscripción ');
                    return res.json({mensaje:'El curso tiene estudiantes inscriptos - Elimine primero la inscripción'});
                }
            });
        }catch(err){
            if(err instanceof Error){
                res.status(500).send(err.message);
            }
        }
    }