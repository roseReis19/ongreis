"use style"

import React from 'react';
import { Card, CardContent, Button, Typography, Container } from '@mui/material';

function WelcomeCard() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const buttonStyle = {
    marginTop: '16px', 
    width: '100%'
  };

  const cardStyle = {
    backgroundColor: "rgba(246, 244, 242, 0.6)", 
    width: 500,
  };

  return (
    <Container maxWidth="xs" style={containerStyle}>
      <Card style={cardStyle}>
        <CardContent >
          <Typography variant="h4">
            Bemvidos
          </Typography>
          <Typography variant="h6" color="secundary">
          Nosso aplicativo pode medir seus níveis de felicidade, experimente o botão abaixo
          </Typography>
          <Button variant="contained" color="primary" style={buttonStyle}>
            Experimente
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}

export default WelcomeCard;

