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
exports.eliminar = exports.modificar = exports.insertarxCurso = exports.insertar = exports.buscarProfe = exports.buscarUnProfe = exports.consultarUno = exports.consultarTodos = exports.validarProfeMod = exports.validarProfexCurso = exports.validarProfe = void 0;
const conection_1 = require("../db/conection");
const ProfesorModel_1 = require("../models/ProfesorModel");
const CursoModel_1 = require("../models/CursoModel");
const express_validator_1 = require("express-validator");
const validarProfe = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío').isLength({ min: 3 }),
    (0, express_validator_1.check)('apellido').notEmpty().withMessage('El apellido no puede estar vacío').isLength({ min: 3 }),
    (0, express_validator_1.check)('email').notEmpty().withMessage('El email no puede estar vacío').isEmail(),
    (0, express_validator_1.check)('profesion').notEmpty().withMessage('La profesión no puede estar vacío').isLength({ min: 5 }),
    (0, express_validator_1.check)('telefono').notEmpty().withMessage('El teléfono no puede estar vacío').isInt().withMessage('El teléfono deben ser solo números'),
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        if (!errores.isEmpty()) {
            res.render('creaProfesores', {
                pagina: 'Crear Profesor',
                errores: errores.array()
            });
        }
        ;
        next();
    }
];
exports.validarProfe = validarProfe;
const validarProfexCurso = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío').isLength({ min: 3 }),
    (0, express_validator_1.check)('apellido').notEmpty().withMessage('El apellido no puede estar vacío').isLength({ min: 3 }),
    (0, express_validator_1.check)('email').notEmpty().withMessage('El email no puede estar vacío').isEmail(),
    (0, express_validator_1.check)('profesion').notEmpty().withMessage('La profesión no puede estar vacío').isLength({ min: 5 }),
    (0, express_validator_1.check)('telefono').notEmpty().withMessage('El teléfono no puede estar vacío').isInt().withMessage('El teléfono deben ser solo números'),
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        if (!errores.isEmpty()) {
            res.render('creaProfesoresCurso', {
                pagina: 'Crear Profesor',
                errores: errores.array()
            });
        }
        ;
        next();
    }
];
exports.validarProfexCurso = validarProfexCurso;
const validarProfeMod = () => [
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío').isLength({ min: 3 }),
    (0, express_validator_1.check)('apellido').notEmpty().withMessage('El apellido no puede estar vacío').isLength({ min: 3 }),
    (0, express_validator_1.check)('email').notEmpty().withMessage('El email no puede estar vacío').isEmail(),
    (0, express_validator_1.check)('profesion').notEmpty().withMessage('La profesión no puede estar vacío').isLength({ min: 5 }),
    (0, express_validator_1.check)('telefono').notEmpty().withMessage('El teléfono no puede estar vacío').isInt().withMessage('El teléfono deben ser solo números'),
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        if (!errores.isEmpty()) {
            res.render('capturaErroresMod', {
                pagina: 'Se detectaron errores al modificar el Profesor',
                fallas: errores.array()
            });
        }
        ;
        next();
    }
];
exports.validarProfeMod = validarProfeMod;
const profesorRepository = conection_1.AppDataSource.getRepository(ProfesorModel_1.Profesor);
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield profesorRepository.find();
        res.render('listarProfesores', {
            pagina: 'Lista de Profesores de la Universidad',
            profesores
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.consultarTodos = consultarTodos;
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesor = yield profesorRepository.findOneBy({ id: parseInt(req.params.id) });
        if (profesor) {
            return profesor;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.consultarUno = consultarUno;
const buscarUnProfe = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profe = yield profesorRepository.findOneBy({ id: id });
        if (profe) {
            return profe;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('No se ha encontrado el profesor');
        }
    }
});
exports.buscarUnProfe = buscarUnProfe;
const buscarProfe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield profesorRepository.find();
        if (profesores) {
            return profesores;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('No se ha encontrado el profesor');
        }
    }
});
exports.buscarProfe = buscarProfe;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.render('creaProfesores', {
            pagina: 'Crear Profesor',
            errores: errores.array()
        });
    }
    ;
    const { nombre, apellido, email, profesion, telefono } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const profesorRepository = transactionalEntityManager.getRepository(ProfesorModel_1.Profesor);
            const profesor = yield profesorRepository.findOne({ where: [{ email }] });
            if (profesor) {
                res.render('El profesor ya existe');
            }
            else {
                const agrego = profesorRepository.create({ nombre, apellido, email, profesion, telefono });
                const insertar = yield profesorRepository.save(agrego);
            }
        }));
        return res.redirect('/profesores/listarProfesores');
        /*const profesores = await profesorRepository.find();
        res.render('listarProfesores',{
            pagina: 'Lista de Profesores de la Universidad',
            profesores
        });*/
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
exports.insertar = insertar;
const insertarxCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.render('creaProfesoresCurso', {
            pagina: 'Crear Profesor',
            errores: errores.array()
        });
    }
    ;
    const { nombre, apellido, email, profesion, telefono } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const profesorRepository = transactionalEntityManager.getRepository(ProfesorModel_1.Profesor);
            const profesor = yield profesorRepository.findOne({ where: [{ email }] });
            if (profesor) {
                res.render('El profesor ya existe');
            }
            else {
                const agrego = profesorRepository.create({ nombre, apellido, email, profesion, telefono });
                const insertar = yield profesorRepository.save(agrego);
            }
        }));
        return res.redirect('/cursos/creaCursos');
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
exports.insertarxCurso = insertarxCurso;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty) {
        res.render('capturaErroresMod', {
            pagina: 'Se detectaron errores al modificar el Profesor',
            fallas: errores.mapped()
        });
    }
    try {
        const profesor = yield profesorRepository.findOneBy({ id: parseInt(req.params.id) });
        if (profesor) {
            profesorRepository.merge(profesor, req.body);
            const resultado = yield profesorRepository.save(profesor);
            return res.redirect('/profesores/listarProfesores');
        }
        else {
            res.json({ mensaje: 'No se ha encontrado el profesor para modificar' });
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
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const cursosRepository = transactionalEntityManager.getRepository(CursoModel_1.Curso);
            const profesorRepository = transactionalEntityManager.getRepository(ProfesorModel_1.Profesor);
            const tienecursos = yield cursosRepository.count({ where: { profesor: { id: parseInt(req.params.id) } } });
            if (tienecursos == 0) {
                const resultado = yield profesorRepository.delete({ id: parseInt(req.params.id) });
                if (resultado.affected == 1) {
                    return res.json({ mensaje: 'Profesor eliminado' });
                }
                else {
                    throw new Error('Profesor no encontrado');
                }
            }
            else {
                return res.json({ mensaje: 'El profesor está dando un curso - No se puede eliminar - Asegúrese se que se debe eliminar el curso' });
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
