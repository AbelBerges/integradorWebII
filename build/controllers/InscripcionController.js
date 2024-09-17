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
exports.eliminar = exports.modifica = exports.buscarUno = exports.agregar = exports.buscarxEstudiante = exports.buscaxCurso = exports.buscarTodos = void 0;
const CursoEstudianteModel_1 = require("../models/CursoEstudianteModel");
const conection_1 = require("../db/conection");
const inscripcionRepository = conection_1.AppDataSource.getRepository(CursoEstudianteModel_1.CursoEstudiante);
const buscarTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inscripciones = yield inscripcionRepository.find();
        res.render('listarInscripciones', {
            pagina: 'Listado de las inscripciones',
            inscripciones
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.buscarTodos = buscarTodos;
const buscaxCurso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursos = yield inscripcionRepository.findBy({ curso_id: parseInt(req.params.id) });
        if (cursos) {
            res.render('listarInscripciones', {
                pagina: 'Listado del curso',
                cursos
            });
        }
        else {
            res.status(400).json({ mensaje: 'No se ha encontrado registros' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.buscaxCurso = buscaxCurso;
const buscarxEstudiante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursos = yield inscripcionRepository.findBy({ estudiante_id: parseInt(req.params.id) });
        if (cursos) {
            res.render('listarInscripciones', {
                pagina: 'Listado de cursos del estudiante',
                cursos
            });
        }
        else {
            res.json({ mensaje: 'No seha encontrado registros' });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.buscarxEstudiante = buscarxEstudiante;
const agregar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { curso_id, estudiante_id, nota } = req.body;
    try {
        yield conection_1.AppDataSource.transaction((transactionaEntityManager) => __awaiter(void 0, void 0, void 0, function* () {
            const inscripcionRepository = transactionaEntityManager.getRepository(CursoEstudianteModel_1.CursoEstudiante);
            const existe = yield inscripcionRepository.findOneBy({ curso_id: parseInt(curso_id), estudiante_id: parseInt(estudiante_id) });
            if (existe) {
                res.render('La inscripción a ese curso ya existe para ese estudiante');
            }
            else {
                const agregar = inscripcionRepository.create({ curso_id, estudiante_id, nota });
                const resultado = yield inscripcionRepository.save(agregar);
            }
        }));
        const inscripciones = yield inscripcionRepository.find();
        res.render('listarInscripciones', {
            pagina: 'Listar Inscxripciones',
            inscripciones
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
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
            res.render(err.message);
        }
    }
});
exports.buscarUno = buscarUno;
const modifica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            res.render(err.message);
        }
    }
});
exports.modifica = modifica;
const eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json('Elimino la inscripción');
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
});
exports.eliminar = eliminar;
