import { NextResponse } from "next/server";
import prisma from "../db/prisma";



export async function GET(request) {
  try {
    const results = await prisma.result.findMany({
      orderBy: {
        user: {
          gender: "asc",
        },
      },
    });

    return NextResponse.json({ results: results });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
