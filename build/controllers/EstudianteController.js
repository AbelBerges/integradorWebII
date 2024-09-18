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
exports.eliminar = exports.modificar = exports.insertar = exports.buscarEstudiantes = exports.buscarUnEstudiante = exports.consultarUno = exports.consultarTodos = void 0;
const conection_1 = require("../db/conection");
const EstudianteModel_1 = require("../models/EstudianteModel");
const estudianteRepository = conection_1.AppDataSource.getRepository(EstudianteModel_1.Estudiante);
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
            res.status(500).send(err.message);
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
            res.status(500).send(err.message);
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
            res.render(err.message);
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
            res.render(err.message);
        }
    }
});
exports.buscarEstudiantes = buscarEstudiantes;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const estudiantes = yield estudianteRepository.find();
        res.render('listarEstudiantes', {
            pagina: 'Lista de Estudiantes',
            estudiantes
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.insertar = insertar;
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
        const estudiante = yield estudianteRepository.findOneBy({ id: parseInt(req.params.id) });
        if (estudiante) {
            const resultado = yield estudianteRepository.delete({ id: parseInt(req.params.id) });
            res.json(resultado);
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
exports.eliminar = eliminar;
