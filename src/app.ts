import { Request, Response } from "express";
import expres from "express";
import cors from "cors";
import morgan from "morgan";

import estudianteRouter from "./routes/estudianteRoute";
import cursoRouter from "./routes/cursoRoute";
import profesorRouter from "./routes/profesorRoute";
import inscripcionRouter from "./routes/inscripcionRoute";
import path from "path";
import methodOverride from "method-override";

const app = expres();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../public/views'));

app.use(expres.static('public'));
app.use(methodOverride('_method'));
app.use(expres.json());
app.use(cors());
app.use(morgan('dev'));
app.use(expres.urlencoded({extended: true}));

app.get("/",(req:Request,res:Response)=>{
    //res.send('App de la universidad');
    console.log(__dirname);
    return res.render('index',{
        pagina: 'Publicación universidad'
    })
});

app.use('/estudiantes',estudianteRouter);
app.use('/profesores',profesorRouter);
app.use('/cursos',cursoRouter);
app.use('/inscripciones',inscripcionRouter);

export default app;