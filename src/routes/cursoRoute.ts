import express from "express";
import { Request, Response } from "express";
import { consultarTodos, consultarUno, eliminar, insertar, modificar } from "../controllers/CursoController";
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
               res.render('modificaCursos',{
                    pagina: 'Modificación del Profesor',
                    curso
               });
          } else {
               res.render('No se ha encontrado el estudiante');
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