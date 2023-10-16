"use client";
import styles from "./page.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {NotificationManager} from 'react-notifications';

import { MenuItem, Select, Typography } from "@mui/material";

export default function Form({ admin = false, login = false }) {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    senha: "",
    gender: ""
  });

  const twelveYearsAgo = new Date();
  twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 15);
  const maxDate = twelveYearsAgo.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(twelveYearsAgo);

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      console.log("Errores en el formulario:", errors);
      return;
    }

    if (!login) {
      try {
        const data = { ...formData, data_de_nascimento: formatDate(startDate) };
        const response = await postAPI(data);
        console.log(response)
        if(response.message){
          setFormErrors({errorAPI: response.message})
          return
        }

        const res = await signIn("credentials", {
          email: response.email,
          password: formData.password,
          redirect: false,
        });


        if (res?.ok && admin) {
         NotificationManager.success('Success message', 'Ingresando');
          return router.push(`/panel`);
        }

        if (res.ok){
          NotificationManager.success('Success message', 'Ingresando');
          return router.push(`/platform`);
        } 
      } catch (error) {
        console.log(error);
        return;
      }
    }

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res.error) {
      console.log(res.error)
      setFormErrors({ errorAPI: "Ocorreu um erro" });
      return
    }

    if (res?.ok && admin) {
     NotificationManager.success('Success message', 'Ingresando');
      return router.push(`/panel`);
    }

    if (res.ok){
      NotificationManager.success('Success message', 'Ingresando');
      return router.push(`/platform`);
    } 
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "O e-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "O e-mail não é válido";
    }

    if (!formData.password || formData.password.length < 6) {
      console.log(formData.password);
      errors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!login && !formData.name) {
      errors.name = "O nome é obrigatório";
    }

    if (!login && !formData.senha) {
      errors.senha = "A senha é obrigatória";
    }

    if (!login && formData.genero === '') {
      errors.senha = "O genero é obligatorio";
    }

    setFormErrors(errors);

    return errors;
  };

  const postAPI = async (data) => {
    const errors = {};
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    };

    try {
      const response = await fetch(
        `/api/auth/signup`,
        requestOptions
      );

      return await response.json();
    } catch (error) {
      error.errorAPI = "Ocorreu um erro";
      setFormErrors(errors);
      console.log(error);
      return;
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <section className={styles.containerForm}>
      {formErrors.errorAPI && (
        <Typography variant="body2" color="error">
          {formErrors.errorAPI}
        </Typography>
      )}
      <form className={styles.form}>
        {!login && formErrors.name && (
          <Typography variant="body2" color="error">
            {formErrors.name}
          </Typography>
        )}
        {!login && (
          <TextField
            required
            id="filled-basic"
            label="Nome"
            variant="filled"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        )}
        {formErrors.email && (
          <Typography variant="body2" color="error">
            {formErrors.email}
          </Typography>
        )}
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          sx={{ marginTop: formErrors.email ? 2 : 3 }}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {!login && (
          <>
            <Typography style={{ marginTop: formErrors.email ? 5 : 10 }}>
              Data de Nascimento
            </Typography>
            <input
              type="date"
              name="date"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              style={{
                marginTop: 10,
                height: 50,
                backgroundColor: "rgba(0, 0, 0, 0.06)",
                border: "none",
                fontSize: 15,
              }}
              max={maxDate}
            />
               <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.gender}
          name="gender"
          onChange={handleInputChange}
          style={{marginTop: 10}}
        >
          <MenuItem value="">Selecione o gênero</MenuItem>
          <MenuItem value="masculino">masculino</MenuItem>
          <MenuItem value="femenino">femenino</MenuItem>
        </Select>
            {formErrors.senha && (
              <Typography variant="body2" color="error">
                {formErrors.senha}
              </Typography>
            )}
            <TextField
              sx={{ marginTop: formErrors.senha ? 2 : 3 }}
              id="filled-password-input"
              label="senha"
              type="password"
              autoComplete="current-password"
              variant="filled"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
            />
          </>
        )}
        {formErrors.password && (
          <Typography variant="body2" color="error">
            {formErrors.password}
          </Typography>
        )}
        <TextField
          sx={{ marginTop: formErrors.password ? 2 : 3 }}
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          sx={{ marginTop: formErrors.password ? 3 : 4 }}
          variant="contained"
          onClick={handleSubmit}
        >
          {login ? "Conecte-se" : "Cadastre-se"}
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          {!login ? (
            <Link href={admin?"/admin/login":"/login"}>Conecte-se</Link>
          ) : (
            <Link href={ admin?"/admin" :"/register"}>Cadastre-se</Link>
          )}
          <Link href="/">Começar</Link>
        </div>
      </form>
    </section>
  );
}
