
import { NextResponse } from "next/server";
import prisma from "../../db/prisma";


export async function POST(request) {
  try {
    const data = await request.json();
    const results = await prisma.result.findMany({
        where: {
          user: {
            companyId: data.companyId, 
          },
        },
        orderBy: {
          user: {
            gender: 'asc',
          },
        },
      });

    return NextResponse.json({ results: results });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
