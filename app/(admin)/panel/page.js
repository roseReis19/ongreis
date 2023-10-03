import PanelHome from "@/app/components/panelHome";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export default function Panel() {
  return (
    <Container style={{ marginTop: '100px', cursor: 'pointer' }} >
              <Typography>Panel</Typography>
              <PanelHome/>
    </Container>  
  );
}
