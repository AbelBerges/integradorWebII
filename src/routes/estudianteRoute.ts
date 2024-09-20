import { Request, Response } from "express";
import express from "express";
import { consultarTodos, consultarUno, eliminar, insertar, modificar, buscarUnEstudiante, insertarxIns } from "../controllers/EstudianteController";
const ruta = express.Router();


ruta.get("/listarEstudiantes",consultarTodos);

ruta.get('/creaEstudiantes',(req:Request,res:Response)=> {
    res.render('creaEstudiantes',{
        pagina: 'Crear Estudiante'
    });
});
ruta.post("/",insertar);

ruta.get('/creaEstudiantesIns',(req:Request,res:Response)=>{
    res.render('creaEstudiantesIns',{
        pagina: 'Crear Estudiante'
    })
})

ruta.post("/xIns", insertarxIns);

ruta.get("/modificarEstudiante/:id", async (req:Request, res:Response)=>{
    try{
        const estudiante = await consultarUno(req,res);
        if(estudiante){
            res.render('modificaEstudiante',{
                pagina: 'Modificación de los datos del Estudiante',
                estudiante
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

ruta.route("/:id")
    .get(consultarUno)
    .put(modificar)
    .delete(eliminar);

export default ruta;
