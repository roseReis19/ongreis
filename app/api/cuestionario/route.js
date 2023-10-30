import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
   const cuestionario = await prisma.questionnaire.create({
      data: {
        name: data.name,
        domains: {
          create: data.domains.map((dominio) => ({
            name: dominio.name,
            indicators: {
              create: dominio.indicators.map(createIndicator)
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

function createIndicator(indicator) {
  return {
    name: indicator.name,
    criterion: indicator.criterion.toLowerCase(),
    weight: indicator.weight === '0' ? null: indicator.weight,
    grade: Number(indicator.grade),
    questions: {
      create: indicator.questions.map(createQuestion),
    },
  };
}

function createQuestion(question) {
  return {
    statement: question.statement,
    item: question.item,
    options: {
      create: question.options.map(createOption), 
    },
  };
}

function createOption(op) {
  return {
    text: op.text,
    score: op.score,
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
