import express from "express";
import { getAll, addPatient } from "../services/patientsService";


const patientsRouter = express.Router();

patientsRouter.get("/all", (_req,res)=>{
    res.json(getAll());
})

patientsRouter.post("/",(req,res)=>{
    const{name,dateOfBirth,gender,occupation} = req.body;
    const newPatientEntry = addPatient({name,dateOfBirth,gender,occupation})
    res.json(newPatientEntry)
})

export default patientsRouter;