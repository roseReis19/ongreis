export const experimente = {
    name: "Experimente",
    id: "Prueba",
    domains: [
      {
        name: "USO DO TEMPO",
        indicators: [
          {
            name: "TRABALHO",
            weight: 0.056,
            grade: 9,
            id: 1,
            questions: [
              {
                statement: "Em média quantas horas por dia você permanece no seu trabalho ou atividade remunerada?",
                id: 1,
                options: [
                  {
                    text: "0h - 3h",
                    score: 3
                  },
                  {
                    text: "3h - 6h",
                    score: 3
                  },
                  {
                    text: "6h - 9h",
                    score: 9
                  },
                  {
                    text: "9h - 12h",
                    score: 9
                  },
                  {
                    text: "12h ou mais",
                    score: 3
                  }
                ]
              },
              {
                statement: "O tempo que você gasta praticando atividades não remuneradas, como trabalho voluntário, é significativo para você?",
                id: 2,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              },
              {
                statement: "O tempo que você gasta praticando atividades de lazer (passeios, cinemas, esportes, etc) durante a semana e/ou fins de semana é significativo para você?",
                id: 3,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              },
              {
                statement: "Você considera satisfatório o tempo que investe em cuidados pessoais (banho, cabelos, etc)?",
                id: 4,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              },
              {
                statement: "O tempo gasto com a arrumação do lar (limpeza e organização dos cômodos, da louça, quintal, etc) é significativo para você?",
                id: 5,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              }
            ]
          },
          {
           name: "SONO",
            weight: 0.056,
            grade: 9,
            id: 2,
            questions: [
              {
                statement: "Quantas horas você dorme por noite?",
                id: 6,
                options: [
                  {
                    text: "0h - 3h",
                    score: 3
                  },
                  {
                    text: "3h - 6h",
                    score: 3
                  },
                  {
                    text: "6h - 9h",
                    score: 9
                  },
                  {
                    text: "9h - 12h",
                    score: 9
                  },
                  {
                    text: "12h ou mais",
                    score: 3
                  }
                ]
              },
              {
                statement: "Qual o período em que você dorme?",
                id: 7,
                options: [
                  {
                    text: "Vespertino",
                    score: 3
                  },
                  {
                    text: "Noturno",
                    score: 9
                  }
                ]
              },
              {
                statement: "Você usa medicamentos para auxiliar no sono?",
                id: 8,
                options: [
                  {
                    text: "Sim",
                    score: 3
                  },
                  {
                    text: "Não",
                    score: 9
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              }
            ]
          }
        ]
      },
      {
       name: "BOA GOVERNANÇA",
        indicators: [
          {
           name: "SERVIÇOS BÁSICOS",
            weight: 0.044,
            grade: 9,
            id: 3,
            questions: [
              {
                statement: "De sua residência, quanto tempo caminhando você leva até o atendimento médico mais próximo?",
                id: 9,
                options: [
                  {
                    text: "Até meia hora",
                    score: 9
                  },
                  {
                    text: "Entre meia e uma hora",
                    score: 6
                  },
                  {
                    text: "Mais de uma hora",
                    score: 3
                  },
                  {
                    text: "Não sei",
                    score: 6
                  }
                ]
              },
              {
                statement: "Existe coleta de lixo da prefeitura em sua comunidade?",
                id: 11,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              },
              {
                statement: "Você tem eletricidade na sua casa?",
                id: 12,
                options: [
                  {
                    text: "Sim, da rede regular",
                    score: 9
                  },
                  {
                    text: "Sim, painel solar",
                    score: 9
                  },
                  {
                    text: "Sim, irregular",
                    score: 6
                  },
                  {
                    text: "Não",
                    score: 3
                  }
                ]
              },
              {
                statement: "Qual é a principal fonte de água de sua casa?",
                id: 13,
                options: [
                  {
                    text: "Encanada regular",
                    score: 9
                  },
                  {
                    text: "Encanada irregular",
                    score: 6
                  },
                  {
                    text: "Duto público comunitário",
                    score: 6
                  },
                  {
                    text: "Poço",
                    score: 6
                  },
                  {
                    text: "Bica",
                    score: 6
                  },
                  {
                    text: "Riacho / Lago",
                    score: 6
                  }
                ]
              }
            ]
          },
          {
           name: "PARTICIPAÇÃO POLÍTICA",
            weight: 0.044,
            grade: 9,
            id: 4,
            questions: [
              {
                statement: "Se o voto não fosse obrigatório, você votaria assim mesmo?",
                id: 14,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              },
              {
                statement: "Você teve ligação com algum partido político na última eleição?",
                id: 15,
                options: [
                  {
                    text: "Sim",
                    score: 9
                  },
                  {
                    text: "Não",
                    score: 3
                  },
                  {
                    text: "Às vezes",
                    score: 6
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }