import { NextResponse } from "next/server";
import prisma from "../db/prisma";


export async function GET(request) {
  try {
   const usersFound = await prisma.user.findMany({
      include: {
        results: {
          include: {
            indicators: true, 
          },
        }
      },
      orderBy: {
        gender: 'asc', 
      },
    });

    if (!usersFound) {
      return NextResponse.error({ statusCode: 404, message: "Users not found" });
    }

    const usersResults = userFound.results;

    return NextResponse.json({ results: userResults });
  } catch (error) {
    console.log(error)
    return NextResponse.error();
  }
}