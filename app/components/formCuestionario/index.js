"use client"

import React, { useState } from 'react';
import {NotificationManager} from 'react-notifications';
import {
  Button,
  Container,
  TextField,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function QuestionnaireForm() {
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
                options: [{ text: '', score: 0 }],
              },
            ],
          },
        ],
      },
    ],
  });

  const handleChange = (e, domainIndex, indicatorIndex, questionIndex, optionIndex) => {
    // ... (mismo código de manejo de cambios)
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

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Crear Cuestionario
      </Typography>
      <form>
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
              label="Nombre del Dominio"
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
                  label="Nombre del Indicador"
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
                      label="Enunciado de la Pregunta"
                      variant="outlined"
                      name="statement"
                      value={question.statement}
                      onChange={(e) => handleChange(e, domainIndex, indicatorIndex, questionIndex)}
                      margin="normal"
                    />

                    {question.options.map((option, optionIndex) => (
                      <Grid container spacing={2} key={optionIndex}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Texto de la Opción"
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
                            label="Puntuación de la Opción"
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
                        Agregar Pregunta
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
                    Agregar Indicador
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
                Agregar Dominio
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
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: 10}}>
          Guardar 
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: 10}}>
          Completar
        </Button>
        </div>
      </form>
    </Container>
  );
}

export default QuestionnaireForm;
