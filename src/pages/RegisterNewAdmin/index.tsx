import { Form } from '@unform/web';
import React from 'react';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { Container, Title } from './styles';

const RegisterNewAdmin:React.FC = () => {
  function handleNewAdmin() {
    console.log('novo admin');
  }
  return (
    <>
      <Logo />
      <Title>
        Para criar uma conta de Admin, basta
        {' '}
        <br />
        {' '}
        preencher seus dados abaixo!
      </Title>
      <Container>
        <Form onSubmit={handleNewAdmin}>
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
      <BackButton />
    </>
  );
};

export default RegisterNewAdmin;
