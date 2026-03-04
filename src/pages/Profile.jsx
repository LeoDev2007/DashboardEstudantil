import React from "react";
import { Input, Field } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import styles from "../styles/Auth.module.css";
import styles_2 from "../styles/Profile.module.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../components/DeleteDialog";

const Profile = () => {
  const { user, editUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email } = data;
    await editUser({ 
      name: data.name || user.name,
      email: data.email || user.email,
      password: data.password || undefined,
     });
    alert("Perfil atualizado com sucesso!");
    navigate("/app");
  };

  return (
    <div>
      <div className={styles_2.header}>
        <h1>Editar Perfil</h1>
        <p>
          Aqui você pode editar suas informações pessoais, como nome, email e
          foto de perfil.
        </p>
      </div>

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
                  minLength: {
                    value: 7,
                    message: "No mínimo 7 caracteres",
                  },
                })}
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
            </Field.Root>
          </div>

          <button className={styles.btn} type="submit">
            Salvar Alterações
          </button>

          <DeleteDialog type="user" className={styles_2.deleteButton} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
