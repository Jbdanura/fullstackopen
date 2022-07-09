import express from 'express';
const app = express();
import {Values, calculateBmi} from "./bmiCalculator";
import { calculateExercises, Result } from './exerciseCalculator';

app.use(express.json())


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (_req,res) => {
    if(isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight)) || Object.keys(_req.query).length > 2){
        res.status(400).send("malformatted parameters")
    }
    const values : Values = {
        height: Number(_req.query.height), 
        weight: Number(_req.query.weight)
    };
    const result : string = calculateBmi(values);
    res.json({
        weight: values.weight,
        height: values.height,
        bmi: result
    });
});

app.post("/exercises", (req,res) => {
    const week  = req.body.daily_exercises
    const target  = req.body.target
    const length : number = Object.keys(req.body).length

    if(week.some(isNaN) || isNaN(target)){
        res.status(400).send("malformatted parameters")
    } else if(length !== 2){
        res.status(400).send("only 2 parametters admitted")
    } else {
        const result : Result = calculateExercises(week,target)
        res.json(result)
    }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});