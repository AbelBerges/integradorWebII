import * as dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'mysql2/promise';
import {DataSource} from 'typeorm';
import { Estudiante } from '../models/EstudianteModel';
import { Curso } from '../models/CursoModel';
import { Profesor } from '../models/ProfesorModel';
import { CursoEstudiante } from '../models/CursoEstudianteModel';

const port:number = process.env.DB_PORT ? parseInt(process.env.DB_PORT,10):3306;

async function createDataBaseIfNotExist() {
    
    const coneccion = await createConnection({
        host: process.env.DB_HOST,
        port,
        user:process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });
    await coneccion.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    //const db = await coneccion.query(`SHOW DATABASES LIKE ${process.env.DB_NAME}`);
    
    
    coneccion.end();
}

export const AppDataSource = new DataSource({
    type: "mysql",
    host:process.env.DB_HOST,
    port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Estudiante,Curso,Profesor,CursoEstudiante],
    synchronize: false,
    logging: true
});

export async function inicializeDataBase() {
    await createDataBaseIfNotExist();
    await AppDataSource.initialize();
    
}