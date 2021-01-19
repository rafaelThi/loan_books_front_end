import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import {
  Container, Title,
} from './styles';

const ResetPassword:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [statePassword, setStatePassword] = useState('');
  const handleSubmit = useCallback(async () => {
    try {
      const password = statePassword;

      // console.log({ email, password });

      const schema = Yup.object().shape({
        password: Yup.string()
          . required('Digite uma senha!').min(6, 'A nova senha deve ter no minimo 6 dígitos'),
      });

      await schema.validate({ password });

      // api de email
      alert('Nova senha salva!!');
      history.push('/login');
    } catch (err) {
      alert(`Parece que algo deu errado... ${err}`);
    }
  }, [statePassword, history]);
  return (
    <>
      <Logo />
      <Title>
        Digite uma nova senha:
      </Title>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <input
            value={statePassword}
            onChange={(e) => setStatePassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Digite sua nova senha..."
          />
          <button type="submit">Salvar</button>
        </Form>
      </Container>
      <BackButton />
    </>
  );
};

export default ResetPassword;
