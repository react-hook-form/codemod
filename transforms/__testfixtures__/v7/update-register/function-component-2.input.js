import { useForm } from 'react-hook-form';

const Form = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer label="Email">
        <Input
          name="email"
          ref={register}
          autoComplete="username"
        />
      </InputContainer>
      <InputContainer label="Password *">
        <Input
          name="password"
          ref={register({
            required: true,
            validate: (value) => !!value
          })}
          type="password"
        />
      </InputContainer>
    </form>
  );
};

export default Form;
