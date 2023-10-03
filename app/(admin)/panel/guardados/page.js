import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PanelSaved from "@/app/components/panelSaved";


export default function Saved() {
  return (
    <Container style={{ marginTop: '100px', cursor: 'pointer' }} >
        <Typography>Cuestionarios Guardados</Typography>
        <PanelSaved />
    </Container>
  );
}
