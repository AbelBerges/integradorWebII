import express from "express";
import { Request, Response } from "express";
import { consultarTodos, consultarUno, eliminar, insertar, insertarxIns, modificar, profesorxCurso, 
          buscarxProfesor, validarCurso, validarCursoMod, validarCursoxPro, validarCursoxins} from "../controllers/CursoController";
import { buscarProfe, buscarUnProfe } from "../controllers/ProfesorController";
const rutas = express.Router();

rutas.get("/listarCursos",consultarTodos);
rutas.get("/listarProfesoresxCurso", profesorxCurso);
rutas.post("/listarProfesoresxCursoResult", buscarxProfesor);

rutas.get("/creaCursos",async (req:Request,res:Response)=>{
     try{
          const profesores = await buscarProfe(req,res);
          res.render('creaCursos',{
               pagina: 'Crear cursos',
               profesores
          });
     } catch(err:unknown){
          if(err instanceof Error){
               res.status(500).json(err.message);
          }
     }
});

rutas.post("/", validarCurso(), insertar);
//rutas.get("/xProfesor/:id",cursoControlador.buscarxProfesor);
rutas.get("/creaCursosIns",async (req:Request,res:Response)=>{
     const profesores = await buscarProfe(req,res);
     res.render('creaCursosIns',{
          pagina: 'Crear Curso',
          profesores
     })
})

rutas.post("/xIns",validarCursoxins(), insertarxIns);


rutas.get("/modificarCurso/:id", async (req:Request,res:Response)=>{
     try{
          const curso = await consultarUno(req,res);
          if(curso){
               const elProfe = await buscarUnProfe(curso.profesor_id,res);
               var unProfe:string =  elProfe?.nombre + ', ' + elProfe?.apellido;
               var profesores = await buscarProfe(req,res);
               res.render('modificaCursos',{
                    pagina: 'Modificación del Profesor',
                    curso,
                    profesores,
                    unProfe
               });
          } else {
               res.render('No se ha encontrado el curso');
          }
     }catch(err:unknown){
          if(err instanceof Error){
               res.render(err.message);
          }
     }
})
rutas.route("/:id")
     .put(validarCursoMod(),modificar)
     .get(consultarUno)
     .delete(eliminar);

export default rutas;