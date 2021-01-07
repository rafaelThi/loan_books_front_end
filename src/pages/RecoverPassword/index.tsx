import { Form } from '@unform/web';
import React from 'react';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import {
  Container, Title, H3,
} from './styles';

const RecoverPassword:React.FC = () => {
  function handleSubmit() {
    console.log('enviar email de recuperação de senha');
  }
  return (
    <>
      <Logo />
      <Title>
        Para recuperar sua senha
        {' '}
        <br />
        {' '}
        basta digitar seu email:

      </Title>
      <Container>
        <Form onSubmit={handleSubmit}>
          <H3>
            Um email sera encaminhado para sua caixa de
            {' '}
            <br />
            entrada, lembre-se de olhar na caixa de spam!
          </H3>

          <input
            name="email"
            type="text"
            placeholder="E-mail"
          />
          <button type="submit">Enviar</button>
        </Form>
      </Container>
      <BackButton />
    </>
  );
};

export default RecoverPassword;
