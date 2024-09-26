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
exports.eliminar = exports.modificar = exports.insertarxIns = exports.insertar = exports.buscarxProfesor = exports.consultarUno = exports.buscarCursos = exports.profesorxCurso = exports.consultarTodos = exports.validarCursoMod = exports.validarCursoxins = exports.validarCursoxPro = exports.validarCurso = void 0;
const conection_1 = require("../db/conection");
const CursoModel_1 = require("../models/CursoModel");
const ProfesorModel_1 = require("../models/ProfesorModel");
const CursoEstudianteModel_1 = require("../models/CursoEstudianteModel");
const express_validator_1 = require("express-validator");
//var cursos:Curso[];
const validarCurso = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 5 }).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    (0, express_validator_1.check)('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
        .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errores = (0, express_validator_1.validationResult)(req);
        const profesores = yield repoProfe.find();
        if (!errores.isEmpty()) {
            res.render('creaCursos', {
                pagina: 'Crear Curso',
                profesores,
                errores: errores.array()
            });
        }
        ;
        next();
    })
];
exports.validarCurso = validarCurso;
const validarCursoxPro = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 5 }).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    (0, express_validator_1.check)('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
        .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errores = (0, express_validator_1.validationResult)(req);
        const profesores = yield repoProfe.find();
        if (!errores.isEmpty()) {
            res.render('creaProfesoresCurso', {
                pagina: 'Crear Curso',
                profesores,
                errores: errores.array()
            });
        }
        ;
        next();
    })
];
exports.validarCursoxPro = validarCursoxPro;
const validarCursoxins = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 5 }).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    (0, express_validator_1.check)('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
        .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errores = (0, express_validator_1.validationResult)(req);
        const profesores = yield repoProfe.find();
        if (!errores.isEmpty()) {
            res.render('creaCursosIns', {
                pagina: 'Crear Curso',
                profesores,
                errores: errores.array()
            });
        }
        ;
        next();
    })
];
exports.validarCursoxins = validarCursoxins;
const validarCursoMod = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 5 }).withMessage('El nombre tiene que tener al menos 5 caracteres'),
    (0, express_validator_1.check)('descripcion').notEmpty().withMessage('La descripción no puede estar vacía')
        .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        //const profesores = await repoProfe.find();
        if (!errores.isEmpty()) {
            res.render('capturaErroresMod', {
                pagina: 'Se han detectado errores en el ingreso de los datos',
                fallas: errores.array()
            });
        }
        ;
        next();
    }
];
exports.validarCursoMod = validarCursoMod;
const repoProfe = conection_1.AppDataSource.getRepository(ProfesorModel_1.Profesor);
const cursoRepository = conection_1.AppDataSource.getRepository(CursoModel_1.Curso);
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield repoProfe.find();
        const cursos = yield cursoRepository.find();
        res.render('listarCursos', {
            pagina: 'Listado de cursos',
            cursos,
            profesores
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
exports.consultarTodos = consultarTodos;
const profesorxCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield repoProfe.find();
        const cursos = yield cursoRepository.find();
        res.render('listarProfesoresxCurso', {
            pagina: 'Seleccionar el profesor para buscar sus cursos',
            profesores
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
exports.profesorxCurso = profesorxCurso;
const buscarCursos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursos = yield cursoRepository.find();
        if (cursos) {
            return cursos;
        }
        else {
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
exports.buscarCursos = buscarCursos;
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idNum = parseInt(req.params.id);
    try {
        const curso = yield cursoRepository.findOne({ where: { id: idNum } });
        if (curso) {
            //console.log(curso.id);
            return curso;
        }
        else {
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
exports.consultarUno = consultarUno;
const buscarxProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursos = yield cursoRepository.find();
        const profesores = yield repoProfe.findBy({ id: parseInt(req.body.id) });
        return res.render('listarProfesoresxCursoResult', {
            pagina: 'Cursos del profesor seleccionado',
            cursos,
            profesores
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
exports.buscarxProfesor = buscarxProfesor;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    const profesores = yield repoProfe.find();
    if (!errores.isEmpty()) {
        return res.render('creaCursos', {
            pagina: 'Crear Curso',
            profesores,
            errores: errores.array()
        });
    }
    const { nombre, descripcion, profesor_id } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const cursoRepository = transactionalEntityManager.getRepository(CursoModel_1.Curso);
            const existe = yield cursoRepository.findOne({ where: [{ nombre }] });
            if (existe) {
                res.render('Ya existe el curso');
            }
            else {
                const curso = cursoRepository.create({ nombre, descripcion, profesor_id });
                const agregar = yield cursoRepository.save(curso);
            }
        }));
        return res.redirect('/cursos/listarCursos');
        /*const repoProfe = AppDataSource.getRepository(Profesor);
        const profesores = await repoProfe.find();
        const cursos = await cursoRepository.find();
        res.render('listarCursos',{
            pagina: 'Listado de Cursos',
            cursos,
            profesores
        });*/
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
exports.insertar = insertar;
const insertarxIns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    const profesores = yield repoProfe.find();
    if (!errores.isEmpty()) {
        return res.render('creaCursosIns', {
            pagina: 'Crear Curso',
            profesores,
            errores: errores.array()
        });
    }
    ;
    const { nombre, descripcion, profesor_id } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const cursoRepository = transactionalEntityManager.getRepository(CursoModel_1.Curso);
            const existe = yield cursoRepository.findOne({ where: [{ nombre }] });
            if (existe) {
                res.render('Ya existe el curso');
            }
            else {
                const curso = cursoRepository.create({ nombre, descripcion, profesor_id });
                const agregar = yield cursoRepository.save(curso);
            }
        }));
        return res.redirect('/inscripciones/creaInscripciones');
        /*const estudiantes = await buscarEstudiantes(req,res);
        const cursos = await cursoRepository.find();
        res.render('creaInscripciones',{
            pagina: 'Creación de Inscripciones',
            cursos,
            estudiantes
        });
        return cursos;*/
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
exports.insertarxIns = insertarxIns;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    //const profesores = await repoProfe.find();
    if (!errores.isEmpty) {
        return res.render('capturaErroresMod', {
            pagina: 'Se han detectado errores en el ingreso de los datos',
            fallas: errores.mapped()
        });
    }
    try {
        console.log("Ver el contenido de req.body ", req.body);
        const curso = yield cursoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (curso) {
            cursoRepository.merge(curso, req.body);
            const resultado = yield cursoRepository.save(curso);
            return res.redirect('/cursos/listarCursos');
        }
        else {
            res.json({ mensaje: 'No se ha encontrado el curso' });
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
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conection_1.AppDataSource.transaction((transactaonalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscripcionRepository = transactaonalEntityManager.getRepository(CursoEstudianteModel_1.CursoEstudiante);
            const cursoRepository = transactaonalEntityManager.getRepository(CursoModel_1.Curso);
            const tieneInscriptos = yield inscripcionRepository.count({ where: { curso: { id: parseInt(req.params.id) } } });
            if (tieneInscriptos == 0) {
                const resultado = yield cursoRepository.delete({ id: parseInt(req.params.id) });
                if (resultado.affected == 1) {
                    return res.json({ mensaje: 'Curso eliminado' });
                }
                else {
                    throw new Error('No se ha encontrado el curso');
                }
            }
            else {
                //throw new Error('El curso tiene estudiantes inscriptos - Elimine primero la inscripción ');
                return res.json({ mensaje: 'El curso tiene estudiantes inscriptos - Elimine primero la inscripción' });
            }
        }));
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.eliminar = eliminar;
