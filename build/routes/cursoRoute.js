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
const CursoController_1 = require("../controllers/CursoController");
const ProfesorController_1 = require("../controllers/ProfesorController");
const rutas = express_1.default.Router();
rutas.get("/listarCursos", CursoController_1.consultarTodos);
rutas.get("/listarProfesoresxCurso", CursoController_1.profesorxCurso);
rutas.post("/listarProfesoresxCursoResult", CursoController_1.buscarxProfesor);
rutas.get("/creaCursos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesores = yield (0, ProfesorController_1.buscarProfe)(req, res);
        res.render('creaCursos', {
            pagina: 'Crear cursos',
            profesores
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json(err.message);
        }
    }
}));
rutas.post("/", (0, CursoController_1.validarCurso)(), CursoController_1.insertar);
//rutas.get("/xProfesor/:id",cursoControlador.buscarxProfesor);
rutas.get("/creaCursosIns", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profesores = yield (0, ProfesorController_1.buscarProfe)(req, res);
    res.render('creaCursosIns', {
        pagina: 'Crear Curso',
        profesores
    });
}));
rutas.post("/xIns", (0, CursoController_1.validarCursoxins)(), CursoController_1.insertarxIns);
rutas.get("/modificarCurso/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const curso = yield (0, CursoController_1.consultarUno)(req, res);
        if (curso) {
            const elProfe = yield (0, ProfesorController_1.buscarUnProfe)(curso.profesor_id, res);
            var unProfe = (elProfe === null || elProfe === void 0 ? void 0 : elProfe.nombre) + ', ' + (elProfe === null || elProfe === void 0 ? void 0 : elProfe.apellido);
            var profesores = yield (0, ProfesorController_1.buscarProfe)(req, res);
            res.render('modificaCursos', {
                pagina: 'Modificación del Profesor',
                curso,
                profesores,
                unProfe
            });
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
}));
rutas.route("/:id")
    .put((0, CursoController_1.validarCursoMod)(), CursoController_1.modificar)
    .get(CursoController_1.consultarUno)
    .delete(CursoController_1.eliminar);
exports.default = rutas;
