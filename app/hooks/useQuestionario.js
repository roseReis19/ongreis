"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {NotificationManager} from 'react-notifications';

export default function UseCuestionario(cuestionarioData, prueba = false, setDisableButtom) {
  const [dominioIndex, setDominioIndex] = useState(0);
  const [indicadorIndex, setIndicadorIndex] = useState(0);
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [puntuacion, setPuntuacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {data} = useSession()

  const generateLocalStorageKey = (cuestionarioId, key) => {
    return `${cuestionarioId}_${key}`;
  };

  useEffect(() => {
    const cuestionarioId = cuestionarioData.id; 
   
    const storedDominioIndex = localStorage.getItem(
      generateLocalStorageKey(cuestionarioId, "dominioIndex")
    );
    const storedIndicadorIndex = localStorage.getItem(
      generateLocalStorageKey(cuestionarioId, "indicadorIndex")
    );
    const storedPreguntaIndex = localStorage.getItem(
      generateLocalStorageKey(cuestionarioId, "preguntaIndex")
    );
    const storedPuntuacion = localStorage.getItem(
      generateLocalStorageKey(cuestionarioId, "puntuacion")
    );

    if (storedDominioIndex !== null) {
      setDominioIndex(Number(storedDominioIndex));
    }

    if (storedIndicadorIndex !== null) {
      setIndicadorIndex(Number(storedIndicadorIndex));
    }

    if (storedPreguntaIndex !== null) {
      setPreguntaIndex(Number(storedPreguntaIndex));
    }

    if (storedPuntuacion !== null) {
      setPuntuacion(JSON.parse(storedPuntuacion));
    }
    setLoading(false);
  }, [cuestionarioData]);

  useEffect(() => {
    const cuestionarioId = cuestionarioData.id;

    localStorage.setItem(
      generateLocalStorageKey(cuestionarioId, "dominioIndex"),
      dominioIndex.toString()
    );
    localStorage.setItem(
      generateLocalStorageKey(cuestionarioId, "indicadorIndex"),
      indicadorIndex.toString()
    );
    localStorage.setItem(
      generateLocalStorageKey(cuestionarioId, "preguntaIndex"),
      preguntaIndex.toString()
    );
    localStorage.setItem(
      generateLocalStorageKey(cuestionarioId, "puntuacion"),
      JSON.stringify(puntuacion)
    );
  }, [cuestionarioData, dominioIndex, indicadorIndex, preguntaIndex, puntuacion]);

  const avanzarPregunta = async () => {
    if (
      preguntaIndex <
      cuestionarioData.domains[dominioIndex].indicators[indicadorIndex]
        .questions.length -
        1
    ) {
      setPreguntaIndex(preguntaIndex + 1);
    } else {
      if (
        indicadorIndex <
        cuestionarioData.domains[dominioIndex].indicators.length - 1
      ) {
        setIndicadorIndex(indicadorIndex + 1);
        setPreguntaIndex(0);
      } else {
        if (dominioIndex < cuestionarioData.domains.length - 1) {
          setDominioIndex(dominioIndex + 1);
          setIndicadorIndex(0);
          setPreguntaIndex(0);
        } else {
          try {
            await calcularPuntuacionTotal();
           
          } catch (error) {
            console.log(error)
          }     
        }
      }
    }
  };

  const retrocederPregunta = (data) => {
    if (preguntaIndex > 0) {
      setPreguntaIndex(preguntaIndex - 1);
    } else if (indicadorIndex > 0) {
      setIndicadorIndex(indicadorIndex - 1);
      setPreguntaIndex(
        cuestionarioData.domains[dominioIndex].indicators[indicadorIndex - 1]
          .questions.length - 1
      );
    } else if (dominioIndex > 0) {
      setDominioIndex(dominioIndex - 1);
      const anteriorDominio = cuestionarioData.domains[dominioIndex - 1];
      setIndicadorIndex(anteriorDominio.indicators.length - 1);
      setPreguntaIndex(
        anteriorDominio.indicators[anteriorDominio.indicators.length - 1]
          .preguntas.length - 1
      );
    }
    const indicador =
      cuestionarioData.domains[dominioIndex].indicators[indicadorIndex];
    eliminarPuntuacion(indicador);
  };

  const  calcularPuntuacionTotal = async () => {
      const resultados = puntuacion.map((elemento) => {
        const numeroDePreguntas = elemento.puntuacion.length;

        const sumaPuntuaciones = elemento.puntuacion.reduce(
          (total, puntuacionObj) => {
            for (const key in puntuacionObj) {
              if (puntuacionObj.hasOwnProperty(key)) {
                total += puntuacionObj[key];
              }
            }
            return total;
          },
          0
        );

        if (elemento.criterio !== null && elemento.criterio === "brasil") {
          return {
            indicador: elemento.indicador,
            encuestado: sumaPuntuaciones,
            criterio: elemento.criterio,
          };
        }
        const puntacionTotalIndicador = sumaPuntuaciones * elemento.peso;
        const resultadoEnPorcentaje =
          (puntacionTotalIndicador /
            (elemento.nota * numeroDePreguntas * elemento.peso)) *
          100;
        return {
          indicador: elemento.indicador,
          encuestado: resultadoEnPorcentaje,
        };
      });
      
      resultados.id = cuestionarioData.id
      
      try {
        if(prueba){
          localStorage.setItem(
            generateLocalStorageKey(resultados.id, "results"),
            JSON.stringify(resultados)
          );
          router.push("/experimente/results")
          return
        }

        await sendResults(resultados)
      } catch (error) {
        console.log(error)
      }
     
  };

  const handleSeleccionarOpcion = (data) => {
    const indicador =
      cuestionarioData.domains[dominioIndex].indicators[indicadorIndex];
    const elementoExistente = puntuacion.find(
      (elemento) => elemento.indicador === indicador.name
    );

    if (elementoExistente) {
      const nuevaPuntuacion = elementoExistente.puntuacion.concat({
        [data.id]: data.score,
      });

      const nuevosElementos = puntuacion.map((elemento) => {
        if (elemento.indicador === indicador.name) {
          return { ...elemento, puntuacion: nuevaPuntuacion };
        }
        return elemento;
      });

      setPuntuacion(nuevosElementos);
    } else {
      if (indicador.criterion !== null && indicador.criterion === "brasil") {
        const nuevoElemento = {
          indicador: indicador.name,
          criterio: indicador.criterion,
          puntuacion: [
            {
              [data.id]: data.score,
            },
          ],
        };

        setPuntuacion([...puntuacion, nuevoElemento]);
      } else {
        const nuevoElemento = {
          indicador: indicador.name,
          peso: indicador.weight,
          nota: indicador.grade,
          puntuacion: [
            {
              [data.id]: data.score,
            },
          ],
        };

        setPuntuacion([...puntuacion, nuevoElemento]);
      }
    }
  };

  const eliminarPuntuacion = (indicadorNome) => {
    const nuevosElementos = [...puntuacion];
    const elementoIndicadorIndex = nuevosElementos.findIndex(
      (elemento) => elemento.indicador === indicadorNome.name
    );
    if (elementoIndicadorIndex !== -1) {

      const elementoIndicador = nuevosElementos[elementoIndicadorIndex];

      elementoIndicador.puntuacion.pop();

      nuevosElementos[elementoIndicadorIndex] = elementoIndicador;
      setPuntuacion([...nuevosElementos]);
    }
  };

  const sendResults = async (results) => {
    const send = {
      "cuestionarioId":cuestionarioData.id,
      "userId": data.user.id,
      "indicadores": results.map(e => (
        {"indicador": e.indicador, "porcentaje": e.encuestado}
      ))
    }

    try {
      setDisableButtom(true)
      await fetch("/api/cuestionario/results", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(send), 
      });

      NotificationManager.success('Success message', 'Formulario mandado');
      setDisableButtom(false)
      router.push("/platform")
    } catch (error) {
      console.log(error)
      NotificationManager.error('Error message', 'Error');
    }
  }

  const preguntaActual =
    cuestionarioData.domains[dominioIndex].indicators[indicadorIndex]
      .questions[preguntaIndex];

  return [
    retrocederPregunta,
    avanzarPregunta,
    preguntaActual,
    handleSeleccionarOpcion,
    loading
  ];
}
