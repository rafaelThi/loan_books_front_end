import React, { FormEvent } from 'react';
import { Form } from '@unform/web';
import Logo from '../../components/Logo/logo';
import { Container, Title, H3 } from './styles';

const AdminPageLogin:React.FC = () => {
  async function handleLoginAdmin(event:FormEvent<HTMLFormElement>): Promise<void> {
    event?.preventDefault();
    return (
      console.log('Função do botão logar do Admin')
    );
  }

  return (
    <>
      <Logo />
      <Title>Antes de começar, vamos logar!</Title>
      <Container>
        <Form onSubmit={handleLoginAdmin}>
          <H3>
            Lembrando que essa é a área do admin,
            {' '}
            <br />
            se você não é admin
            {' '}
            <a href="/login">clique aqui.</a>
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

          <button type="submit">Entrar</button>
        </Form>

      </Container>

    </>
  );
};
export default AdminPageLogin;
