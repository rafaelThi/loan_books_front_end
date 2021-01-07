import { Form } from '@unform/web';
import React, { FormEvent } from 'react';
import Logo from '../../components/Logo';
import { Container, Title, H3 } from './styles';

const LoginPage:React.FC = () => {
  async function handleLoginUsers(event:FormEvent<HTMLFormElement>): Promise<void> {
    event?.preventDefault();
    console.log('Função do botão logar');
  }
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
        <Form onSubmit={handleLoginUsers}>
          <H3>
            Caso não tenha um login faça um agora
            {' '}
            {' '}
            <a href="/register-user">clicando aqui.</a>
          </H3>

          <input
            name="email"
            type="text"
            placeholder="E-mail"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
          />
          <span>
            <a href="/">
              Esqueci minha senha
            </a>
          </span>
          <button type="submit">Entrar</button>
        </Form>

      </Container>

    </>
  );
};

export default LoginPage;
