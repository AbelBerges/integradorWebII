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
const EstudianteController_2 = require("../controllers/EstudianteController");
const ruta = express_1.default.Router();
ruta.get("/listarEstudiantes", EstudianteController_2.consultarTodos);
ruta.get('/creaEstudiantes', (req, res) => {
    res.render('creaEstudiantes', {
        pagina: 'Crear Estudiante'
    });
});
ruta.post("/", (0, EstudianteController_1.validar)(), EstudianteController_2.insertar);
ruta.get('/creaEstudiantesIns', (req, res) => {
    res.render('creaEstudiantesIns', {
        pagina: 'Crear Estudiante'
    });
});
ruta.post("/xIns", (0, EstudianteController_2.validarxIns)(), EstudianteController_2.insertarxIns);
ruta.get("/modificarEstudiante/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estudiante = yield (0, EstudianteController_2.consultarUno)(req, res);
        if (estudiante) {
            res.render('modificaEstudiante', {
                pagina: 'Modificación de los datos del Estudiante',
                estudiante
            });
        }
        else {
            res.render('No se ha encontrado el estudiante');
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
}));
ruta.route("/:id")
    .get(EstudianteController_2.consultarUno)
    .put((0, EstudianteController_2.validarMod)(), EstudianteController_2.modificar)
    .delete(EstudianteController_2.eliminar);
exports.default = ruta;
