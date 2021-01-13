import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { Container, Title, H3 } from './styles';

const LoginPage:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');

  const handleLoginUsers = useCallback(async () => {
    try {
      const email = stateEmail;
      const password = statePassword;

      console.log({ email, password });

      const schema = Yup.object().shape({
        email: Yup.string()
          . required('Digite um e-mail válido.')
          .email(
            `Digite um e-mail válido
          "ex@ex.com".`,
          ),

        password: Yup.string().required().min(6, 'Senha invalida'),
      });

      await schema.validate({ email, password });

      history.push('/search');
    } catch (err) {
      console.log(Error('Erro no logion'));
    }
  }, [stateEmail, statePassword, history]);

  return (
    <>
      <Logo />
      <Title>
        Antes de procurar um
        {' '}
        <br />
        {' '}
        livro vamos logar!

      </Title>
      <Container>
        <Form ref={formRef} onSubmit={handleLoginUsers}>
          <H3>
            Caso não tenha um login faça um agora
            {' '}
            {' '}
            <a href="/register-user">clicando aqui.</a>
          </H3>

          <input
            value={stateEmail}
            onChange={(e) => setStateEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="E-mail"
          />
          <input
            value={statePassword}
            onChange={(e) => setStatePassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Senha"
          />
          <span>
            <a href="/recover-password">
              Esqueci minha senha
            </a>
          </span>
          <button type="submit">Entrar</button>
        </Form>

      </Container>

      <BackButton />

    </>
  );
};

export default LoginPage;
