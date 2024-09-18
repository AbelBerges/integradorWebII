"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const estudianteRoute_1 = __importDefault(require("./routes/estudianteRoute"));
const cursoRoute_1 = __importDefault(require("./routes/cursoRoute"));
const profesorRoute_1 = __importDefault(require("./routes/profesorRoute"));
const inscripcionRoute_1 = __importDefault(require("./routes/inscripcionRoute"));
const path_1 = __importDefault(require("path"));
const method_override_1 = __importDefault(require("method-override"));
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, '../public/views'));
app.use(express_1.default.static('public'));
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    //res.send('App de la universidad');
    console.log(__dirname);
    return res.render('index', {
        pagina: 'Publicación universidad'
    });
});
app.use('/estudiantes', estudianteRoute_1.default);
app.use('/profesores', profesorRoute_1.default);
app.use('/cursos', cursoRoute_1.default);
app.use('/inscripciones', inscripcionRoute_1.default);
exports.default = app;
