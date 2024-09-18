import express from "express";
import { Request, Response } from "express";
import { consultarTodos, consultarUno, eliminar, insertar, modificar } from "../controllers/CursoController";
import { buscarProfe, buscarUnProfe } from "../controllers/ProfesorController";
const rutas = express.Router();

rutas.get("/listarCursos",consultarTodos);

rutas.get("/creaCursos",(req:Request,res:Response)=>{
     res.render('creaCursos',{
          pagina: 'Crear cursos'
     });
});

rutas.post("/",insertar);
//rutas.get("/xProfesor/:id",cursoControlador.buscarxProfesor);



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
     .put(modificar)
     .get(consultarUno)
     .delete(eliminar);

export default rutas;