import { NextResponse } from "next/server";
import prisma from "../../db/prisma";

export async function DELETE(request,{ params}) {
    try {
      const company = await prisma.company.delete({
        where:{
            id: params.id
        }
      });
  
      return NextResponse.json("company deleted");
    } catch (error) {
      console.log(error);
    } finally {
      await prisma.$disconnect();
    }
}