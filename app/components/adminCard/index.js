import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function AdminCard({title, color}) {
  return (
    <Card sx={{ width: '100%', backgroundColor: color, padding: '10px' }}>

        <Typography variant='h3' sx={{ fontSize: 14 }} color="whitesmoke" gutterBottom>
          {title}
        </Typography>
    </Card>
  );
}