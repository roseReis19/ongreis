"use client";
import { Typography } from "@mui/material";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";


export default function ChartResults({ results, prueba = false }) {
  const [loading, setLoading] = useState(true);
  const [parse, setParse] = useState([]);

  useEffect(() => {

    if(results.length !== 0 && prueba){
      const mapping =[ {
        id: 1,
        indicators: results.map((e, i) => ({
          name: e.indicator,
          uv: 66,
          pv: e.encuestado,
        })),
      }];
      setParse(mapping);
      setLoading(false);
      return
    }
  
    if (results.length !== 0) {
      const mapping = results.map((e) => ({
        id: e.id,
        indicators: e.indicators.map((indicator, index) => ({
          name: indicator.indicator,
          uv: 66,
          pv: indicator.percentage,
        })),
      }));
      setParse(mapping);
      setLoading(false);
      return
    }
  }, [results]);


  return (
    <>
      {!loading && parse.length > 0 ? (
        <>
          {parse.map((e) => (
            <div style={{marginTop: 25, overflow: 'hidden'}}  key={e.id}>
            <ComposedChart
              width={500}
              height={400}
              data={e.indicators}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" barSize={20} fill="#abdbe3" name="Porcentajem de felicidade"/>
              <Line type="monotone" dataKey="uv" stroke="#ff7300" name="Nivel de felicidade"/>
            </ComposedChart>
            </div>
          ))}
        </>
      ) : (
        <Typography>No hay datos</Typography>
      )}
    </>
  );
}
