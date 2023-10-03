import Container from "@mui/material/Container";
import QuestionnaireForm from "@/app/components/formCuestionario";

export default function AddCuestionario() {
  return (
    <Container style={{ marginTop: '100px', cursor: 'pointer' }} >
        <QuestionnaireForm />
    </Container>
  );
}
