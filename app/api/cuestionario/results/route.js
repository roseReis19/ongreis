import { NextResponse } from "next/server";
import prisma from "../../db/prisma";


export async function POST(request) {
  try {
   const data = await request.json();
   const results = await prisma.result.create({
      data: {
        questionnaireId: data.cuestionarioId,
        userId: data.userId,
        indicators: {
          create: data.indicadores.map((data) => ({
            indicator: data.indicador,
            percentage: data.porcentaje,
          })),
        },
      },
    });

    return NextResponse.json({"resultado mandado": results});
  } catch (error) {
    console.log(error);
  }finally {
    await prisma.$disconnect();
  }
}