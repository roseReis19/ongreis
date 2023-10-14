
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TableAdmin from "@/app/components/table";

export default function Client() {

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography>Clientes</Typography>
      <TableAdmin />
    </Container>
  );
}
