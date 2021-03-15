import { useFormContext } from 'react-hook-form';

const Form = () => {
  const { errors } = useFormContext();

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
