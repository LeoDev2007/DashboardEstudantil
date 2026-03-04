import React from "react";
import { Input, Field } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";
import styles from "../styles/Auth.module.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { register: registerForm } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    const res = await registerForm({ name, email, password });

    if (res.ok) {
      navigate("/app");
    }else{
      alert('Usuário já existe')
    }
  };

  const watchPassword = watch("password");
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Nome de Usuário</Field.Label>
            <Input
              variant="outline"
              type="text"
              placeholder="Nome"
              className={errors?.name ? styles.inputError : styles.input}
              {...register("name", {
                required: "O nome é necessário",
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s]+$/,
                  message: "Apenas letras são permitidas",
                },
              })}
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
        </div>
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
          </Field.Root>
        </div>

        <div>
          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirmar Senha</Field.Label>
            <PasswordInput
              variant="outline"
              placeholder="Confirmar Senha"
              className={
                errors?.confirmPassword ? styles.inputError : styles.input
              }
              {...register("confirmPassword", {
                required: "A confirmação da senha é necessária",
                minLength: {
                  value: 7,
                  message: "No mínimo 7 caracteres",
                },

                validate: (value) =>
                  value === watchPassword || "As senhas devem ser iguais",
              })}
            />

            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>
        </div>
        <button className={styles.btn} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
