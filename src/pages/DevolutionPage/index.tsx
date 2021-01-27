import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef } from 'react';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import { DivBack } from '../RegisterBook/styles';
import { Container, H3, Title } from './styles';

const DevolutionPage:React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  return (
    <>
      <Logo />
      <DivBack>
        <BackButton />
      </DivBack>
      <Container>
        <Form ref={formRef} onSubmit={() => { console.log('devolução'); }}>
          <Title>
            Devolução do livro:
          </Title>
          <H3>
            Para efetuar a devolução deve ser prenchido o ID da requisição:
          </H3>
          <input
            name="id"
            type="text"
            placeholder="Digite o ID..."
          />
          <button type="submit">Confirmar</button>
        </Form>

      </Container>
    </>
  );
};
export default DevolutionPage;
