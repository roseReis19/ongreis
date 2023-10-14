
import { Container } from "@mui/material";
import QuestionarioForm from "../components/question";
import { experimente } from "../hooks/experimente";


export default function Experimente() {

    const data = experimente;

    return (
      <Container style={{ marginTop: '100px'}} >
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <QuestionarioForm data={data}  prueba={true}/>
        </div>      
      </Container>  
    );
  }