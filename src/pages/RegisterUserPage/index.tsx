import { Form } from '@unform/web';
import React from 'react';
import Logo from '../../components/Logo/logo';
import { Container, Title } from './styles';

const RegisterUserPage:React.FC = () => {
  function handleRegisterUser() {
    console.log('Register Users');
  }
  return (
    <>
      <Logo />
      <Title>
        Para criar uma conta é muito facil, basta
        {' '}
        <br />
        {' '}
        preencher seus dados abaixo!
      </Title>
      <Container>
        <Form onSubmit={handleRegisterUser}>
          <span> Nome completo:</span>
          <input
            name="name"
            type="text"
            placeholder="Nome completo..."
          />
          <span> Email:</span>
          <div>
            <input
              name="email"
              type="email"
              placeholder="E-mail..."
            />
            <p>Só pode haver um cadastro por email*</p>
          </div>
          <div>
            <span> Senha:</span>
            <input
              name="password"
              type="password"
              placeholder="Senha..."
            />
            <p>A senha deve conter no minimo 6 caracteres*</p>
          </div>
          <button type="submit">Salvar</button>
        </Form>
      </Container>
    </>
  );
};

export default RegisterUserPage;
