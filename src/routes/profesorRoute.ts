import { Request, Response } from "express";
import express from "express";
import { consultarTodos, consultarUno, eliminar, insertar, modificar, insertarxCurso } from "../controllers/ProfesorController";
const rutas = express.Router();


rutas.get("/listarProfesores",consultarTodos);

rutas.get("/creaProfesores",(req:Request,res:Response)=>{
     res.render('creaProfesores',{
          pagina: 'Crear Profesor'
     });
});
rutas.post("/",insertar);

rutas.get("/creaProfesoresCurso", async (req:Request,res:Response)=>{
    res.render('creaProfesoresCurso',{
        pagina: 'Crear Profesor'
    })
})


rutas.post("/xCursos",insertarxCurso)

rutas.get("/modificarProfesor/:id", async (req:Request, res:Response)=>{
     try{
         const profesor = await consultarUno(req,res);
         if(profesor){
             res.render('modificaProfesor',{
               profesor
             });
         } else {
             res.render('No se ha encontrado el estudiante');
         }
     }catch(err){
         if(err instanceof Error){
             res.render(err.message);
         }
     }
 })

rutas.route("/:id")
     .get(consultarUno)
     .put(modificar)
     .delete(eliminar);

export default rutas;