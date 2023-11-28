import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(request) {
  try {
   const data = await request.json();
   const cuestionario = await prisma.indicators({
    where: id
   })

    return NextResponse.json(cuestionario);
  } catch (error) {
    console.log(error);
  }finally {
    await prisma.$disconnect();
  }
}