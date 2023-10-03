import { NextResponse } from "next/server";
import prisma from "../../db/prisma";

export async function GET(request, {params}) {
  try {
   const userFound = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        results: {
          include: {
            indicators: true, 
          },
        }
      },
    });

    

    if (!userFound) {
      return NextResponse.error({ statusCode: 404, message: "User not found" });
    }

    const userResults = userFound.results;

    return NextResponse.json({ results: userResults });
  } catch (error) {
    console.log(error)
    return NextResponse.error();
  }
}
