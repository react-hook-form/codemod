import { useForm } from 'react-hook-form';

const Form = () => {
  const { errors: customErrors } = useForm();

  return (
    <form>
      <span>{customErrors.username.message}</span>
    </form>
  );
};

export default Form;
