
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TableAdmin from "@/app/components/table";
import Divider from "@mui/material/Divider";
import SendCompany from "@/app/components/sendCompany";

export default function Client() {

  return (
    <Container style={{ marginTop: "100px" }}>
      <Typography>Clientes</Typography>
      <TableAdmin />
      <Divider style={{ margin: "20px 0" }} />
      <SendCompany />
    </Container>
  );
}
