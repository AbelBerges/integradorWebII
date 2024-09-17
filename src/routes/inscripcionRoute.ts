import express from "express";
import { Request, Response } from "express";
import { agregar, buscarTodos, buscaxCurso, eliminar, buscarxEstudiante, modifica, buscarUno } from "../controllers/InscripcionController";
const rutas = express.Router();


rutas.get("/listarInscripciones",buscarTodos);

rutas.get("/creaInscripciones",(req:Request,res:Response)=>{
    res.render('creaInscripciones',{
        pagina: 'Creación de Inscripciones'
    })
})
rutas.post("/",agregar);

rutas.get("/modificarInscripcion/:curso_id/:estudiante_id",async (req:Request,res:Response)=>{
    try{
        const inscripcion = await buscarUno(req,res);
        if(inscripcion){
            res.render('modificaInscripcion',{
                pagina: 'Modificación de la inscripción',
                inscripcion
            });
        } else {
            res.render('No se ha encontrado la inscripción')
        }
    } catch(err:unknown){
        if(err instanceof Error){
            res.render(err.message);
        }
    }
});
rutas.route("/:curso_id/:estudiante_id").put(modifica);

rutas.get("/xCurso/:id",buscaxCurso);
rutas.get("/xEstudiante/:id",buscarxEstudiante);

rutas.route("/:id")
     .delete(eliminar);
export default rutas;