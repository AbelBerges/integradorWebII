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
const EstudianteController_1 = require("../controllers/EstudianteController");
const ruta = express_1.default.Router();
ruta.get("/listarEstudiantes", EstudianteController_1.consultarTodos);
ruta.get('/creaEstudiantes', (req, res) => {
    res.render('creaEstudiantes', {
        pagina: 'Crear Estudiante'
    });
});
ruta.post("/", EstudianteController_1.insertar);
ruta.get("/modificarEstudiante/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiante = yield (0, EstudianteController_1.consultarUno)(req, res);
        if (estudiante) {
            res.render('modificaEstudiante', {
                estudiante
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
ruta.route("/:id")
    .get(EstudianteController_1.consultarUno)
    .put(EstudianteController_1.modificar)
    .delete(EstudianteController_1.eliminar);
exports.default = ruta;
