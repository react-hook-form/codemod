import { useFormContext } from 'react-hook-form';

const Form = () => {
  const { errors, formState: { isDirty } } = useFormContext();

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
