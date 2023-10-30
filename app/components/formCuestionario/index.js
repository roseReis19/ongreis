"use client"

import React, { useEffect, useState } from 'react';
import {NotificationManager} from 'react-notifications';
import {
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

function QuestionnaireForm({data = false}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    domains: [
      {
        name: '',
        indicators: [
          {
            name: '',
            weight: 0,
            grade: 0,
            criterion: '',
            questions: [
              {
                statement: '',
                item: '',
                options: [{ text: '', score: 0 }],
              },
            ],
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if(data){
      console.log(data)
        const storedQuestionnaires = JSON.parse(localStorage.getItem("questionnaires"));
        const actual = storedQuestionnaires.filter(e => e.name === data)
        console.log(actual)
        setFormData(actual[0]);
    }

    setLoading(true)
  }, [])



  const handleChange = (e, domainIndex, indicatorIndex, questionIndex, optionIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (optionIndex !== undefined) {
        newData.domains[domainIndex].indicators[indicatorIndex].questions[questionIndex].options[
          optionIndex
        ][name] = name === 'score'?Number(value): value;
      } else if (questionIndex !== undefined) {
        newData.domains[domainIndex].indicators[indicatorIndex].questions[questionIndex][name] = value;
      } else if (indicatorIndex !== undefined) {
        newData.domains[domainIndex].indicators[indicatorIndex][name] = value;
      } else if (domainIndex !== undefined) {
        newData.domains[domainIndex][name] = value;
      } else {
        newData[name] = value;
      }
      return newData;
    });
  };

  const handleAddDomain = () => {
    setFormData((prevData) => ({
      ...prevData,
      domains: [
        ...prevData.domains,
        {
          name: '',
          indicators: [
            {
              name: '',
              weight: 0,
              grade: 0,
              criterion: '',
              questions: [
                {
                  statement: '',
                  item: '',
                  options: [{ text: '', score: 0 }],
                },
              ],
            },
          ],
        },
      ],
    }));
  };

  const handleAddIndicator = (domainIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains[domainIndex].indicators.push({
        name: '',
        weight: 0,
        grade: 0,
        criterion: '',
        questions: [
          {
            statement: '',
            item: '',
            options: [{ text: '', score: 0 }],
          },
        ],
      });
      return newData;
    });
  };

  const handleAddQuestion = (domainIndex, indicatorIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains[domainIndex].indicators[indicatorIndex].questions.push({
        statement: '',
        item: '',
        options: [{ text: '', score: 0 }],
      });
      return newData;
    });
  };

  const handleAddOption = (domainIndex, indicatorIndex, questionIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains[domainIndex].indicators[indicatorIndex].questions[questionIndex].options.push({
        text: '',
        score: 0,
      });
      return newData;
    });
  };

  const handleDeleteDomain = (domainIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains.splice(domainIndex, 1);
      return newData;
    });
  };

  const handleDeleteIndicator = (domainIndex, indicatorIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains[domainIndex].indicators.splice(indicatorIndex, 1);
      return newData;
    });
  };

  const handleDeleteQuestion = (domainIndex, indicatorIndex, questionIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains[domainIndex].indicators[indicatorIndex].questions.splice(
        questionIndex,
        1
      );
      return newData;
    });
  };

  const handleDeleteOption = (domainIndex, indicatorIndex, questionIndex, optionIndex) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.domains[domainIndex].indicators[indicatorIndex].questions[
        questionIndex
      ].options.splice(optionIndex, 1);
      return newData;
    });
  };

  const validateFormData = () => {
    if (!formData.name) {
      return { isValid: false, errorMessage: 'El nombre del cuestionario no puede estar vacío.' };
    }
  
    const isAnyFieldEmpty = formData.domains.some((domain) => {
      if (!domain.name) return true;
  
      return domain.indicators.some((indicator) => {
        if (!indicator.name && !indicator.weight && !indicator.grade || !indicator.name && !indicator.criterion) {
          return true;
        }
  
        return indicator.questions.some((question) => {
          if (!question.statement) return true;
  
          return question.options.some((option) => {
            return !option.text && option.score === 0;
          });
        });
      });
    });
  
    if (isAnyFieldEmpty) {
      return { isValid: false, errorMessage: 'Nenhum campo pode estar vazio, exceto os opcionais.' };
    }
  
    return { isValid: true, errorMessage: '' };
  }  

  const handleSubmit = async () => {
    const {isValid, errorMessage} = validateFormData()
    if (isValid) {
   try {
      const response = await fetch(
        `/api/cuestionario`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(formData) 
        }
      );

      if (!response.ok) {
        NotificationManager.error('error message', 'Dada nao guardado');
        throw new Error('Network response was not ok');
      }

      NotificationManager.success('success message', 'Dada guardado');
      if(data){
        const storedQuestionnaires = JSON.parse(localStorage.getItem("questionnaires"));
        const actual = storedQuestionnaires.filter(e => e.name !== data)
        localStorage.setItem('questionnaires', JSON.stringify(actual));
        router.push("/panel")
      }

      setFormData({
        name: '',
        domains: [
          {
            name: '',
            indicators: [
              {
                name: '',
                weight: 0,
                grade: 0,
                criterion: '',
                questions: [
                  {
                    statement: '',
                    item: '',
                    options: [{ text: '', score: 0 }],
                  },
                ],
              },
            ],
          },
        ],
      });

         
    } catch (error) {
      console.log(error);
      return;
    }
    }else {
      NotificationManager.error(errorMessage);
    }
  };

  const handleSaveLocalStorage = () => {
    const {isValid, errorMessage} = validateFormData()
    if (isValid) {
      let storedQuestionnaires = JSON.parse(localStorage.getItem('questionnaires')) || [];

      let exist = storedQuestionnaires.some(objeto => objeto.name === formData.name);
      if(exist){
        storedQuestionnaires = storedQuestionnaires.map(obj => {
          if (obj.name === formData.name) {
              return formData;
          }
          return obj;
        });

      }else{
        storedQuestionnaires.push(formData)
      }
      //const updatedQuestionnaires = [...storedQuestionnaires, formData];

      localStorage.setItem('questionnaires', JSON.stringify(storedQuestionnaires));
      NotificationManager.success(`Cuestionario "${formData.name}" guardado en el almacenamiento local.`);
    } else {
      NotificationManager.error(errorMessage);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crear Cuestionario
      </Typography>
      {loading &&<form>
        <TextField
          fullWidth
          label="Nombre del Cuestionario"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          margin="normal"
        />

        {formData.domains.map((domain, domainIndex) => (
          <div key={domainIndex}>
            <Typography variant="h6">Domain {domainIndex + 1}</Typography>
            <TextField
              fullWidth
              label="Nome do Dominio"
              variant="outlined"
              name="name"
              value={domain.name}
              onChange={(e) => handleChange(e, domainIndex)}
              margin="normal"
            />
         
            {domain.indicators.map((indicator, indicatorIndex) => (
              <div key={indicatorIndex}>
                <Typography variant="subtitle1">Indicator {indicatorIndex + 1}</Typography>
                <TextField
                  fullWidth
                  label="Nome do Indicador"
                  variant="outlined"
                  name="name"
                  value={indicator.name}
                  onChange={(e) => handleChange(e, domainIndex, indicatorIndex)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Peso"
                  variant="outlined"
                  name="weight"
                  type="number"
                  value={indicator.weight}
                  onChange={(e) => handleChange(e, domainIndex, indicatorIndex)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Nota"
                  variant="outlined"
                  name="grade"
                  type="number"
                  value={indicator.grade}
                  onChange={(e) => handleChange(e, domainIndex, indicatorIndex)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Criterio"
                  variant="outlined"
                  name="criterion"
                  value={indicator.criterion}
                  onChange={(e) => handleChange(e, domainIndex, indicatorIndex)}
                  margin="normal"
                />

                {indicator.questions.map((question, questionIndex) => (
                  <div key={questionIndex}>
                    <Typography variant="subtitle2">Question {questionIndex + 1}</Typography>
                    <TextField
                      fullWidth
                      label="Enunciado da Pergunta"
                      variant="outlined"
                      name="statement"
                      value={question.statement}
                      onChange={(e) => handleChange(e, domainIndex, indicatorIndex, questionIndex)}
                      margin="normal"
                    />
                     <TextField
                      fullWidth
                      label="Item da Pergunta"
                      variant="outlined"
                      name="item"
                      value={question.item}
                      onChange={(e) => handleChange(e, domainIndex, indicatorIndex, questionIndex)}
                      margin="normal"
                    />

                    {question.options.map((option, optionIndex) => (
                      <Grid container spacing={2} key={optionIndex}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Texto da Opción"
                            variant="outlined"
                            name="text"
                            value={option.text}
                            onChange={(e) =>
                              handleChange(e, domainIndex, indicatorIndex, questionIndex, optionIndex)
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            label="Puntuación da Opción"
                            variant="outlined"
                            name="score"
                            type="number"
                            value={option.score}
                            onChange={(e) =>
                              handleChange(e, domainIndex, indicatorIndex, questionIndex, optionIndex)
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          {optionIndex === question.options.length - 1 && (
                            <IconButton
                              onClick={() =>
                                handleAddOption(domainIndex, indicatorIndex, questionIndex)
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          )}
                          {optionIndex === question.options.length - 1 && optionIndex !== 0 && (
                            <IconButton
                              onClick={() =>
                                handleDeleteOption(
                                  domainIndex,
                                  indicatorIndex,
                                  questionIndex,
                                  optionIndex
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
               
                    {questionIndex === indicator.questions.length - 1 && (
                      <Button
                        variant="outlined"
                        color="primary"
                        style={{marginTop: 10}}
                        onClick={() => handleAddQuestion(domainIndex, indicatorIndex)}
                      >
                        Adicionar Pergunta
                      </Button>
                    )}
                    {questionIndex === indicator.questions.length - 1 && questionIndex !== 0 && (
                      <IconButton
                        onClick={() =>
                          handleDeleteQuestion(domainIndex, indicatorIndex, questionIndex)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                ))}
              
                {indicatorIndex === domain.indicators.length - 1 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAddIndicator(domainIndex)}
                    style={{marginTop: 10}}
                  >
                    Adicionar Indicador
                  </Button>
                )}
              
                {indicatorIndex === domain.indicators.length - 1 && indicatorIndex !== 0 && (
                  <IconButton
                    onClick={() => handleDeleteIndicator(domainIndex, indicatorIndex)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              
              </div>
            ))}
            {domainIndex === formData.domains.length - 1 && (
              <Button
                style={{marginTop: 10}}
                variant="outlined"
                color="primary"
                onClick={() => handleAddDomain()}
              >
                Adicionar Dominio
              </Button>
            )}
            {domainIndex === formData.domains.length - 1 && domainIndex !== 0 && (
              <IconButton onClick={() => handleDeleteDomain(domainIndex)}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        ))}

        <div style={{display: 'flex', justifyContent: 'space-between', marginTop:15, marginBottom: 50}}>
        <Button variant="contained" color="primary" onClick={handleSaveLocalStorage} style={{marginTop: 10}}>
          Salvar
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: 10}}>
          Completar
        </Button>
        </div>
      </form>}
    </Container>
  );
}

export default QuestionnaireForm;
