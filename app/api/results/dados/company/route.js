import prisma from "@/app/api/db/prisma";
import { NextResponse } from "next/server";


export async function GET(request) {
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
