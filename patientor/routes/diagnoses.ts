import express from "express";
import {getAll} from "../services/diagnosesService"

const diagnosesRouter = express.Router();

diagnosesRouter.get("/all",(_req,res)=>{
    res.json(getAll());
})

export default diagnosesRouter