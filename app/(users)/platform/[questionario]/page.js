import QuestionarioForm from "@/app/components/question";
import { mock } from "@/app/hooks/mock";
import Container from "@mui/material/Container";

/*async function getData(param) {
  const res = await fetch('http://localhost:3000/api/cuestionario/3')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}*/
 


export default function Questionario({ params }) {
  console.log(params);
  //const data = await getData(params.questionario)
  const data = mock;
  return (
    <Container style={{ marginTop: "80px" }}>
     <QuestionarioForm data = {data}/>
    </Container>
  );
}
