import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import api from '../../server/api';
import {
  Container, H3, Title,
} from './styles';

interface IUserDTO {
  id: string;
}

const ResetPassword:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { params } = useRouteMatch<IUserDTO>();

  const history = useHistory();

  const [statePassword, setStatePassword] = useState('');
  const [stateEmail, setStateEmail] = useState('');

  const handleSubmit = useCallback(async () => {
    try {
      const password = statePassword;
      const email = stateEmail;

      // console.log({ email, password });

      const schema = Yup.object().shape({
        password: Yup.string()
          . required('Digite uma senha!').min(6, 'A nova senha deve ter no minimo 6 dígitos'),
        email: Yup.string()
          . required('Digite um email de login!'),
      });

      await schema.validate({ password, email });

      const user = await api.get(`/users/list-user-id/${params.id}`);

      if (user.data.user.email === email) {
        await api.put(`/users/reset-password-user/${params.id}`, {
          password,
        });

        alert('Nova senha salva!!');
        history.push('/login');
      } else {
        alert('Parece que o algo esta incorreto...');
      }
    } catch (err) {
      alert(`Parece que algo deu errado... ${err}`);
    }
  }, [statePassword, stateEmail, params.id, history]);
  return (
    <>
      <Logo />
      <Title>
        Digite uma nova senha:
      </Title>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <H3>
            Para resetar a senha, digite seu email de login, para garantirmos
            <br />
            que é você mesmo e sua nova senha
          </H3>
          <input
            value={stateEmail}
            onChange={(e) => setStateEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Digite seu email de login..."
          />
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
