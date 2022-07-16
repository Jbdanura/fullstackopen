import express from "express";
import { getAll, addPatient } from "../services/patientsService";


const patientsRouter = express.Router();

patientsRouter.get("/all", (_req,res)=>{
    res.json(getAll());
})

patientsRouter.post("/",(req,res)=>{
    const{name,dateOfBirth,gender,occupation} = req.body;
    const newPatientEntry = addPatient({name,dateOfBirth,gender,occupation})
    res.json(newPatientEntry);
})

patientsRouter.get("/:id",(req,res)=>{
    const id = req.params.id;
    const patients = getAll();
    const patient = patients.find(patient => patient.id === id);
    console.log(patient);
    res.json(patient);
})

export default patientsRouter;