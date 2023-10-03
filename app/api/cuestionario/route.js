import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
   const cuestionario = await prisma.questionnaire.create({
      data: {
        name: data.nome_del_cuestionario,
        domains: {
          create: data.dominios.map((dominio) => ({
            name: dominio.nome_del_dominio,
            indicators: {
              create: dominio.indicadores.map(createIndicador)
            },
          })),
        },
      },
    });

    return NextResponse.json(cuestionario);
  } catch (error) {
    console.log(error);
  }finally {
    await prisma.$disconnect();
  }
}

function createIndicador(indicador) {
  return {
    name: indicador.nome_del_indicador,
    criterion: indicador.criterio,
    weight: indicador.peso,
    grade: indicador.nota,
    questions: {
      create: indicador.perguntas.map(createPergunta),
    },
  };
}

function createPergunta(pergunta) {
  return {
    statement: pergunta.enunciado_de_la_pregunta,
    item: pergunta.item,
    options: {
      create: pergunta.opcoes.map(createOpcao), 
    },
  };
}

function createOpcao(op) {
  return {
    text: op.texto_de_opcoes,
    score: op.puntaje,
  };
}

export async function GET() {
  try {
    const cuestionarios = await prisma.questionnaire.findMany({
      include: {
        domains: {
          include: {
            indicators: {
              include: {
                questions: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (cuestionarios) {
      return NextResponse.json(cuestionarios);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.log(error);
  }finally {
    await prisma.$disconnect();
  }
}
