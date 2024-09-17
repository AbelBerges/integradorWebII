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
const rutas = express_1.default.Router();
rutas.get("/listarCursos", CursoController_1.consultarTodos);
rutas.get("/creaCursos", (req, res) => {
    res.render('creaCursos', {
        pagina: 'Crear cursos'
    });
});
rutas.post("/", CursoController_1.insertar);
//rutas.get("/xProfesor/:id",cursoControlador.buscarxProfesor);
rutas.get("/modificarCurso/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const curso = yield (0, CursoController_1.consultarUno)(req, res);
        if (curso) {
            res.render('modificaCursos', {
                pagina: 'Modificación del Profesor',
                curso
            });
        }
        else {
            res.render('No se ha encontrado el estudiante');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.render(err.message);
        }
    }
}));
rutas.route("/:id")
    .put(CursoController_1.modificar)
    .get(CursoController_1.consultarUno)
    .delete(CursoController_1.eliminar);
exports.default = rutas;
