'use client'

import ChartResults from "@/app/components/chart";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";


export default function ExperimenteResults() {
    const [puntuacion, setPuntuacion ] = useState([])
    useEffect(()=>{
     const storedPuntuacion = localStorage.getItem("Prueba_results")

     setPuntuacion(JSON.parse(storedPuntuacion))
    
    },[])

    return (
      <Container style={{ marginTop: '100px'}} >
        <div style={{display: 'flex', justifyContent: 'center'}}>
        {puntuacion.length >= 1 && <ChartResults results={puntuacion} prueba={true}/>}
        </div>
      </Container>  
    );
}