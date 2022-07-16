import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const PatientDetail = () => {
  const [patient,setPatient] = useState<any | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(()=>{
    const getPatient = async ()=>{
        const url: string = `${apiBaseUrl}/patients/${id}`;
        const dataPatient = await axios.get<Patient>(url);
        setPatient(dataPatient.data);
    };
    void getPatient();
  },[]);
  console.log(patient);
  return (
    <div>
      {patient &&
      <>
        <h3>{patient.name}</h3>
        <h4>{patient.gender}</h4>
        <p>{patient.ssn}</p>
        <p>{patient.occupation}</p>
        <h4>entries</h4>
        <ul>
          {patient.entries.map(entry=>{
            return <div>
              <p>{entry.date} {entry.description}</p>
              {entry.diagnosisCodes &&
                <ul>
                  {entry.diagnosisCodes.map(code=>{
                    return <li>{code}</li>
                  })}
                </ul>
              }
            </div>
          })}
        </ul>
      </>
      }
    </div>
  );
};

export default PatientDetail;