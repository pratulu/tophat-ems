import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Form = ({ onSubmit, initialValues = {} }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    // Set initial values when the form is loaded
    Object.entries(initialValues).forEach(([name, value]) => {
      setValue(name, value);
    });
  }, [initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" ref={register} />
      <input name="email" ref={register} />
      <button type="submit">Save</button>
    </form>
  );
};
export default Form;
