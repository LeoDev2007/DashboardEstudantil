import styles from "../styles/CreateScheduleForm.module.css";
import { Input, Field } from "@chakra-ui/react";
import stylesForm from "../styles/Auth.module.css";
import { useForm } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useState } from "react";

import { useSchedule } from "../Contexts/ScheduleContext";
import {dataSubjects} from "../data/DataSubjects"
import { useNavigate } from "react-router-dom";

const CreateScheduleForm = () => {
  const { createSchedule } = useSchedule();
  const [selectedDays, setSelectedDays] = useState([]);

  const DAYS = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { selectedDays: [] },
  });

  const totalDays = useWatch({ control, name: "days", defaultValue: 0 });
  const daysPerWeek = Math.min(Number(totalDays), 7);

  const limitReached = selectedDays.length >= daysPerWeek;

  function handleDayToggle(day) {
    const updated = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    const sorted = updated.sort((a, b) => DAYS.indexOf(a) - DAYS.indexOf(b));

    setSelectedDays(sorted);
    setValue("selectedDays", updated);
  }

  const navigate = useNavigate();

  const onSubmit = (data) => {
    
    if (selectedDays.length === 0) {
      alert("Selecione pelo menos um dia de estudo.");
      return;
    }

    createSchedule(
      dataSubjects,
      Number(data.days),
      Number(data.hours),
      selectedDays,
    );

    navigate("/app");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Crie seu cronograma aqui mesmo! :)</h2>
      </div>
      <div className={styles.information}>
        <p>
          Antes de começar, precisamos entender como será sua rotina de estudos.
          Informe em quais dias da semana está disposto a estudar e quantas
          horas por dia possui disponíveis. Essas informações são importantes
          para organizar um plano realista e compatível com seu tempo.
        </p>
      </div>
      <form className={styles.formSchedule} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Field.Root invalid={!!errors.days}>
            <Field.Label>Dias da Semana</Field.Label>
            <Input
              variant="outline"
              type="number"
              min={1}
              max={7}
              placeholder="Dias da Semana"
              className={
                errors?.days ? stylesForm.inputError : stylesForm.input
              }
              {...register("days", {
                required: "O número de dias é obrigatório",
                min: { value: 1, message: "O valor deve ser maior que 0!" },
                max: {
                  value: 7,
                  message:
                    "O valor deve ser menor ou igual a 7 dias da semana!",
                },
                onChange: () => {
                  setSelectedDays([]); 
                  setValue("selectedDays", []);
                },
              })}
            />
            <Field.ErrorText>{errors.days?.message}</Field.ErrorText>
          </Field.Root>
        </div>

        <div>
          <Field.Root invalid={!!errors.hours}>
            <Field.Label>Horas de Estudo</Field.Label>
            <Input
              variant="outline"
              type="number"
              min={1}
              max={24}
              placeholder="Horas"
              className={
                errors?.hours ? stylesForm.inputError : stylesForm.input
              }
              {...register("hours", {
                required: "Defina o número de horas para estudar",
                min: { value: 1, message: "O valor deve ser maior que 0!" },
                max: { value: 24, message: "O máximo são 24 horas" },
              })}
            />
            <Field.ErrorText>{errors.hours?.message}</Field.ErrorText>
          </Field.Root>
        </div>

        <div>
          <Field.Root>
            <Field.Label>
              Selecione os dias ({selectedDays.length}/{daysPerWeek || "?"})
            </Field.Label>

            {DAYS.map((day) => {
              const isSelected = selectedDays?.includes(day) ?? false;
              const isDisabled = limitReached && !isSelected;
              
              return (
                <Field.Label
                  key={day}
                  className={[
                    stylesForm.day,
                    isSelected ? stylesForm.daySelected : "",
                    isDisabled ? stylesForm.dayDisabled : "",
                  ].join(" ")}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => handleDayToggle(day)}
                  />
                  {day}
                </Field.Label>
              );
            })}
          </Field.Root>
        </div>

        <button className={stylesForm.btn} type="submit">
          Criar
        </button>
      </form>
    </div>
  );
};

export default CreateScheduleForm;
