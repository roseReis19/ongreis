import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../db/prisma";

export async function POST(request) {
  try {
    const { name, email, password, data_de_nascimento, senha, gender } =
      await request.json();

    const companyLimit = await prisma.company.findUnique({ where: { id: senha } });

    if (!companyLimit) {
      return NextResponse.json(
        { message: "Company does not exist" },
        { status: 404 }
      );
    }

    if (companyLimit.limit !== null) {
      const userCount = await prisma.user.count({ where: { companyId: senha } });

      if (userCount >= companyLimit.limit) {
        return NextResponse.json(
          { message: "Company limit exceeded" },
          { status: 409 }
        );
      }
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const userFound = await prisma.user.findUnique({ where: { email } });

    if (userFound) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        date_of_birth: data_de_nascimento,
        gender,
        companyId: senha,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        name,
        email,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}