import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    
    const empresa = await prisma.company.create({
      data: {
        name: data.name,
        limit: data.limit
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
    const companies = await prisma.company.findMany();
    
    const companiesWithUserCount = await Promise.all(
      companies.map(async (company) => {
        const userCount = await prisma.user.count({
          where: { companyId: company.id }
        });

        return { ...company, users: userCount };
      })
    );

    return NextResponse.json(companiesWithUserCount);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}




