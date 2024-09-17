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
exports.eliminar = exports.modificar = exports.insertar = exports.consultarUno = exports.consultarTodos = void 0;
const conection_1 = require("../db/conection");
const ProfesorModel_1 = require("../models/ProfesorModel");
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
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const profesores = yield profesorRepository.find();
        res.render('listarProfesores', {
            pagina: 'Lista de Profesores de la Universidad',
            profesores
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.render(`Ha ocurrido un error ${err.message}`);
        }
    }
});
exports.insertar = insertar;
const modificar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            res.status(500).send(err.message);
        }
    }
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesor = yield profesorRepository.findOneBy({ id: parseInt(req.params.id) });
        if (profesor) {
            const resultado = yield profesorRepository.delete({ id: parseInt(req.params.id) });
            res.json(resultado);
        }
        else {
            res.json({ mensaje: 'No se ha encontrado el profesor para eliminar ' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.eliminar = eliminar;
