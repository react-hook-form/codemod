import { useForm as useRenamedForm } from 'react-hook-form';

const Form = () => {
  const { register: customRegister } = useRenamedForm();

  return (
    <form>
      <input ref={customRegister} name="example" />
    </form>
  );
};

export default Form;
