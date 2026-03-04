import React from "react";
import { Input, Field } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import styles from "../styles/Auth.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {login} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const {name, email, password} = data

    const res = await login({name, email, password});

    if (res.ok){
      navigate('/app')
    }else{
      alert('E-mail ou Senha incorretos')
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>E-mail</Field.Label>
            <Input
              variant="outline"
              placeholder="E-mail"
              className={errors?.email ? styles.inputError : styles.input}
              {...register("email", {
                required: "O e-mail é necessário",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Insira um E-mail Válido!",
                },
              })}
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
        </div>

        <div>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Senha</Field.Label>
            <PasswordInput
              variant="outline"
              placeholder="Senha"
              className={errors?.password ? styles.inputError : styles.input}
              {...register("password", {
                required: "A senha é necessária",
                minLength: {
                  value: 7,
                  message: "No mínimo 7 caracteres",
                },
              })}
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            <span>Esqueceu sua senha?</span>
          </Field.Root>
        </div>

        <button className={styles.btn} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
