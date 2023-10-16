import QuestionarioForm from "@/app/components/question";
import { mock } from "@/app/hooks/experimente";
import Container from "@mui/material/Container";

async function getData(param) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/cuestionario/${param}`)
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 


export default async function Questionario({ params }) {
  //console.log(params);
  const data = await getData(params.questionario)
 // const data = mock;
  return (
    <Container style={{ marginTop: "80px" }}>
     <QuestionarioForm data = {data}/>
    </Container>
  );
}
