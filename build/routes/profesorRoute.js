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
const ProfesorController_1 = require("../controllers/ProfesorController");
const rutas = express_1.default.Router();
rutas.get("/listarProfesores", ProfesorController_1.consultarTodos);
rutas.get("/creaProfesores", (req, res) => {
    res.render('creaProfesores', {
        pagina: 'Crear Profesor'
    });
});
rutas.post("/", (0, ProfesorController_1.validarProfe)(), ProfesorController_1.insertar);
rutas.get("/creaProfesoresCurso", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('creaProfesoresCurso', {
        pagina: 'Crear Profesor'
    });
}));
rutas.post("/xCursos", (0, ProfesorController_1.validarProfe)(), ProfesorController_1.insertarxCurso);
rutas.get("/modificarProfesor/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profesor = yield (0, ProfesorController_1.consultarUno)(req, res);
        if (profesor) {
            res.render('modificaProfesor', {
                profesor
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
    .get(ProfesorController_1.consultarUno)
    .put((0, ProfesorController_1.validarProfe)(), ProfesorController_1.modificar)
    .delete(ProfesorController_1.eliminar);
exports.default = rutas;
