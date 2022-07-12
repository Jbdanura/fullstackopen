import patientEntries from "../patientsData"
import { NewPatient, Patient } from "../front/src/types"
import { v1 as uuid } from 'uuid'

const getAll = () : Patient[] => {
    return patientEntries.map(({id,name, dateOfBirth, gender, occupation})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }))

}

const addPatient = (entry: NewPatient) : Patient => {
    const{name,gender,occupation} = entry;
    if(name.length === 0 || !name){
        throw new Error("Name empty");
    }
    if(gender !== "male" && gender !== "female" && gender !== "other"){
        throw new Error("Invalid gender");
    }
    if(occupation.length === 0 || !occupation){
        throw new Error("Occupation empty");
    }
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
}


export {
    getAll,
    addPatient,
}