import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    
    const empresa = await prisma.company.create({
      data: {
        name: data.name,
      },
    });

    return NextResponse.json(empresa);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request) {
  try {
    const company = await prisma.company.findMany({});

    return NextResponse.json(company);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}




