export const experimente = {
    nome: "Experimente",
    id: "Prueba",
    dominios: [
      {
        nome: "USO DO TEMPO",
        indicadores: [
          {
            nome: "TRABALHO",
            peso: 0.056,
            nota: 9,
            id: 1,
            perguntas: [
              {
                enunciado: "Em média quantas horas por dia você permanece no seu trabalho ou atividade remunerada?",
                id: 1,
                opcoes: [
                  {
                    texto: "0h - 3h",
                    pontuacao: 3
                  },
                  {
                    texto: "3h - 6h",
                    pontuacao: 3
                  },
                  {
                    texto: "6h - 9h",
                    pontuacao: 9
                  },
                  {
                    texto: "9h - 12h",
                    pontuacao: 9
                  },
                  {
                    texto: "12h ou mais",
                    pontuacao: 3
                  }
                ]
              },
              {
                enunciado: "O tempo que você gasta praticando atividades não remuneradas, como trabalho voluntário, é significativo para você?",
                id: 2,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              },
              {
                enunciado: "O tempo que você gasta praticando atividades de lazer (passeios, cinemas, esportes, etc) durante a semana e/ou fins de semana é significativo para você?",
                id: 3,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              },
              {
                enunciado: "Você considera satisfatório o tempo que investe em cuidados pessoais (banho, cabelos, etc)?",
                id: 4,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              },
              {
                enunciado: "O tempo gasto com a arrumação do lar (limpeza e organização dos cômodos, da louça, quintal, etc) é significativo para você?",
                id: 5,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              }
            ]
          },
          {
           nome: "SONO",
            peso: 0.056,
            nota: 9,
            id: 2,
            perguntas: [
              {
                enunciado: "Quantas horas você dorme por noite?",
                id: 6,
                opcoes: [
                  {
                    texto: "0h - 3h",
                    pontuacao: 3
                  },
                  {
                    texto: "3h - 6h",
                    pontuacao: 3
                  },
                  {
                    texto: "6h - 9h",
                    pontuacao: 9
                  },
                  {
                    texto: "9h - 12h",
                    pontuacao: 9
                  },
                  {
                    texto: "12h ou mais",
                    pontuacao: 3
                  }
                ]
              },
              {
                enunciado: "Qual o período em que você dorme?",
                id: 7,
                opcoes: [
                  {
                    texto: "Vespertino",
                    pontuacao: 3
                  },
                  {
                    texto: "Noturno",
                    pontuacao: 9
                  }
                ]
              },
              {
                enunciado: "Você usa medicamentos para auxiliar no sono?",
                id: 8,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 3
                  },
                  {
                    texto: "Não",
                    pontuacao: 9
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              }
            ]
          }
        ]
      },
      {
       nome: "BOA GOVERNANÇA",
        indicadores: [
          {
           nome: "SERVIÇOS BÁSICOS",
            peso: 0.044,
            nota: 9,
            id: 3,
            perguntas: [
              {
                enunciado: "De sua residência, quanto tempo caminhando você leva até o atendimento médico mais próximo?",
                id: 9,
                opcoes: [
                  {
                    texto: "Até meia hora",
                    pontuacao: 9
                  },
                  {
                    texto: "Entre meia e uma hora",
                    pontuacao: 6
                  },
                  {
                    texto: "Mais de uma hora",
                    pontuacao: 3
                  },
                  {
                    texto: "Não sei",
                    pontuacao: 6
                  }
                ]
              },
              {
                enunciado: "Existe coleta de lixo da prefeitura em sua comunidade?",
                id: 11,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              },
              {
                enunciado: "Você tem eletricidade na sua casa?",
                id: 12,
                opcoes: [
                  {
                    texto: "Sim, da rede regular",
                    pontuacao: 9
                  },
                  {
                    texto: "Sim, painel solar",
                    pontuacao: 9
                  },
                  {
                    texto: "Sim, irregular",
                    pontuacao: 6
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  }
                ]
              },
              {
                enunciado: "Qual é a principal fonte de água de sua casa?",
                id: 13,
                opcoes: [
                  {
                    texto: "Encanada regular",
                    pontuacao: 9
                  },
                  {
                    texto: "Encanada irregular",
                    pontuacao: 6
                  },
                  {
                    texto: "Duto público comunitário",
                    pontuacao: 6
                  },
                  {
                    texto: "Poço",
                    pontuacao: 6
                  },
                  {
                    texto: "Bica",
                    pontuacao: 6
                  },
                  {
                    texto: "Riacho / Lago",
                    pontuacao: 6
                  }
                ]
              }
            ]
          },
          {
           nome: "PARTICIPAÇÃO POLÍTICA",
            peso: 0.044,
            nota: 9,
            id: 4,
            perguntas: [
              {
                enunciado: "Se o voto não fosse obrigatório, você votaria assim mesmo?",
                id: 14,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              },
              {
                enunciado: "Você teve ligação com algum partido político na última eleição?",
                id: 15,
                opcoes: [
                  {
                    texto: "Sim",
                    pontuacao: 9
                  },
                  {
                    texto: "Não",
                    pontuacao: 3
                  },
                  {
                    texto: "Às vezes",
                    pontuacao: 6
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }