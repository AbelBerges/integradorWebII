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
exports.eliminar = exports.modificar = exports.insertarxIns = exports.insertar = exports.buscarEstudiantes = exports.buscarUnEstudiante = exports.consultarUno = exports.consultarTodos = exports.validar = void 0;
const conection_1 = require("../db/conection");
const EstudianteModel_1 = require("../models/EstudianteModel");
const CursoController_1 = require("./CursoController");
const CursoEstudianteModel_1 = require("../models/CursoEstudianteModel");
const express_validator_1 = require("express-validator");
const estudianteRepository = conection_1.AppDataSource.getRepository(EstudianteModel_1.Estudiante);
const validar = () => [
    (0, express_validator_1.check)('dni')
        .notEmpty().withMessage('El DNI no puede estar vacío')
        .isLength({ min: 7 }).withMessage('El DNI tiene que tener 7 caracteres minímo')
        .isInt().withMessage('El DNI solo debe tener números enteros'),
    (0, express_validator_1.check)('nombre').notEmpty().withMessage('El nombre no puede estar vacío')
        .isLength({ min: 3 }).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    (0, express_validator_1.check)('apellido').notEmpty().withMessage('El apellido no puede estar vacío')
        .isLength({ min: 3 }).withMessage('El apellido tiene que tener 3 caracteres mínimo'),
    (0, express_validator_1.check)('email').notEmpty().withMessage('El email no puede estar vacío')
        .isEmail().withMessage('Debe proporcionar un email válido'),
    (req, res, next) => {
        const errores = (0, express_validator_1.validationResult)(req);
        if (!errores.isEmpty()) {
            res.render('creaEstudiantes', {
                pagina: 'Crear Estudiante',
                errores: errores.array()
            });
        }
        next();
    }
];
exports.validar = validar;
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield estudianteRepository.find();
        //res.json(estudiantes);
        res.render('listarEstudiantes', {
            pagina: 'Lista de estudiantes',
            varnav: 'listar',
            estudiantes
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
const consultarUno = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idNumber = parseInt(req.params.id);
    try {
        //const estudianteRepository = AppDataSource.getRepository(Estudiante);
        const estudiante = yield estudianteRepository.findOne({ where: { id: idNumber } });
        if (estudiante) {
            //estudiante = unEstudiante;
            return estudiante;
        }
        else {
            return null;
        }
        //return unEstudiante;
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de la infromación',
                falla: err.message
            });
        }
    }
    //return unEstudiante;
});
exports.consultarUno = consultarUno;
const buscarUnEstudiante = (idEst, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiante = yield estudianteRepository.findOneBy({ id: idEst });
        if (estudiante) {
            return estudiante;
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
exports.buscarUnEstudiante = buscarUnEstudiante;
const buscarEstudiantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiantes = yield estudianteRepository.find();
        if (estudiantes) {
            return estudiantes;
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
exports.buscarEstudiantes = buscarEstudiantes;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.render('creaEstudiantes', {
            pagina: 'Crear Estudiante',
            errores: errores.array()
        });
    }
    const { dni, nombre, apellido, email } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const estudianteRepository = transactionalEntityManager.getRepository(EstudianteModel_1.Estudiante);
            const existe = yield estudianteRepository.findOne({ where: [{ dni }, { email }] });
            //const existe = await estudianteRepository.findOne({where: {id:idNumber}});
            if (existe) {
                throw new Error('El estudiante ya existe');
            }
            else {
                const insertar = estudianteRepository.create({ dni, nombre, apellido, email });
                const resultado = yield estudianteRepository.save(insertar);
            }
        }));
        return res.redirect('/estudiantes/listarEstudiantes');
        /*const estudiantes = await estudianteRepository.find();
        res.render('listarEstudiantes',{
            pagina: 'Lista de Estudiantes',
            estudiantes
        });*/
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de estudiante',
                falla: err.message
            });
        }
    }
});
exports.insertar = insertar;
//probar si funciona como void
const insertarxIns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        res.render('creaEstudiantesIns', {
            pagina: 'Crear Estudiante',
            errores: errores.array()
        });
    }
    const { dni, nombre, apellido, email } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const estudianteRepository = transactionalEntityManager.getRepository(EstudianteModel_1.Estudiante);
            const existe = yield estudianteRepository.findOne({ where: [{ dni }, { email }] });
            if (existe) {
                throw new Error('El estudiante ya existe');
            }
            else {
                const insertar = estudianteRepository.create({ dni, nombre, apellido, email });
                const resultado = yield estudianteRepository.save(insertar);
            }
        }));
        const estudiantes = yield estudianteRepository.find();
        const cursos = yield (0, CursoController_1.buscarCursos)(req, res);
        res.render('creaInscripciones', {
            pagina: 'Creación de Inscripciones',
            estudiantes,
            cursos
        });
        return estudiantes;
    }
    catch (err) {
        if (err instanceof Error) {
            res.render('capturaErrores', {
                pagina: 'Error en la grabación de estudiante',
                falla: err.message
            });
        }
    }
});
exports.insertarxIns = insertarxIns;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, nombre, apellido, email } = req.body;
    try {
        const elEstudiante = yield estudianteRepository.findOneBy({ id: parseInt(req.params.id) });
        if (elEstudiante) {
            estudianteRepository.merge(elEstudiante, req.body);
            const resultado = yield estudianteRepository.save(elEstudiante);
            //res.json(resultado);
            return res.redirect('/estudiantes/listarestudiantes');
        }
        else {
            res.status(400).json({ mensaje: 'No se ha encontrado el estudiante' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conection_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscriptoRepository = transactionalEntityManager.getRepository(CursoEstudianteModel_1.CursoEstudiante);
            const estudianteRepository = transactionalEntityManager.getRepository(EstudianteModel_1.Estudiante);
            const tieneCursos = yield inscriptoRepository.count({ where: { estudiante: { id: parseInt(req.params.id) } } });
            if (tieneCursos == 0) {
                const resultado = yield estudianteRepository.delete({ id: parseInt(req.params.id) });
                if (resultado.affected == 1) {
                    return res.json({ mensaje: 'Estudiante eliminado' });
                }
                else {
                    throw new Error('Estudiante no encontrado');
                }
            }
            else {
                //throw new Error('El estudiante está cursando materias - No se puede eliminar - Asegúrese de eliminar la inscripción antes')
                return res.json({ mensaje: 'El estudiante está cursando materias - No se puede eliminar - Asegúrese de eliminar la inscripción antes' });
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
