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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InscripcionController_1 = require("../controllers/InscripcionController");
const EstudianteController_1 = require("../controllers/EstudianteController");
const CursoController_1 = require("../controllers/CursoController");
const rutas = express_1.default.Router();
rutas.get("/listarInscripciones", InscripcionController_1.buscarTodos);
rutas.get("/creaInscripciones", (req, res) => {
    res.render('creaInscripciones', {
        pagina: 'Creación de Inscripciones'
    });
});
rutas.post("/", InscripcionController_1.agregar);
rutas.get("/modificarInscripcion/:curso_id/:estudiante_id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inscripcion = yield (0, InscripcionController_1.buscarUno)(req, res);
        if (inscripcion) {
            const estud = yield (0, EstudianteController_1.buscarUnEstudiante)(inscripcion.estudiante_id, res);
            var unEstudiante = (estud === null || estud === void 0 ? void 0 : estud.nombre) + ', ' + (estud === null || estud === void 0 ? void 0 : estud.apellido);
            var cursos = yield (0, CursoController_1.buscarCursos)(req, res);
            var estudiantes = yield (0, EstudianteController_1.buscarEstudiantes)(req, res);
            res.render('modificaInscripcion', {
                pagina: 'Modificación de la inscripción',
                inscripcion,
                cursos,
                unEstudiante,
                estudiantes
            });
        }
        else {
            res.render('No se ha encontrado la inscripción');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render(err.message);
        }
    }
}));
rutas.route("/:curso_id/:estudiante_id").put(InscripcionController_1.modifica);
rutas.get("/xCurso/:id", InscripcionController_1.buscaxCurso);
rutas.get("/xEstudiante/:id", InscripcionController_1.buscarxEstudiante);
rutas.route("/:id")
    .delete(InscripcionController_1.eliminar);
exports.default = rutas;
