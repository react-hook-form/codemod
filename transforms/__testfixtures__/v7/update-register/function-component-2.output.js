import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer label="Email">
        <Input {...register('email')} autoComplete="username" />
      </InputContainer>
      <InputContainer label="Password *">
        <Input
          {...register('password', {
            required: true,
            validate: (value) => !!value
          })}
          type="password" />
      </InputContainer>
    </form>
  );
};

export default Form;
