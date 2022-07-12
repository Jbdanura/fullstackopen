import diagnosesData from "../diagnoses.json"
import {Diagnosis} from "../front/src/types"

const getAll = () : Array<Diagnosis> => {
    return diagnosesData;
}

export {
    getAll
}