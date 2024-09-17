import app from "./app";
import { inicializeDataBase } from "./db/conection";

const port= 4000;

async function main() {
    try{
        
        await inicializeDataBase();
        console.log('Conectada la base de datos');
        app.listen(4000,()=>{
            console.log(`Se ha iniciado el servidor puerto: ${port}`);
        })
    } catch(err:unknown){
        if(err instanceof Error){
            console.log('Error al iniciar la base de datos o el servidor ', err.message);
        }
    }
}

main();

