import { NextFunction, Request, Response } from "express";
import { CursoEstudiante } from "../models/CursoEstudianteModel";
import { buscarEstudiantes } from "./EstudianteController";
import { buscarCursos, consultarTodos } from "./CursoController";
import { AppDataSource } from "../db/conection";
import { check, validationResult } from "express-validator";
import { Curso } from "../models/CursoModel";


export const validarIns = ()=>[
    check('nota').isFloat().withMessage('La nota debe tener un valor númerico '),
    async (req:Request,res:Response,next: NextFunction)=>{
        const errores = validationResult(req);
        const estudiantes = await buscarEstudiantes(req,res);
        const cursos = await buscarCursos(req,res);
        if(!errores.isEmpty()){
            res.render('creaInscripciones',{
                pagina: 'Crear inscripción',
                errores: errores.array(),
                cursos,
                estudiantes
            });
        };
        next();
    }
];

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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
    }

export const buscarInscripcionxCurso = async (req:Request,res:Response):Promise<void>=>{
    try{

    } catch(err:unknown){
        if(err instanceof Error){
            res.render('capturaErrores',{
                pagina: 'Error al acceder a la información',
                falla: err.message
            })
        }
    }
}


export const buscaxCursoResult = async (req:Request,res:Response):Promise<void>=>{
        try{
            const cursoEstudiantes = await inscripcionRepository.findBy({curso_id:parseInt(req.body.id)});
            console.log("seleccionado",cursoEstudiantes);
            const estudiantes = await buscarEstudiantes(req,res);
            const cursos = await buscarCursos(req,res);
            if(cursoEstudiantes){
                res.render('buscarInscripcionesxCursoResult',{     ///Modificar la pagina
                    pagina: 'Listado de las inscripciones del curso seleccionado',
                    cursoEstudiantes,
                    estudiantes,
                    cursos
                })
            } else {
                res.status(404).json({mensaje:'No se ha encontrado registros'});
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

    export const buscaxCurso = async (req:Request,res:Response):Promise<void>=>{
        try{
            const cursos = await buscarCursos(req,res);
            if(cursos){
                res.render('buscarInscripcionesxCurso',{
                    pagina: 'Listado de los cursos',
                    cursos
                })
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
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la infromación',
                    falla: err.message
                });
            }
        }
  }


export const agregar = async (req:Request,res:Response):Promise<void>=>{
    const errores = validationResult(req);
    const estudiantes = await buscarEstudiantes(req,res);
    const cursos = await buscarCursos(req,res);
        if(!errores.isEmpty()){
            res.render('creaInscripciones',{
                pagina: 'Crear inscripción',
                errores: errores.array(),
                cursos,
                estudiantes
            });
        };
    const {curso_id,estudiante_id,nota} = req.body;
        try{
            await AppDataSource.transaction(async(transactionaEntityManager)=>{
                const inscripcionRepository = transactionaEntityManager.getRepository(CursoEstudiante);
                const existe = await inscripcionRepository.findOneBy({curso_id:parseInt(curso_id),estudiante_id:parseInt(estudiante_id)});
                if(existe){
                    res.render('capturaErrores',{
                        pagina: 'Error en la grabación de estudiante',
                        falla: 'Esa inscripción ya existe '
                    });
                } else {
                    const agregar = inscripcionRepository.create({curso_id,estudiante_id,nota});
                    const resultado = await inscripcionRepository.save(agregar);      
                }
            });
            res.redirect('/inscripciones/listarInscripciones');
            //const estudiantes = await buscarEstudiantes(req,res);
            //const cursos = await buscarCursos(req,res);
            /*const inscripciones = await inscripcionRepository.find();
            res.render('listarInscripciones',{
                pagina: 'Listar Inscripciones',
                inscripciones,
                estudiantes,
                cursos
            })*/
        }catch(err:unknown){
            if(err instanceof Error){
                res.render('capturaErrores',{
                    pagina: 'Error en la grabación de la información',
                    falla: err.message
                });
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
            res.render('capturaErrores',{
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
}

export const modifica = async (req:Request,res:Response):Promise<void>=>{
    const errores = validationResult(req);
        if(!errores.isEmpty()){
            res.render('creaInscripciones',{
                pagina: 'Crear inscripción',
                errores: errores.array()
            });
        };
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
            res.render('capturaErrores',{
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
}

export const eliminar = async (req:Request,res:Response):Promise<void>=>{
    try{
        await AppDataSource.transaction(async transactionalEntityManager=>{
            const inscripcionRepository = transactionalEntityManager.getRepository(CursoEstudiante);
            const resultado = await inscripcionRepository.delete({curso_id:parseInt(req.params.curso_id),estudiante_id:parseInt(req.params.estudiante_id)});
            if(resultado.affected == 1){
                return res.json({mensaje: 'Inscripción eliminada'});
            } else {
                return res.json({mensaje: 'No se ha podido eliminar la inscripción '});
            }
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