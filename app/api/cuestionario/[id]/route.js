import { NextResponse } from "next/server";
import prisma from "../../db/prisma";

export async function DELETE(request, {params}) {
    try {
        const cuestionarioDeleted = await prisma.questionnaire.delete({
          where: { id: parseInt(params.id) },
        });
    
        return NextResponse.json('Cuestionario apagado:', cuestionarioDeleted);
      } catch (error) {
        console.error('Error ao apagar cuestionario:', error);
      } finally {
        await prisma.$disconnect();
      }
}

export async function GET(request, {params}) {
    try {
        const cuestionario = await prisma.questionnaire.findUnique({
          where: { id: parseInt(params.id) },
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
    
        if (cuestionario) {
            return NextResponse.json(cuestionario);
        } 

        return NextResponse.json([]);
      } catch (error) {
        console.error('Error al obtener el cuestionario:', error);
      } finally {
        await prisma.$disconnect();
      }
}