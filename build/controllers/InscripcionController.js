"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminar = exports.modifica = exports.buscarUno = exports.agregar = exports.buscaxCurso = exports.buscaxCursoResult = exports.buscarxEstudianteResult = exports.buscarxEstudiante = exports.buscarTodos = exports.validarIns = void 0;
const CursoEstudianteModel_1 = require("../models/CursoEstudianteModel");
const EstudianteController_1 = require("./EstudianteController");
const CursoController_1 = require("./CursoController");
const conection_1 = require("../db/conection");
const express_validator_1 = require("express-validator");
const validarIns = () => [
    (0, express_validator_1.check)('nota').isFloat().withMessage('La nota debe tener un valor númerico '),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errores = (0, express_validator_1.validationResult)(req);
        const estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
        const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
        if (!errores.isEmpty()) {
            res.render('creaInscripciones', {
                pagina: 'Crear inscripción',
                errores: errores.array(),
                cursos,
                estudiantes
            });
        }
        ;
        next();
    })
];
exports.validarIns = validarIns;
const inscripcionRepository = conection_1.AppDataSource.getRepository(CursoEstudianteModel_1.CursoEstudiante);
const buscarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
        const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
        const inscripciones = yield inscripcionRepository.find();
        res.render('listarInscripciones', {
            pagina: 'Listado de las inscripciones',
            inscripciones,
            estudiantes,
            cursos
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
});
exports.buscarTodos = buscarTodos;
const buscarxEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
        //const cursos = await buscarCursos(req,res);
        //const cursoEstudiantes = await inscripcionRepository.findBy({estudiante_id:parseInt(req.body.id)});
        if (estudiantes) {
            res.render('buscarInscripcionesxEstudiante', {
                pagina: 'Seleccione el estudiante',
                estudiantes
            });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error al acceder a la información',
                falla: err.message
            });
        }
    }
});
exports.buscarxEstudiante = buscarxEstudiante;
const buscarxEstudianteResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
        const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
        const cursoEstudiantes = yield inscripcionRepository.findBy({ estudiante_id: parseInt(req.body.id) });
        if (cursoEstudiantes) {
            res.render('buscarInscripcionesxEstudianteResult', {
                pagina: 'Listado de las inscripciones del estudiante',
                cursoEstudiantes,
                cursos,
                estudiantes
            });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturarErrores', {
                pagina: 'Error al acceder a la infromación',
                falla: err.message
            });
        }
        ;
    }
});
exports.buscarxEstudianteResult = buscarxEstudianteResult;
const buscaxCursoResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursoEstudiantes = yield inscripcionRepository.findBy({ curso_id: parseInt(req.body.id) });
        console.log("seleccionado", cursoEstudiantes);
        const estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
        const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
        if (cursoEstudiantes) {
            res.render('buscarInscripcionesxCursoResult', {
                pagina: 'Listado de las inscripciones del curso seleccionado',
                cursoEstudiantes,
                estudiantes,
                cursos
            });
        }
        else {
            res.status(404).json({ mensaje: 'No se ha encontrado registros' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la información',
                falla: err.message
            });
        }
    }
});
exports.buscaxCursoResult = buscaxCursoResult;
const buscaxCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
        if (cursos) {
            res.render('buscarInscripcionesxCurso', {
                pagina: 'Listado de los cursos',
                cursos
            });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la información',
                falla: err.message
            });
        }
    }
});
exports.buscaxCurso = buscaxCurso;
/*export const buscarxEstudiante = async (req:Request,res:Response):Promise<void>=>{
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
  }*/
const agregar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    const estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
    const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
    if (!errores.isEmpty()) {
        res.render('creaInscripciones', {
            pagina: 'Crear inscripción',
            errores: errores.array(),
            cursos,
            estudiantes
        });
    }
    ;
    const { curso_id, estudiante_id, nota } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionaEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscripcionRepository = transactionaEntityManager.getRepository(CursoEstudianteModel_1.CursoEstudiante);
            const existe = yield inscripcionRepository.findOneBy({ curso_id: parseInt(curso_id), estudiante_id: parseInt(estudiante_id) });
            if (existe) {
                res.render('capturaErrores', {
                    pagina: 'Error en la grabación de estudiante',
                    falla: 'Esa inscripción ya existe '
                });
            }
            else {
                const agregar = inscripcionRepository.create({ curso_id, estudiante_id, nota });
                const resultado = yield inscripcionRepository.save(agregar);
            }
        }));
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
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la información',
                falla: err.message
            });
        }
    }
});
exports.agregar = agregar;
const buscarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { curso_id, estudiante_id } = req.params;
    try {
        const inscripcion = yield inscripcionRepository.findOneBy({ curso_id: parseInt(curso_id), estudiante_id: parseInt(estudiante_id) });
        if (inscripcion) {
            return inscripcion;
        }
        else {
            res.render('No se ha encontrado la inscripción');
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
});
exports.buscarUno = buscarUno;
const modifica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.render('creaInscripciones', {
            pagina: 'Crear inscripción',
            errores: errores.array()
        });
    }
    ;
    const { curso_id, estudiante_id } = req.params;
    const { nota } = req.body;
    try {
        const inscripcion = yield inscripcionRepository.findOneBy({ curso_id: parseInt(curso_id), estudiante_id: parseInt(estudiante_id) });
        if (inscripcion) {
            inscripcionRepository.merge(inscripcion, req.body);
            const salvar = yield inscripcionRepository.save(inscripcion);
            res.redirect('/inscripciones/listarInscripciones');
        }
        else {
            res.render('No se ha encontrado el curso');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
});
exports.modifica = modifica;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscripcionRepository = transactionalEntityManager.getRepository(CursoEstudianteModel_1.CursoEstudiante);
            const resultado = yield inscripcionRepository.delete({ curso_id: parseInt(req.params.curso_id), estudiante_id: parseInt(req.params.estudiante_id) });
            if (resultado.affected == 1) {
                return res.json({ mensaje: 'Inscripción eliminada' });
            }
            else {
                return res.json({ mensaje: 'No se ha podido eliminar la inscripción ' });
            }
        }));
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
});
exports.eliminar = eliminar;
