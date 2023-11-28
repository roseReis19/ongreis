export async function GET() {
  try {
    const cuestionarios = await prisma.questionnaire.findMany({
      include: {
        domains: {
          include: {
            indicators: {
              include: {
                questions: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (cuestionarios) {
      return NextResponse.json(cuestionarios);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.log(error);
  }finally {
    await prisma.$disconnect();
  }
}

import { NextResponse } from "next/server";
import prisma from "../db/prisma";

export async function POST(request) {
  try {
    const data = await request.json();

    // Create the questionnaire
    const createdQuestionnaire = await prisma.questionnaire.create({
      data: {
        name: data.name,
      },
    });

    // Process and insert domains
    const createdDomains = await Promise.all(
      data.domains.map(async (dominio) => {
        const createdDomain = await prisma.domain.create({
          data: {
            name: dominio.name,
            questionnaireId: createdQuestionnaire.id,
          },
        });

        // Process and insert indicators for each domain
        const createdIndicators = await Promise.all(
          dominio.indicators.map(async (indicator) => {
            return createIndicator(indicator, createdDomain.id);
          })
        );

        return { ...createdDomain, indicators: createdIndicators };
      })
    );

    const result = {
      ...createdQuestionnaire,
      domains: createdDomains,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}


async function createIndicator(indicator, domainId) {
  const createdIndicator = await prisma.indicator.create({
    data: {
      name: indicator.name,
      criterion: indicator.criterion.toLowerCase(),
      weight: indicator.weight === '0' ? null : indicator.weight,
      grade: Number(indicator.grade),
      domainId,
    },
  });

  // Process and insert questions for each indicator
  const createdQuestions = await Promise.all(
    indicator.questions.map(async (question) => {
      return createQuestion(question, createdIndicator.id);
    })
  );

  return { ...createdIndicator, questions: createdQuestions };
}

async function createQuestion(question, indicatorId) {
  const createdQuestion = await prisma.question.create({
    data: {
      statement: question.statement,
      item: question.item,
      indicatorId,
    },
  });

  // Process and insert options for each question
  const createdOptions = await Promise.all(
    question.options.map(async (option) => {
      return createOption(option, createdQuestion.id);
    })
  );

  return { ...createdQuestion, options: createdOptions };
}

async function createOption(option, questionId) {
  return await prisma.option.create({
    data: {
      text: option.text,
      score: option.score,
      questionId: questionId,
    },
  });
}
