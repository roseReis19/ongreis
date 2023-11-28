"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/navigation";
import { useState } from "react";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container style={{ marginTop: 15 }}>{children}</Container>
      )}
    </div>
  );
}

export default function PlatformCuestionarios({ data, results }) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ marginTop: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Questionarios" />
          <Tab label="Resultados" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ minHeight: "100vh" }}>
          <Grid container spacing={2}>
          {data.map((questionario) =>(<Grid item xs={6}   key={questionario.id}>
           <Card
                sx={{
                  minWidth: 275,
                  backgroundColor: "whitesmoke",
                  color: "black",
                }}  
              >
               <CardContent>
                  <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Questionario {questionario.id}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }}>{questionario.name}</Typography>
                  <Typography variant="body2">
                  Realize o questionário para medir sua felicidade
                  </Typography>
                </CardContent>
                <CardActions>
                {results.some((result) => result.questionnaireId === questionario.id) ? (
                      <Button size="small" variant="contained" disabled>
                        Completado
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          router.push(`/platform/${questionario.id}`);
                        }}
                      >
                        Completar
                      </Button>
                    )}
                </CardActions>
              </Card>
            </Grid>))}
          </Grid>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
