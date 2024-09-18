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
exports.eliminar = exports.modificar = exports.insertar = exports.buscarxProfesor = exports.consultarUno = exports.buscarCursos = exports.consultarTodos = void 0;
const conection_1 = require("../db/conection");
const CursoModel_1 = require("../models/CursoModel");
const ProfesorModel_1 = require("../models/ProfesorModel");
const cursoRepository = conection_1.AppDataSource.getRepository(CursoModel_1.Curso);
const consultarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repoProfe = conection_1.AppDataSource.getRepository(ProfesorModel_1.Profesor);
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
            res.status(500).send(err.message);
        }
    }
});
exports.consultarTodos = consultarTodos;
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
            res.status(500).json(err.message);
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
            res.status(500).send(err.message);
        }
    }
});
exports.consultarUno = consultarUno;
const buscarxProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { profesor_id } = req.body;
    try {
        const cursos = cursoRepository.findBy({ profesor_id });
        res.render('listarCursos', {
            pagina: 'Cursos del profesor',
            cursos
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.buscarxProfesor = buscarxProfesor;
const insertar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const cursos = yield cursoRepository.find();
        res.render('listarCursos', {
            pagina: 'Listado de Cursos',
            cursos
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
            res.status(500).send(err.message);
        }
    }
});
exports.modificar = modificar;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const curso = yield cursoRepository.findOneBy({ id: parseInt(req.params.id) });
        if (curso) {
            const resultado = yield cursoRepository.delete({ id: parseInt(req.params.id) });
            res.json(resultado);
        }
        else {
            res.json({ mensaje: 'No se ha encontrado el curso ' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.eliminar = eliminar;
